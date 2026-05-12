from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import User
from app.schemas import (
    UserRegisterRequest,
    UserLoginRequest,
    RegisterResponse,
    LoginResponse,
    UserResponse,
)
from app.auth import hash_password, verify_password, create_access_token
from sqlalchemy.exc import IntegrityError

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=RegisterResponse)
async def register(request: UserRegisterRequest, db: Session = Depends(get_db)):
    """Register a new user"""

    # Validate passwords match
    if request.password != request.confirm_password:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match"
        )

    # Check if user already exists
    existing_user = (
        db.query(User)
        .filter((User.email == request.email) | (User.username == request.username))
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email or username already registered",
        )

    # Create new user
    hashed_password = hash_password(request.password)
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
            detail="Email or username already registered",
        )

    user_response = UserResponse.model_validate(new_user)
    return RegisterResponse(message="User registered successfully", user=user_response)


@router.post("/login", response_model=LoginResponse)
async def login(request: UserLoginRequest, db: Session = Depends(get_db)):
    """Login user and return JWT token"""

    # Find user by email
    user = db.query(User).filter(User.email == request.email).first()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password"
        )

    # Verify password
    if not verify_password(request.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password"
        )

    # Check if user is active
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN, detail="User account is inactive"
        )

    # Create JWT token
    access_token = create_access_token(
        data={"sub": str(user.id), "email": user.email, "username": user.username}
    )

    user_response = UserResponse.model_validate(user)
    return LoginResponse(
        access_token=access_token, token_type="bearer", user=user_response
    )


@router.get("/me", response_model=UserResponse)
async def get_current_user(token: str = None, db: Session = Depends(get_db)):
    """Get current authenticated user info"""
    from app.auth import decode_token
    from fastapi import Header

    # Try to get token from Authorization header
    if token is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
        )

    payload = decode_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token"
        )

    user_id = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token"
        )

    user = db.query(User).filter(User.id == user_id).first()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )

    return UserResponse.model_validate(user)
