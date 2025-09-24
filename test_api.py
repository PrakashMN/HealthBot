import requests
import json

# Test Groq API
api_key = "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"
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