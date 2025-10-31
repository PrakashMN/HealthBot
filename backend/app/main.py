from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.ai_service import ai_assistant
import asyncio
import time
from typing import Optional

app = FastAPI(title="HealthBot AI API", version="1.0.0")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatMessage(BaseModel):
    message: str
    language: Optional[str] = "en"
    user_id: Optional[str] = None

class HealthQuery(BaseModel):
    symptoms: str
    age: Optional[int] = None
    gender: Optional[str] = None
    language: Optional[str] = "en"

@app.get("/")
def root():
    return {"message": "HealthBot AI API is running!", "version": "1.0.0"}

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "HealthBot AI"}

@app.post("/chat")
async def chat_with_ai(chat: ChatMessage):
    """Main chat endpoint with AI integration"""
    try:
        # Get AI response
        ai_response = ai_assistant.get_health_response(
            user_message=chat.message,
            language=chat.language
        )
        
        return {
            "success": True,
            "response": ai_response,
            "language": chat.language,
            # epoch seconds for easier client handling/logging
            "timestamp": time.time()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI service error: {str(e)}")

@app.post("/symptom-check")
async def symptom_checker(query: HealthQuery):
    """Specialized symptom checking endpoint"""
    try:
        # Enhanced prompt for symptom checking
        enhanced_message = f"Symptom Analysis Request: {query.symptoms}"
        if query.age:
            enhanced_message += f" (Age: {query.age})"
        if query.gender:
            enhanced_message += f" (Gender: {query.gender})"
            
        ai_response = ai_assistant.get_health_response(
            user_message=enhanced_message,
            language=query.language
        )
        
        return {
            "success": True,
            "analysis": ai_response,
            "severity": "moderate",  # AI could determine this
            "recommendations": ["Consult healthcare provider", "Monitor symptoms"],
            "language": query.language
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Symptom analysis error: {str(e)}")

@app.get("/emergency-contacts")
def get_emergency_contacts():
    """Get emergency contact numbers for India"""
    return {
        "emergency_numbers": {
            "national_emergency": "112",
            "ambulance": "108",
            "medical_emergency": "102",
            "police": "100",
            "fire": "101",
            "poison_control": "1066"
        },
        "message": "In case of emergency, call these numbers immediately"
    }
