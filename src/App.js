import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ConsultationProvider } from './context/ConsultationContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoginPage from './pages/LoginPage';
import PatientsPage from './pages/PatientsPage';
import ConsultationPage from './pages/ConsultationPage';
import HomePage from './pages/HomePage';
import PatientFormPage from './pages/PatientFormPage';
// Import admin pages
import AdminDashboard from './pages/admin/AdminDashboard';
import ConsultationsPage from './pages/admin/ConsultationsPage';
import ReportsPage from './pages/admin/ReportsPage';
import AnalyticsPage from './pages/admin/AnalyticsPage';
import SettingsPage from './pages/admin/SettingsPage';
// Import static pages
import AboutPage from './pages/static/AboutPage';
import HowItWorksPage from './pages/static/HowItWorksPage';
import FAQPage from './pages/static/FAQPage';
import ContactPage from './pages/static/ContactPage';
import TermsPage from './pages/static/TermsPage';
import PrivacyPage from './pages/static/PrivacyPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Protected route component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <ConsultationProvider>
          <div className="App d-flex flex-column min-vh-100">
            <Navigation />
            <div className="flex-grow-1 content-container">
              <Routes>
                {/* Show homepage for patients */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/start-consultation" element={<PatientFormPage />} />
                <Route path="/consultation/:patientId" element={<ConsultationPage />} />
                
                {/* Static pages */}
                <Route path="/about" element={<AboutPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/terms" element={<TermsPage />} />
                <Route path="/privacy" element={<PrivacyPage />} />
                
                {/* Legacy Admin/Doctor routes */}
                <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="/patients" element={<Navigate to="/admin/patients" replace />} />
                <Route path="/settings" element={<Navigate to="/admin/settings" replace />} />
                
                {/* Admin routes - now with authentication */}
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                } />
                <Route path="/admin/patients" element={
                  <ProtectedRoute>
                    <PatientsPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/consultations" element={
                  <ProtectedRoute>
                    <ConsultationsPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/reports" element={
                  <ProtectedRoute>
                    <ReportsPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/analytics" element={
                  <ProtectedRoute>
                    <AnalyticsPage />
                  </ProtectedRoute>
                } />
                <Route path="/admin/settings" element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                } />
                
                {/* Redirect other unknown paths to homepage */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </ConsultationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
