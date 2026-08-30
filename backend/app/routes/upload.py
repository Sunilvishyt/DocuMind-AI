import os
from typing import Annotated

from app.config.jwt import get_current_user_id
from app.config.vector_store import clear_existing_user_document, store_user_chunks
from app.constants import MAX_FILE_SIZE
from app.services.chunking_service import chunk_documents
from app.services.pdf_service import extract_pdf_documents
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status

router = APIRouter()


@router.post("/upload")
async def upload_file(
    file: Annotated[UploadFile, File(...)],
    current_user_id: Annotated[str, Depends(get_current_user_id)],
):
    """Upload and process a document (PDF) file in RAM."""

    if file.size and file.size > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=status.HTTP_413_REQUEST_ENTITY_TOO_LARGE,
            detail=f"File is too large. Maximum allowed size is {MAX_FILE_SIZE}MB.",
        )

    try:
        # clear old document embeddings
        clear_existing_user_document(user_id=current_user_id)
        # get file extension and verify
        extension = os.path.splitext(file.filename)[1].lower()
        if extension != ".pdf":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only PDF files are allowed.",
            )

        # Read the file content into memory
        file_bytes = await file.read()
        raw_documents = extract_pdf_documents(current_user_id, file_bytes=file_bytes)
        chunked_documents = chunk_documents(raw_documents)
        store_user_chunks(chunks=chunked_documents)

        # chunks are properly created.
        return {
            "message": "success",
            "chunks": len(chunked_documents),
            "filename": file.filename,
        }

    except Exception as e:
        return {"error": f"Failed to process file: {str(e)}"}
