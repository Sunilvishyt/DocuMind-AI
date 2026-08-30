from langchain_core.documents import Document
from langchain_text_splitters import RecursiveCharacterTextSplitter


def chunk_documents(documents: list[Document]) -> list[Document]:
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        add_start_index=True,  # Keeps track of character position in original doc
    )
    # split_documents automatically propagates metadata (user_id, filename) to all chunks!
    chunks = text_splitter.split_documents(documents)
    return chunks
