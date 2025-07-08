import api from './api';

// MOCK Admin Dashboard API calls
// These API endpoints are defined but not actually used in the application.
// The application is running entirely client-side with direct calls to OpenAI and Perplexity APIs.
export const adminAPI = {
  // Dashboard statistics
  getDashboardStats: () => api.get('/admin/dashboard/stats'),
  
  // Patients
  getAllPatients: (params) => api.get('/admin/patients', { params }),
  getPatientDetails: (patientId) => api.get(`/admin/patients/${patientId}`),
  
  // Consultations
  getAllConsultations: (params) => api.get('/admin/consultations', { params }),
  getConsultationDetails: (consultationId) => api.get(`/admin/consultations/${consultationId}`),
  
  // Reports
  getAllReports: (params) => api.get('/admin/reports', { params }),
  getReportDetails: (reportId) => api.get(`/admin/reports/${reportId}`),
  downloadReport: (reportId) => api.get(`/admin/reports/${reportId}/download`, { responseType: 'blob' }),
  
  // Analytics
  getAnalyticsData: (timeframe = 'last30Days') => api.get('/admin/analytics', { params: { timeframe } }),
  getDiagnosticsData: () => api.get('/admin/analytics/diagnostics'),
  getUsageData: () => api.get('/admin/analytics/usage'),
  
  // Settings
  updateSystemSettings: (settings) => api.put('/admin/settings/system', settings),
  updateProfileSettings: (settings) => api.put('/admin/settings/profile', settings),
  updateSecuritySettings: (settings) => api.put('/admin/settings/security', settings),
};

export default adminAPI; 