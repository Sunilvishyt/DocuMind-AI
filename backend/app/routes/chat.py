import json
from typing import Annotated

from app.config.jwt import get_current_user_id
from app.config.llm import llm
from app.config.vector_store import query_user_vectorstore
from app.prompts.prompt_template import ASSISTANT_PROMPTS
from app.schemas import ChatRequest
from fastapi import APIRouter, Depends, HTTPException, Response

router = APIRouter(prefix="/api")


@router.post("/chat")
def check(
    req: ChatRequest, current_user_id: Annotated[str, Depends(get_current_user_id)]
):
    try:
        related_docs = query_user_vectorstore(
            query=req.question, current_user_id=current_user_id
        )

        prompt = ASSISTANT_PROMPTS.get(req.assistant_type, "general")

        context = "\n\n".join([doc.page_content for doc in related_docs])

        final_prompt = prompt.invoke({"context": context, "question": req.question})

        response = llm.invoke(final_prompt)

        json_string = json.dumps({"answer": response.content}, ensure_ascii=False)

        return Response(content=json_string, media_type="application/json")

    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing chat: {str(e)}")
