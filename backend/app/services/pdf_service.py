import pymupdf  # PyMuPDF (or use pypdf / pdfplumber)
from langchain_core.documents import Document


def extract_pdf_documents(current_user_id: str, file_bytes: bytes) -> list[Document]:
    docs = []
    # Wrap bytes in BytesIO so PyMuPDF/pypdf reads it like a file stream
    with pymupdf.open(stream=file_bytes, filetype="pdf") as doc:
        for page in doc:
            docs.append(
                Document(
                    page_content=page.get_text(), metadata={"user_id": current_user_id}
                )
            )
    return docs
