from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.constants import FRONTEND_URL
from app.routes import auth, upload, chat
from app.database import init_db

app = FastAPI()
init_db()

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
