from langchain_postgres.vectorstores import PGVector
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_core.documents import Document
from app.constants import POSTGRES_URL
from app.services.embedding_service import embeddings

# this will store documents on seperate table to identify which chunk belongs to which user we have to add metadata of user_id on every document.
vector_store = PGVector(
    embeddings=embeddings,
    collection_name="embedding",  # Table collection name
    connection=POSTGRES_URL,
    use_jsonb=True,  # Recommended for fast JSON metadata filtering
)


def clear_existing_user_document(user_id: str):
    """
    Deletes all previous document chunks for a specific user.
    """
    # Uses SQL JSONB filtering to remove old chunks for this user
    vector_store.delete(filter={"user_id": user_id})


def store_user_chunks(chunks: list[Document]):
    """
    Ingests chunks into Neon PGVector database.
    """
    # add_documents handles embedding calculation and storage automatically!
    vector_store.add_documents(chunks)


def query_user_vectorstore(query: str, current_user_id: str) -> list[Document]:
    """
    Retrieves only the chunks belonging to the requesting user.
    """
    # Metadata filter applied at DB query level
    results = vector_store.similarity_search(
        query=query,
        k=3,  # Retrieve top 4 relevant chunks
        filter={"user_id": current_user_id},  # STRICT USER ISOLATION
    )
    return results
