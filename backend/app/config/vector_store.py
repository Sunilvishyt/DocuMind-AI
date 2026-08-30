from app.constants import POSTGRES_URL
from app.services.embedding_service import embeddings
from langchain_core.documents import Document
from langchain_postgres.vectorstores import PGVector
import psycopg2

# this will store documents on seperate table to identify which chunk belongs to which user we have to add metadata of user_id on every document.
vector_store = PGVector(
    embeddings=embeddings,
    collection_name="embedding",  # Table collection name
    connection=POSTGRES_URL,
    use_jsonb=True,  # Recommended for fast JSON metadata filtering
)


def clear_existing_user_document(user_id: str):
    """
    Safely ensures the user_id index exists, then deletes all
    vector chunks belonging to the specified user_id.
    """
    try:
        with psycopg2.connect(POSTGRES_URL) as conn:
            with conn.cursor() as cur:
                # 1. What is this index? It acts like an alphabetical index at the back of a massive book.
                # Instead of checking millions of rows one by one, PostgreSQL reads this index to
                # instantly find and delete only 'user_123' records in milliseconds.
                cur.execute(
                    """
                    CREATE INDEX IF NOT EXISTS idx_metadata_user_id 
                    ON langchain_pg_embedding ((cmetadata ->> 'user_id'));
                    """
                )

                # 2. Execute the actual deletion of the user's vector chunks
                cur.execute(
                    """
                    DELETE FROM langchain_pg_embedding 
                    WHERE cmetadata ->> 'user_id' = %s;
                    """,
                    (user_id,),
                )

                # Get the count of deleted rows to give you confirmation feedback
                deleted_count = cur.rowcount

            # Commit the structural index changes and row deletions to the database permanently
            conn.commit()

        print(f"Success: Securely purged {deleted_count} chunks for user '{user_id}'.")
        return deleted_count

    except Exception as e:
        print(f"An error occurred while deleting user data: {e}")
        return 0


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
