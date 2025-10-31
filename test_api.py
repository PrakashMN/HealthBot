import os
import requests

# Test Groq API using environment variable for security
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise SystemExit("GROQ_API_KEY not set. Create a .env file or set the environment variable before running this test.")

url = "https://api.groq.com/openai/v1/chat/completions"

headers = {
    "Authorization": f"Bearer {api_key}",
    "Content-Type": "application/json"
}

data = {
    "model": "llama-3.1-8b-instant",
    "messages": [
        {"role": "user", "content": "Hello, can you help with health questions?"}
    ],
    "max_tokens": 100
}

try:
    response = requests.post(url, headers=headers, json=data, timeout=10)
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
except Exception as e:
    print(f"Error: {e}")