import bcrypt


def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed_bytes = bcrypt.hashpw(password.encode("utf-8"), salt)
    # Decode bytes to standard utf-8 string for easy DB storage
    return hashed_bytes.decode("utf-8")


def verify_hash(password: str, hashed_password: str) -> bool:
    # Ensure both arguments are encoded to bytes before checking
    password_bytes = password.encode("utf-8")

    # If hashed_password comes in as a string, encode it to bytes
    if isinstance(hashed_password, str):
        hashed_bytes = hashed_password.encode("utf-8")
    else:
        hashed_bytes = hashed_password

    return bcrypt.checkpw(password_bytes, hashed_bytes)
