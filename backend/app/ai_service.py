import os
import json
import requests
from typing import Dict, Any
from dotenv import load_dotenv

load_dotenv()

class AIHealthAssistant:
    def __init__(self):
        self.groq_api_key = os.getenv("GROQ_API_KEY")
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
        
    def get_health_response(self, user_message: str, language: str = "en") -> str:
        """Get AI-powered health response"""
        
        # Health-focused system prompt
        system_prompt = f"""You are HealthBot, an AI health assistant for rural and semi-urban communities in India. 

CRITICAL GUIDELINES:
- Always include medical disclaimer
- Provide evidence-based information only
- Suggest consulting healthcare professionals for serious symptoms
- Be culturally sensitive to Indian context
- Respond in {language} language
- Focus on preventive care and basic health education
- Include emergency guidance when needed

RESPONSE FORMAT:
- Start with appropriate emoji
- Provide clear, actionable advice
- Include "Seek medical care if..." section
- End with confidence level (70-95%)

USER QUERY: {user_message}"""

        try:
            # Try Groq first (free and fast)
            if self.groq_api_key:
                return self._get_groq_response(system_prompt, user_message)
            # Fallback to OpenAI
            elif self.openai_api_key:
                return self._get_openai_response(system_prompt, user_message)
            else:
                return self._get_fallback_response(user_message)
                
        except Exception as e:
            return self._get_fallback_response(user_message)
    
    def _get_groq_response(self, system_prompt: str, user_message: str) -> str:
        """Get response from Groq API (Free)"""
        url = "https://api.groq.com/openai/v1/chat/completions"
        
        headers = {
            "Authorization": f"Bearer {self.groq_api_key}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": "llama-3.1-8b-instant",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            "max_tokens": 500,
            "temperature": 0.7
        }
        
        try:
            response = requests.post(url, headers=headers, json=data, timeout=30)
            
            if response.status_code == 200:
                result = response.json()
                return result["choices"][0]["message"]["content"]
            else:
                print(f"Groq API error: {response.status_code} - {response.text}")
                raise Exception(f"Groq API error: {response.status_code}")
        except requests.exceptions.RequestException as e:
            print(f"Network error calling Groq API: {e}")
            raise Exception(f"Network error: {e}")
    
    def _get_openai_response(self, system_prompt: str, user_message: str) -> str:
        """Get response from OpenAI API"""
        url = "https://api.openai.com/v1/chat/completions"
        
        headers = {
            "Authorization": f"Bearer {self.openai_api_key}",
            "Content-Type": "application/json"
        }
        
        data = {
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_message}
            ],
            "max_tokens": 500,
            "temperature": 0.7
        }
        
        response = requests.post(url, headers=headers, json=data, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            return result["choices"][0]["message"]["content"]
        else:
            raise Exception(f"OpenAI API error: {response.status_code}")
    
    def _get_fallback_response(self, user_message: str) -> str:
        """Fallback response when AI APIs are unavailable"""
        return f"""🤖 **AI Health Assistant**

Thank you for your health question: "{user_message}"

**Current Status:** AI services are temporarily unavailable, but I can still help with basic guidance.

**General Health Advice:**
• For symptoms: Monitor closely and note duration/severity
• For emergencies: Call 108 (India Emergency) immediately
• For prevention: Maintain hygiene, balanced diet, regular exercise
• For medications: Always consult qualified healthcare professionals

**⚠️ Medical Disclaimer:** This is general information only. Always consult healthcare professionals for medical advice, diagnosis, or treatment.

**🏥 Seek Medical Care If:**
• Symptoms worsen or persist >3 days
• High fever (>101°F/38.3°C)
• Difficulty breathing
• Severe pain or discomfort

**Confidence Level:** 75% | **Recommendation:** Consult healthcare provider

Would you like me to provide more specific guidance on any health topic?"""

# Initialize AI service
ai_assistant = AIHealthAssistant()