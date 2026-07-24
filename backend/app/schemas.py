from pydantic import BaseModel, Field, EmailStr, field_validator
from datetime import datetime
from uuid import UUID
from typing import Any


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
    username: str = Field(..., min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=72)
    confirm_password: str = Field(..., min_length=8, max_length=72)


class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterResponse(BaseModel):
    message: str


class LoginResponse(BaseModel):
    message: str


class ChatRequest(BaseModel):
    question: str
    assistant_type: str = "general"  # Default to general assistant
