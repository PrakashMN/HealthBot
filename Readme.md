# DrBuddy 🤖

An AI-driven health assistant designed to empower rural and semi-urban communities with intelligent and accessible healthcare assistance.

## 🎯 Mission

To democratize healthcare access by providing AI-powered, multilingual health assistance to underserved rural and semi-urban populations, bridging the gap between communities and quality healthcare information AI-Driven Public Health Chatbot - Comprehensive Sy....html].

## ✨ Key Features

* **Multilingual Support**: Native support for English, हिंदी, বাংলা, ಕನ್ನಡ, and ଓଡ଼ିଆ with automatic language detection AI-Driven Public Health Chatbot - Comprehensive Sy....html].
* **Disease Symptom Checker**: AI-powered symptom analysis to provide preliminary health assessments and recommend appropriate actions AI-Driven Public Health Chatbot - Comprehensive Sy....html].
* **Vaccination Schedule Tracker**: Personalized vaccination reminders for children and adults AI-Driven Public Health Chatbot - Comprehensive Sy....html].
* **Preventive Healthcare Tips**: Daily health tips and seasonal disease prevention advice tailored to regional challenges AI-Driven Public Health Chatbot - Comprehensive Sy....html].
* **Outbreak Alerts**: Real-time notifications about disease outbreaks and location-specific health advisories AI-Driven Public Health Chatbot - Comprehensive Sy....html].
* **Emergency Contact Integration**: Quick access to emergency services and nearby healthcare facilities AI-Driven Public Health Chatbot - Comprehensive Sy....html].

## 🛠️ Tech Stack

* **Backend**: Python, FastAPI
* **Frontend**: HTML, CSS, JavaScript
* **Containerization**: Docker, Docker Compose

## 🚀 Getting Started

Thanks to containerization with Docker, getting the project running locally is very simple.

### Prerequisites

Make sure you have the following installed on your local machine:
* [Git](https://git-scm.com/downloads)
* [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    ```

2.  **Navigate to the project directory:**
    ```bash
    cd DrBuddy
    ```

3.  **Run the application using Docker Compose:**
    ```bash
    docker-compose up
    ```
    This single command will build the images for the frontend and backend services and start the containers.

4.  Open your web browser and navigate to `http://localhost:3000` to see the frontend. The backend API runs at `http://localhost:8001` by default.

## 📂 Project Structure

The project is organized into separate `frontend` and `backend` services with additional configuration files.

```
DrBuddy/
├── backend/
│   ├── app/
│   │   ├── ai_service.py
│   │   └── main.py
│   ├── .env
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── app.js
│   ├── config.js
│   ├── index.html
│   ├── react-components.js
│   └── style.css
├── .gitignore
├── AI_SETUP.md
├── docker-compose.yml
├── package.json
├── render.yaml
├── test_api.py
└── vercel.json
```

## 🤝 Contributing

Contributions from the team are welcome! Please follow this simple workflow:

1.  Create a new branch for your feature (`git checkout -b feature/AmazingFeature`).
2.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
3.  Push to the branch (`git push origin feature/AmazingFeature`).
4.  Open a Pull Request for review.

## 👥 Authors

* Prakash Nagaral
* ____
* ____
* ____
* ____
* ____