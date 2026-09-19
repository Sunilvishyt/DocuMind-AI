import os
from urllib.parse import parse_qs, urlencode, urlparse, urlunparse

from dotenv import load_dotenv

load_dotenv()


def normalize_async_database_url(url: str | None) -> str | None:
    """Normalize PostgreSQL URLs for SQLAlchemy's asyncpg dialect."""
    if not url:
        return url

    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql+asyncpg://", 1)
    elif url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+asyncpg://", 1)

    parsed = urlparse(url)
    query_params = parse_qs(parsed.query)
    query_params.pop("channel_binding", None)

    sslmode = query_params.pop("sslmode", [None])[0]
    if sslmode in {"require", "verify-ca", "verify-full"}:
        query_params["ssl"] = ["require"]

    return urlunparse(parsed._replace(query=urlencode(query_params, doseq=True)))


FRONTEND_URL = os.getenv("FRONTEND_URL")
POSTGRES_URL = normalize_async_database_url(os.getenv("POSTGRES_URL"))
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
ENVIRONMENT = os.getenv("ENVIRONMENT", "development").lower()

if not FRONTEND_URL or not POSTGRES_URL or not GEMINI_API_KEY:
    raise Exception("Please enter environment variables in .env")


# JWT Secrets
ACCESS_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "super-secret-crypto-key-change-me")
REFRESH_SECRET_KEY = os.getenv(
    "REFRESH_SECRET_KEY", "super-secret-refresh-crypto-key-change-me"
)

# JWT Expirations
JWT_ACCESS_EXPIRATION_MINUTES = int(os.getenv("JWT_ACCESS_EXPIRATION_MINUTES", 15))
JWT_REFRESH_EXPIRATION_DAYS = int(os.getenv("JWT_REFRESH_EXPIRATION_DAYS", 7))

# JWT cookie name
ACCESS_COOKIE_NAME = (
    "access_token" if ENVIRONMENT == "development" else "__Host-access_token"
)
REFRESH_COOKIE_NAME = (
    "refresh_token" if ENVIRONMENT == "development" else "__Host-refresh_token"
)

# bcrypt
ALGORITHM = "HS256"

# pdf file size
MAX_FILE_SIZE = 30 * 1024 * 1024  # 30 MB in bytes
