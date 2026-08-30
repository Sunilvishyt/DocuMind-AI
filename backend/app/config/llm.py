from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI

load_dotenv()

# llm = ChatGroq(model="llama-3.1-8b-instant", verbose=False, max_tokens=500)
llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-lite", verbose=False, max_tokens=500
)
