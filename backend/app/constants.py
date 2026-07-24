from dotenv import load_dotenv
import os

load_dotenv()

FRONTEND_URL = os.getenv("FRONTEND_URL")
POSTGRES_URL = os.getenv("POSTGRES_URL")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
ENVIRONMENT = os.getenv("ENVIRONMENT", "development").lower()

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-crypto-key-change-me")
ALGORITHM = "HS256"
COOKIE_NAME = "access_token"
JWT_EXPIRATION_MINUTES = 45
MAX_FILE_SIZE = 30 * 1024 * 1024  # 100 MB in bytes

if not FRONTEND_URL:
    raise Exception("Please enter frontend url in .env")

if not POSTGRES_URL:
    raise Exception("Please enter postgres url in .env")

if not GEMINI_API_KEY:
    raise Exception("Please enter postgres url in .env")
