from fastapi import APIRouter, UploadFile, File
import os
from app.services.pdf_service import extract_pdf_text
from app.services.chunk_service import chunk_text
from app.services.vector_service import create_vector_store
from app.storage import session_store
from app.services.image_service import extract_image_text

router = APIRouter()

UPLOAD_DIR = "uploads"

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload and process a document (PDF or image).
    Creates a temporary vector store for the session.
    """
    try:
        # save uploaded file
        file_path = os.path.join(UPLOAD_DIR, file.filename)

        with open(file_path, "wb") as f:
            content = await file.read()
            f.write(content)

        # Determine file type and extract text
        extension = os.path.splitext(file.filename)[1].lower()

        # extract text
        if extension == ".pdf":
            text = extract_pdf_text(file_path)

        elif extension in [".jpg", ".jpeg", ".png", ".bmp", ".tiff"]:
            # Call your image extraction function here
            text = extract_image_text(file_path)

        else:
            return {"error": f"Unsupported file type: {extension}"}

        # chunking
        chunks = chunk_text(text)

        # vector store
        vector_store = create_vector_store(chunks)

        # save globally for this session
        session_store.VECTOR_STORE = vector_store
        session_store.CURRENT_DOCUMENT_TEXT = text

        return {"message": "success", "chunks": len(chunks), "filename": file.filename}

    except Exception as e:
        return {"error": f"Failed to process file: {str(e)}"}


@router.post("/clear-session")
async def clear_session():
    """
    Clear all session data (documents, vectors).
    Call this when the user closes the browser or ends the session.
    """
    try:
        session_store.VECTOR_STORE = None
        session_store.CURRENT_DOCUMENT_TEXT = ""

        # Clean up uploaded files
        if os.path.exists(UPLOAD_DIR):
            for filename in os.listdir(UPLOAD_DIR):
                file_path = os.path.join(UPLOAD_DIR, filename)
                try:
                    if os.path.isfile(file_path):
                        os.remove(file_path)
                except Exception as e:
                    print(f"Error deleting file {file_path}: {e}")

        return {"message": "Session cleared successfully"}

    except Exception as e:
        return {"error": f"Failed to clear session: {str(e)}"}
