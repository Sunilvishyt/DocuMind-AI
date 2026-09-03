from datetime import datetime, timedelta, timezone
from typing import Annotated, Any

import jwt
from app.config.jwt import create_access_token, create_refresh_token, get_current_user
from app.constants import (
    ACCESS_COOKIE_NAME,
    ALGORITHM,
    ENVIRONMENT,
    JWT_ACCESS_EXPIRATION_MINUTES,
    JWT_REFRESH_EXPIRATION_DAYS,
    REFRESH_COOKIE_NAME,
    REFRESH_SECRET_KEY,
)
from app.database import get_db
from app.models import User
from app.schemas import (
    LoginResponse,
    RegisterResponse,
    UserLoginRequest,
    UserRegisterRequest,
    UserResponse,
)
from app.utils.password_utils import hash_password, verify_hash
from fastapi import APIRouter, Depends, HTTPException, Request, Response, status
from sqlalchemy import or_
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

router = APIRouter(prefix="/api/auth", tags=["auth"])


async def _get_request_body(request: Request) -> dict[str, Any]:
    content_type = request.headers.get("content-type", "")

    if (
        "application/x-www-form-urlencoded" in content_type
        or "multipart/form-data" in content_type
    ):
        form_data = await request.form()
        return dict(form_data)

    return await request.json()


@router.post("/login", response_model=LoginResponse)
async def login_user(
    request: Request,
    response: Response,
    db: Annotated[Session, Depends(get_db)],
):
    try:
        request_data = UserLoginRequest.model_validate(await _get_request_body(request))

        # Find user by email
        user = db.query(User).filter(User.email == request_data.email).first()

        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )

        # Verify password
        if not verify_hash(request_data.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Invalid password"
            )

        # Check if user is active
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN, detail="User account is inactive"
            )

        access_token = create_access_token(str(user.id))
        refresh_token = create_refresh_token(str(user.id))

        response.set_cookie(
            key=ACCESS_COOKIE_NAME,
            value=access_token,
            httponly=True,  # Critical for XSS protection
            secure=ENVIRONMENT
            != "development",  # Use False ONLY for local localhost development
            samesite="lax",
            max_age=JWT_ACCESS_EXPIRATION_MINUTES * 60,  # 45 minutes in seconds
        )

        response.set_cookie(
            key=REFRESH_COOKIE_NAME,
            value=refresh_token,
            httponly=True,  # Critical for XSS protection
            secure=ENVIRONMENT
            != "development",  # Use False ONLY for local localhost development
            samesite="lax",
            max_age=JWT_REFRESH_EXPIRATION_DAYS * 24 * 60 * 60,  # 7 days in seconds
        )

        # add refreshtoken in db for user
        user.refreshToken = refresh_token
        future_date = datetime.now(timezone.utc) + timedelta(
            days=JWT_REFRESH_EXPIRATION_DAYS
        )
        user.refreshTokenExpiry = future_date.timestamp()
        db.commit()
        db.refresh(user)

        return {
            "message": "Successfully logged in",
            "user": {
                "id": str(user.id),
                "username": user.username,
                "email": user.email,
                "is_active": user.is_active,
                "created_at": str(user.created_at),
            },
        }

    # reraising error so it wont go in other exception
    except HTTPException:
        # Re-raise HTTP exceptions as-is so FastAPI can send 401, 400, 404, etc. directly
        raise

    except Exception as e:
        print(e)
        error = e.errors()[0]["msg"]
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(error))


@router.post("/register", response_model=RegisterResponse)
async def register_user(
    request: Request,
    db: Annotated[Session, Depends(get_db)],
):
    """Register a new user"""
    try:
        request_data = UserRegisterRequest.model_validate(
            await _get_request_body(request)
        )

        if request_data.password != request_data.confirm_password:
            return HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Password does not match",
            )

        # or_ is used to check if either case is true return the existing user.
        existing_user = (
            db.query(User)
            .filter(
                or_(
                    User.username == request_data.username,
                    User.email == request_data.email,
                )
            )
            .first()
        )

        # If the user already exists, return an error
        if existing_user:
            if existing_user.username == request.username:
                return HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Username already exists",
                )
            return HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST, detail="Email already exists"
            )

        # Hash the password
        hashed_password = hash_password(request_data.password)

        # Create a new user
        new_user = User(
            username=request_data.username,
            email=request_data.email,
            hashed_password=hashed_password,
        )
        try:
            db.add(new_user)
            db.commit()
            db.refresh(new_user)

        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username or email already exists",
            )
        return {"message": "User registered successfully"}

    except HTTPException:
        raise

    except Exception as e:
        error = e.errors()[0]["msg"]
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(error))


@router.post("/logout")
def logout_user(response: Response):
    response.delete_cookie(key=ACCESS_COOKIE_NAME,
    httponly = True,
    secure = ENVIRONMENT != "development",
    samesite = "lax"
    )
    
    response.delete_cookie(key=REFRESH_COOKIE_NAME,
    httponly = True,
    secure = ENVIRONMENT != "development",
    samesite = "lax"
    )

    return {"message": "Successfully logged out"}


# fastapi response model automatically removes the un needed fields from User database model and returns only what defined in the UserResponse.
@router.get("/me", response_model=UserResponse)
def me(current_user: Annotated[User, Depends(get_current_user)]):
    return current_user


@router.post("/refresh")
def refresh_token(
    request: Request, response: Response, db: Annotated[Session, Depends(get_db)]
):
    refresh_token = request.cookies.get(REFRESH_COOKIE_NAME)
    # db_refresh_token = db.query(User).filter(User.refresh_token == refresh_token).first()
    # or not db_refresh_token or db_refresh_token.refreshTokenExpiry < int(datetime.now(timezone.utc).timestamp())

    if not refresh_token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="not authenticated",
        )

    try:
        payload = jwt.decode(refresh_token, REFRESH_SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="invalid token",
            )

    except jwt.PyJWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )

    user = db.query(User).get(user_id)
    if (
        not user
        or user.refreshToken != refresh_token
        or user.refreshTokenExpiry < int(datetime.now(timezone.utc).timestamp())
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized",
        )

    access_token = create_access_token(str(user.id))

    response.set_cookie(
        key=ACCESS_COOKIE_NAME,
        value=access_token,
        httponly=True,
        secure=ENVIRONMENT != "development",
        samesite="lax",
        max_age=JWT_ACCESS_EXPIRATION_MINUTES * 60,
    )

    return {"message": "Successfully refreshed token"}
