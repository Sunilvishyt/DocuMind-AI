from datetime import datetime, timedelta, timezone
from typing import Annotated

import jwt
from app.constants import (
    ACCESS_COOKIE_NAME,
    ACCESS_SECRET_KEY,
    ALGORITHM,
    JWT_ACCESS_EXPIRATION_MINUTES,
    JWT_REFRESH_EXPIRATION_DAYS,
    REFRESH_SECRET_KEY,
)
from app.database import get_db
from app.models import User
from fastapi import Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession

"""create_access_token, create_refresh_token, get_current_user are instant tasks not cpu intensive so they remain synchronous"""


def create_access_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc)
        + timedelta(minutes=JWT_ACCESS_EXPIRATION_MINUTES),
    }
    # datetime.now(timezone.utc) provides the current time in UTC Using these together ensures your code always tracks the correct absolute time, no matter where your server or computer is physically located in the world.
    # timedelta is used to add particular time to the current time like days, hours, minutes
    return jwt.encode(payload, ACCESS_SECRET_KEY, algorithm=ALGORITHM)


def create_refresh_token(user_id: str):
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc)
        + timedelta(days=int(JWT_REFRESH_EXPIRATION_DAYS)),
    }
    return jwt.encode(payload, REFRESH_SECRET_KEY, algorithm=ALGORITHM)


def get_current_user_id(request: Request) -> str:
    """Dependency to extract token from cookies and verify the user."""

    token = request.cookies.get(ACCESS_COOKIE_NAME)
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="not authenticated",
        )
    try:
        payload = jwt.decode(token, ACCESS_SECRET_KEY, algorithms=[ALGORITHM])
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

    return user_id


async def get_current_user(
    request: Request, db: Annotated[AsyncSession, Depends(get_db)]
) -> User:
    """Dependency to extract token from cookies and verify the user."""

    user_id = get_current_user_id(request=request)
    user = await db.get(User, user_id)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="user not found"
        )

    return user
