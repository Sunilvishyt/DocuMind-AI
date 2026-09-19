from app.constants import POSTGRES_URL
from app.services.embedding_service import embeddings
from langchain_core.documents import Document
from langchain_postgres.vectorstores import PGVector
from sqlalchemy import text
from sqlalchemy.ext.asyncio import create_async_engine

async_engine = create_async_engine(
    POSTGRES_URL, echo=False, pool_pre_ping=True, pool_size=10, max_overflow=20
)

# this will store documents on seperate table to identify which chunk belongs to which user we have to add metadata of user_id on every document.
vector_store = PGVector(
    embeddings=embeddings,
    collection_name="embedding",  # Table collection name
    connection=async_engine,
    use_jsonb=True,  # Recommended for fast JSON metadata filtering
    create_extension=False,
)


async def clear_existing_user_document(user_id: str):
    """
    Safely ensures the user_id index exists, then deletes all
    vector chunks belonging to the specified user_id.
    """
    try:
        async with async_engine.begin() as conn:
            await conn.execute(
                text(
                    """
                    CREATE INDEX IF NOT EXISTS idx_metadata_user_id 
                    ON langchain_pg_embedding ((cmetadata ->> 'user_id'));
                    """
                )
            )

            result = await conn.execute(
                text(
                    """
                    DELETE FROM langchain_pg_embedding 
                    WHERE cmetadata ->> 'user_id' = :user_id;
                    """
                ),
                {"user_id": user_id},
            )
            deleted_count = result.rowcount

        print(f"Success: Securely purged {deleted_count} chunks for user '{user_id}'.")
        return deleted_count

    except Exception as e:
        print(f"An error occurred while deleting user data: {e}")
        return 0


async def store_user_chunks(chunks: list[Document]):
    """
    Ingests chunks into Neon PGVector database.
    """
    # add_documents handles embedding calculation and storage automatically!
    await vector_store.aadd_documents(chunks)


async def query_user_vectorstore(query: str, current_user_id: str) -> list[Document]:
    """
    Retrieves only the chunks belonging to the requesting user.
    """
    # Metadata filter applied at DB query level
    results = await vector_store.asimilarity_search(
        query=query,
        k=3,  # Retrieve top 4 relevant chunks
        filter={"user_id": current_user_id},  # STRICT USER ISOLATION
    )
    return results
