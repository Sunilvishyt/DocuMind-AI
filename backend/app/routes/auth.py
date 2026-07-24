from app.schemas import UserRegisterRequest, RegisterResponse, UserLoginRequest
from app.schemas import LoginResponse
from sqlalchemy.orm import Session
from app.models import User
from fastapi import APIRouter, HTTPException, Response, status, Depends
from app.utils.password_utils import hash_password, verify_hash
from app.database import get_db
from sqlalchemy import or_
from app.config.jwt import create_access_token
from app.constants import COOKIE_NAME, JWT_EXPIRATION_MINUTES, ENVIRONMENT
from sqlalchemy.exc import IntegrityError
from fastapi.responses import JSONResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=RegisterResponse)
def register_user(
    request: UserRegisterRequest,
    db: Session = Depends(get_db),
):
    """Register a new user"""
    if request.password != request.confirm_password:
        return HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Password does not match"
        )

    # or_ is used to check if either case is true return the existing user.
    existing_user = (
        db.query(User)
        .filter(or_(User.username == request.username, User.email == request.email))
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
    hashed_password = hash_password(request.password)

    # Create a new user
    new_user = User(
        username=request.username,
        email=request.email,
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


@router.post("/login", response_model=LoginResponse)
def login_user(
    request: UserLoginRequest, response: Response, db: Session = Depends(get_db)
):
    # Find user by email
    user = db.query(User).filter(User.email == request.email).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found"
        )

    # Verify password
    if not verify_hash(request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid password"
        )

    # Check if user is active
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="User account is inactive"
        )

    access_token = create_access_token(str(user.id))

    response.set_cookie(
        key=COOKIE_NAME,
        value=access_token,
        httponly=True,  # Critical for XSS protection
        secure=False
        if ENVIRONMENT == "development"
        else True,  # Use False ONLY for local localhost development
        samesite="lax"
        if ENVIRONMENT == "development"
        else "none",  # Balance of CSRF security and usability
        max_age=JWT_EXPIRATION_MINUTES * 60,  # 45 minutes in seconds
    )

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


@router.post("/logout")
def logout_user(response: Response):
    response.delete_cookie(key=COOKIE_NAME)
    return {"message": "Successfully logged out"}
