import os

from dotenv import load_dotenv

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL")
POSTGRES_URL = os.getenv("POSTGRES_URL")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
ENVIRONMENT = os.getenv("ENVIRONMENT", "development").lower()

# JWT
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-crypto-key-change-me")
ALGORITHM = "HS256"
JWT_EXPIRATION_MINUTES = 15

COOKIE_NAME = "access_token" if ENVIRONMENT == "development" else "__Host-access_token"
MAX_FILE_SIZE = 30 * 1024 * 1024  # 30 MB in bytes

if not FRONTEND_URL or not POSTGRES_URL or not GEMINI_API_KEY:
    raise Exception("Please enter environment variables in .env")
