from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.rag_service import ask_question

router = APIRouter()


class ChatRequest(BaseModel):
    question: str
    assistant_type: str = "general"  # Default to general assistant


@router.post("/chat")
async def chat(req: ChatRequest):
    try:
        answer = ask_question(req.question, req.assistant_type)
        return {"answer": answer}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat: {str(e)}")
