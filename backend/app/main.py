from contextlib import asynccontextmanager

from app.constants import FRONTEND_URL
from app.database import engine, init_db
from app.routes import auth, chat, upload
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text


@asynccontextmanager
async def lifespan(app: FastAPI):
    # app startup
    print("Server Started on PORT : 8000")
    await init_db()

    async with engine.begin() as conn:
        await conn.execute(text("CREATE EXTENSION IF NOT EXISTS vector;"))

    yield

    # app shut down
    print("Server shutting down!")
    await engine.dispose()


app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(upload.router)
app.include_router(chat.router)
