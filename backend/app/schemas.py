from email_validator import validate_email
from email_validator import EmailNotValidError
from datetime import datetime
from uuid import UUID
from typing import Any, Annotated
from pydantic import BaseModel, Field, field_validator, AfterValidator

import re
from pydantic_core import PydanticCustomError

# 1. Helper functions that throw clean messages to frontend
def validate_email_str(v: str) -> str:
    pattern = r"^[\w\.-]+@[\w\.-]+\.\w+$"
    if not re.match(pattern, v):
        raise PydanticCustomError("invalid_email", "Invalid email address format.")
    return v

def validate_password_str(v: str) -> str:
    if len(v) < 8:
        raise PydanticCustomError("password_too_short", "Password must be at least 8 characters.")
    if len(v) > 72:
        raise PydanticCustomError("password_too_long", "Password cannot exceed 72 characters.")
    return v

def validate_username_str(v:str) -> str:
    if len(v) < 3:
        raise PydanticCustomError("username_too_short", "Username must be at least 3 characters.")
    if len(v) > 50:
        raise PydanticCustomError("username_too_long", "Username cannot exceed 50 characters.")
    return v

# 2. Define reusable Zod-like types
Email = Annotated[str, AfterValidator(validate_email_str)]
Password = Annotated[str, AfterValidator(validate_password_str)]
Username = Annotated[str, AfterValidator(validate_username_str)]

class UserResponse(BaseModel):
    id: str
    username: str
    email: str
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}

    @field_validator("id", mode="before")
    @classmethod
    def convert_id_to_str(cls, v: Any) -> str:
        """Convert UUID to string before validation"""
        if isinstance(v, UUID):
            return str(v)
        return str(v)


class UserRegisterRequest(BaseModel):
    username: str = Username
    email: Email
    password: Password
    confirm_password: Password

# 3. Clean Model (Looks just like Zod!)
class UserLoginRequest(BaseModel):
    email: Email
    password: Password

class RegisterResponse(BaseModel):
    message: str


class LoginResponse(BaseModel):
    message: str


class ChatRequest(BaseModel):
    question: str
    assistant_type: str = "general"  # Default to general assistant
