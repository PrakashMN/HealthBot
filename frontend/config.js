// API Configuration
const API_CONFIG = {
    BASE_URL: window.location.hostname === 'localhost' 
        ? 'http://localhost:8001' 
        : 'https://healthbot-backend-ydzi.onrender.com',
    ENDPOINTS: {
        CHAT: '/chat',
        HEALTH: '/health',
        SYMPTOM_CHECK: '/symptom-check',
        EMERGENCY: '/emergency-contacts'
    }
};

window.API_CONFIG = API_CONFIG;