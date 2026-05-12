from fastapi import FastAPI
from app.routes import upload, chat, auth
from app.database import init_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Initialize database tables
init_db()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(upload.router)
app.include_router(chat.router)


@app.get("/")
async def root():
    return {"message": "Hello World"}
