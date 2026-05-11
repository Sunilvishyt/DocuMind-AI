from langchain_community.vectorstores import FAISS
from app.services.embedding_service import embedding_model


def create_vector_store(chunks):
    return FAISS.from_texts(chunks, embedding_model)
