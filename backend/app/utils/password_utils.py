import asyncio
import bcrypt


def _hash_password_sync(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_bytes = bcrypt.hashpw(password.encode("utf-8"), salt)
    # Decode bytes to standard utf-8 string for easy DB storage
    return hashed_bytes.decode("utf-8")


def _verify_hash_sync(password: str, hashed_password: str) -> bool:
    # Ensure both arguments are encoded to bytes before checking
    password_bytes = password.encode("utf-8")

    # If hashed_password comes in as a string, encode it to bytes
    if isinstance(hashed_password, str):
        hashed_bytes = hashed_password.encode("utf-8")
    else:
        hashed_bytes = hashed_password

    return bcrypt.checkpw(password_bytes, hashed_bytes)


# ---------------------------------------------------------
# Non-blocking Async Wrappers
# ---------------------------------------------------------


async def hash_password(password: str) -> str:
    """Asynchronous wrapper that offloads CPU-intensive password hashing to a thread worker."""
    return await asyncio.to_thread(_hash_password_sync, password)


async def verify_hash(password: str, hashed_password: str) -> bool:
    """Asynchronous wrapper that offloads CPU-intensive password verification to a thread worker."""
    return await asyncio.to_thread(_verify_hash_sync, password, hashed_password)
