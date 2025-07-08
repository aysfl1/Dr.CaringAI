import React, { createContext, useState, useContext } from 'react';
import { consultationAPI } from '../services/api';

// Create the consultation context
const ConsultationContext = createContext();

// Custom hook to use the consultation context
export const useConsultation = () => useContext(ConsultationContext);

// Consultation provider component
export const ConsultationProvider = ({ children }) => {
    const [consultation, setConsultation] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentStep, setCurrentStep] = useState('initial'); // initial, questions, diagnosis, treatment, report
    const [questions, setQuestions] = useState([]);
    const [diagnoses, setDiagnoses] = useState([]);
    const [differentialQuestions, setDifferentialQuestions] = useState([]);
    const [finalDiagnosis, setFinalDiagnosis] = useState(null);
    const [explanation, setExplanation] = useState(null);
    const [treatmentOptions, setTreatmentOptions] = useState([]);
    const [detailedPlan, setDetailedPlan] = useState(null);
    const [reportUrl, setReportUrl] = useState(null);
    const [completenessScore, setCompletenessScore] = useState(0);
    
    // Calculate the progress percentage based on the current step
    const calculateProgressPercentage = () => {
        switch (currentStep) {
            case 'initial':
                return 0;
            case 'questions':
                // During the question phase, use the completeness score
                return Math.max(20, completenessScore);
            case 'diagnosis':
                return 60;
            case 'treatment':
                return 80;
            case 'report':
                return 100;
            default:
                return 0;
        }
    };

    // NOTE: The following functions are defined but not actually used in the application.
    // The application is running entirely client-side with direct calls to OpenAI and Perplexity APIs.
    // These functions are kept for reference but don't actually make server calls.

    // Start a new consultation
    const startConsultation = async (patientId) => {
        try {
            setLoading(true);
            setError(null);
            
            // Mock API call - not actually used
            const response = await consultationAPI.startConsultation(patientId);
            setConsultation(response.data);
            setCurrentStep('initial');
            
            return response.data;
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to start consultation');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Submit chief complaint
    const submitChiefComplaint = async (consultationId, chiefComplaint) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await consultationAPI.submitChiefComplaint(consultationId, chiefComplaint);
            setConsultation(response.data);
            setQuestions(response.data.questions || []);
            setCompletenessScore(response.data.completeness_score || 0);
            setCurrentStep('questions');
            
            return response.data;
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to submit chief complaint');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Answer interview questions
    const answerQuestions = async (consultationId, answers) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await consultationAPI.answerQuestions(consultationId, answers);
            setCompletenessScore(response.data.completeness_score || 0);
            
            if (response.data.status === 'diagnosis_ready') {
                setDiagnoses(response.data.diagnoses || []);
                setDifferentialQuestions(response.data.differential_questions || []);
                setCurrentStep('diagnosis');
            } else {
                setQuestions(response.data.questions || []);
                setCurrentStep('questions');
            }
            
            return response.data;
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to process answers');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Answer differential diagnosis questions
    const answerDifferentialQuestions = async (consultationId, answers) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await consultationAPI.answerDifferentialQuestions(consultationId, answers);
            setConsultation(response.data);
            setFinalDiagnosis(response.data.final_diagnosis);
            setExplanation(response.data.explanation);
            setTreatmentOptions(response.data.treatment_options || []);
            setCurrentStep('treatment');
            
            return response.data;
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to submit differential answers');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Select treatment plan
    const selectTreatment = async (consultationId, selectedOption) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await consultationAPI.selectTreatment(consultationId, selectedOption);
            setConsultation(response.data);
            setDetailedPlan(response.data.detailed_plan);
            setCurrentStep('report');
            
            return response.data;
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to select treatment');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Generate report
    const generateReport = async (consultationId) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await consultationAPI.generateReport(consultationId);
            setReportUrl(response.data.report_url || null);
            setCurrentStep('report');
            
            return response.data;
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to generate report');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Download report
    const downloadReport = async (reportId) => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await consultationAPI.downloadReport(reportId);
            
            // Create a blob URL for the PDF
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            
            // Open the PDF in a new tab
            window.open(url, '_blank');
            
            return url;
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to download report');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Reset consultation state
    const resetConsultation = () => {
        setConsultation(null);
        setQuestions([]);
        setDiagnoses([]);
        setDifferentialQuestions([]);
        setFinalDiagnosis(null);
        setExplanation(null);
        setTreatmentOptions([]);
        setDetailedPlan(null);
        setReportUrl(null);
        setCompletenessScore(0);
        setCurrentStep('initial');
    };

    // Consultation context value
    const value = {
        consultation,
        loading,
        error,
        currentStep,
        questions,
        diagnoses,
        differentialQuestions,
        finalDiagnosis,
        explanation,
        treatmentOptions,
        detailedPlan,
        reportUrl,
        completenessScore,
        progressPercentage: calculateProgressPercentage(),
        startConsultation,
        submitChiefComplaint,
        answerQuestions,
        answerDifferentialQuestions,
        selectTreatment,
        generateReport,
        downloadReport,
        resetConsultation,
        setCurrentStep,
    };

    return (
        <ConsultationContext.Provider value={value}>
            {children}
        </ConsultationContext.Provider>
    );
};

export default ConsultationContext; 