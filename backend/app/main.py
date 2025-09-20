from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Enable CORS for frontend (http://localhost:3000 or nginx service)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    user: str
    text: str

@app.get("/ping")
def ping():
    return {"status": "ok"}

@app.post("/chat")
def chat(msg: Message):
    # Replace with Rasa or AI later
    return {"reply": f"Hi {msg.user}, you said: {msg.text}"}
