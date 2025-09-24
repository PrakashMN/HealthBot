// API Configuration
const API_CONFIG = {
    BASE_URL: window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? 'http://127.0.0.1:8001' 
        : 'https://backend-9t14.onrender.com',
    ENDPOINTS: {
        CHAT: '/chat',
        HEALTH: '/health',
        SYMPTOM_CHECK: '/symptom-check',
        EMERGENCY: '/emergency-contacts'
    }
};

console.log('API Config loaded:', API_CONFIG);
window.API_CONFIG = API_CONFIG;