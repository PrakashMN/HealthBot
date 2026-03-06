import os
from dotenv import load_dotenv

load_dotenv()

groq = os.getenv("GROQ_API_KEY")
openai = os.getenv("OPENAI_API_KEY")

if groq:
    print("GROQ_API_KEY: FOUND")
else:
    print("GROQ_API_KEY: MISSING")

if openai:
    print("OPENAI_API_KEY: FOUND")
else:
    print("OPENAI_API_KEY: MISSING")
