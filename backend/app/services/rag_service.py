from app.storage import session_store
from app.prompts.prompt_templates import ASSISTANT_PROMPTS
from app.services.llm_service import llm


def ask_question(question: str, assistant_type: str = "general"):
    """
    Answer a question using RAG (Retrieval-Augmented Generation).

    Args:
        question: The user's question
        assistant_type: Type of assistant (medical, legal, finance, coding-assistant, general)

    Returns:
        The assistant's response

    Raises:
        ValueError: If no documents have been uploaded yet
    """
    # Check if documents have been uploaded
    if session_store.VECTOR_STORE is None:
        raise ValueError(
            "No documents have been uploaded. Please upload a document first."
        )

    # Retrieve relevant documents
    docs = session_store.VECTOR_STORE.similarity_search(question, k=4)

    # Combine document content
    context = "\n\n".join([doc.page_content for doc in docs])

    # Get the appropriate prompt for the assistant type
    prompt = ASSISTANT_PROMPTS.get(assistant_type, ASSISTANT_PROMPTS["general"])

    # Format the prompt with context and question
    final_prompt = prompt.format(context=context, question=question)

    # Get response from LLM
    response = llm.invoke(final_prompt)

    return response.content
