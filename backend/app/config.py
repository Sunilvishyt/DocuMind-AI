from dotenv import load_dotenv
import os

load_dotenv()

# API Keys
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")

# Database
POSTGRES_URL = os.getenv(
    "POSTGRES_URL", "postgresql://user:password@localhost:5432/documind_db"
)

# JWT Configuration
JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your-secret-key-change-in-production")
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24  # Token expires after 24 hours
