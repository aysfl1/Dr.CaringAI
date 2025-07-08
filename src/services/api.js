import axios from 'axios';

// Create an axios instance with base URL
// NOTE: This API configuration is not actually used in the application.
// The application is running entirely client-side with direct calls to OpenAI and Perplexity APIs.
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add request interceptor to include auth token in requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// MOCK API DEFINITIONS
// These API endpoints are defined but not actually used in the application.
// The application is running entirely client-side with direct calls to OpenAI and Perplexity APIs.

// Patient related API calls
export const patientAPI = {
    createPatient: (patientData) => api.post('/patient', patientData),
    getPatient: (patientId) => api.get(`/patient/${patientId}`),
    updatePatient: (patientId, patientData) => api.put(`/patient/${patientId}`, patientData),
};

// Consultation related API calls
export const consultationAPI = {
    startConsultation: (patientId) => api.post('/consultation', { patient_id: patientId }),
    getConsultation: (consultationId) => api.get(`/consultation/${consultationId}`),
    submitChiefComplaint: (consultationId, chiefComplaint) => 
        api.post(`/consultation/${consultationId}/chief-complaint`, { chief_complaint: chiefComplaint }),
    answerQuestions: (consultationId, answers) => 
        api.post(`/consultation/${consultationId}/answer-questions`, { answers }),
    answerDifferentialQuestions: (consultationId, answers) => 
        api.post(`/consultation/${consultationId}/differential-answers`, { answers }),
    selectTreatment: (consultationId, selectedOption) => 
        api.post(`/consultation/${consultationId}/select-treatment`, { selected_option: selectedOption }),
    generateReport: (consultationId) => 
        api.post(`/consultation/${consultationId}/generate-report`),
    downloadReport: (reportId) => 
        api.get(`/consultation/reports/${reportId}/download`, { responseType: 'blob' }),
};

// Authentication related API calls
export const authAPI = {
    login: (username, password) => 
        api.post('/auth/token', `username=${username}&password=${password}`, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }),
    getCurrentUser: () => api.get('/auth/users/me'),
};

export default api; 