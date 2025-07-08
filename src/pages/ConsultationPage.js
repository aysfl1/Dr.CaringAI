import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faFilePdf, faArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useConsultation } from '../context/ConsultationContext';
import html2pdf from 'html2pdf.js';

const ConsultationPage = () => {
    const { patientId } = useParams();
    const navigate = useNavigate();
    const chatContainerRef = useRef(null);
    
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Chat state
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState('');
    const [step, setStep] = useState('greeting');
    const [sendingMessage, setSendingMessage] = useState(false);
    const [diagnoses, setDiagnoses] = useState([]);
    const [differentialStage, setDifferentialStage] = useState('initial');
    const [generatingPDF, setGeneratingPDF] = useState(false);
    
    // OpenAI API configuration
    const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
    const PERPLEXITY_API_KEY = process.env.REACT_APP_PERPLEXITY_API_KEY;
    
    // Check if using fallback keys (not recommended for production)
    useEffect(() => {
        if (!process.env.REACT_APP_OPENAI_API_KEY || !process.env.REACT_APP_PERPLEXITY_API_KEY) {
            console.warn('Warning: Using fallback API keys. For production, use environment variables.');
        }
    }, []);
    
    // Validate API keys
    const isValidOpenAIKey = (key) => key && key.startsWith('sk-');
    const isValidPerplexityKey = (key) => key && key.startsWith('pplx-');
    
    // Get consultation context
    const { 
        currentStep, 
        progressPercentage,
        setCurrentStep,
        // ... keep other context values
    } = useConsultation();
    
    // Scroll to bottom of chat when new messages are added
    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [messages]);
    
    // Load patient data from localStorage
    useEffect(() => {
        const loadPatient = () => {
            try {
                setLoading(true);
                const storedPatient = localStorage.getItem('currentPatient');
                
                if (!storedPatient) {
                    setError('Patient information not found. Please start a new consultation.');
                    return;
                }
                
                const patientData = JSON.parse(storedPatient);
                if (patientData._id !== patientId) {
                    setError('Patient ID mismatch. Please start a new consultation.');
                    return;
                }
                
                setPatient(patientData);
                
                // Add welcome message
                setMessages([{
                    sender: 'system',
                    content: `Welcome ${patientData.firstName}! I'm Dr. CaringAI, your AI Doctor. What brings you in today and how may I help?`,
                    timestamp: new Date().toISOString()
                }]);
                
                // Ensure step is set to 'greeting' to match our logic
                setStep('greeting');
                setCurrentStep('initial');
                
            } catch (error) {
                console.error('Error loading patient data:', error);
                setError('There was an error loading your information. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        
        loadPatient();
    }, [patientId, setCurrentStep]);
    
    // Helper function to generate system message for OpenAI
    const generateSystemMessage = () => {
        if (step === 'greeting') {
            return `You are Dr. CaringAI, an AI-powered doctor. You are interviewing a patient named ${patient?.firstName} who is ${patient?.gender} and was born on ${patient?.dateOfBirth}. Today's date is ${new Date().toLocaleDateString()} , find approximate age of patient, and use it in your risk assessment. Patient's medical history: ${patient?.medicalHistory} - Patient's allergies: ${patient?.allergies} - Patient's current medications: ${patient?.currentMedications}  
            Your job is to interview them and gather further information in a compassionate and professional manner. 
            Ask relevant follow-up questions focused on understanding their symptoms.`;
        } else if (step === 'symptoms') {
            return `You are Dr. CaringAI, an AI-powered doctor interviewing ${patient?.firstName} ${patient?.lastName}. 
            You have already asked initial questions about their chief complaint. Now you need to ask more specific questions to build a complete clinical picture.
            You should ask 2-3 targeted questions at a time based on their previous responses. 
            Be medically accurate and focused. Ask about duration, severity, and any factors that make symptoms better or worse.`;
        } else if (step === 'differential') {
            return `You are Dr. CaringAI, a diagnostic AI doctor. You need to analyze the conversation so far and identify the three most likely diagnoses based on ${patient?.firstName}'s reported symptoms.
            Present these diagnoses with confidence percentages and brief explanations. 
            Then ask specific questions that would help differentiate between these possible diagnoses.
            Be medically accurate and comprehensive.`;
        } else if (step === 'treatment') {
            return `You are Dr. CaringAI, an AI-powered doctor. Based on the conversation so far, you've determined a final diagnosis for ${patient?.firstName}.
            Explain the diagnosis in patient-friendly language, avoiding medical jargon.
            Then suggest 3 appropriate treatment options based on best practices and evidence-based approaches. Then ask the patient to pick one option or a hybrid approach.`;
        } else if (step === 'report') {
            return `You are Dr. CaringAI, an AI-powered doctor. You are finalizing the consultation with ${patient?.firstName}.
            Based on treatment option selected by patient, create a detailed treatment plan for their condition, including medication recommendations (if appropriate), lifestyle changes, 
            follow-up recommendations, and when they should seek in-person medical care.
            Ask if they would like a comprehensive report of the consultation in PDF format.`;
        }
        
        return `You are Dr. CaringAI, an AI-powered doctor helping ${patient?.firstName} ${patient?.lastName}.`;
    };
    
    // Make an API call to OpenAI
    // Use Vercel serverless function to call OpenAI securely
    const callOpenAI = async (systemMessage, messageHistory) => {
        try {
            const model = step === 'questions' ? 'gpt-4o-mini' : 'gpt-4o';
            const messages = [
                { role: 'system', content: systemMessage },
                ...messageHistory.map(msg => ({
                    role: msg.sender === 'user' ? 'user' : 'assistant',
                    content: msg.content
                }))
            ];
            const response = await axios.post(
                '/api/openai',
                {
                    model: model,
                    messages: messages,
                    temperature: 0.2,
                    max_tokens: 1000
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                }
            );
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('Error calling OpenAI:', error);
            throw new Error('Failed to generate response from AI. Please try again.');
        }
    };
    
    // Generate differentials with Perplexity API
    const generateDifferentialWithPerplexity = async (symptoms, diagnoses) => {
        try {
            const apiKey = PERPLEXITY_API_KEY;
            
            // Check if API key is valid
            if (!isValidPerplexityKey(apiKey)) {
                throw new Error('Invalid Perplexity API key. Please check your environment variables.');
            }
            
            const endpoint = 'https://api.perplexity.ai/chat/completions';
            
            // Format diagnoses correctly for the prompt
            let diagnosisText = "";
            if (diagnoses && diagnoses.length > 0) {
                diagnosisText = diagnoses.map(d => `${d.name} (${d.confidence}% confidence)`).join(', ');
            } else {
                diagnosisText = "Unknown conditions based on the reported symptoms";
            }
            
            const systemMessage = `You are a medical research expert specializing in differential diagnosis. 
            The patient has reported the following symptoms: "${symptoms}". 
            Based on these symptoms, the AI has identified potential diagnoses: ${diagnosisText}.
            
            Your task is to:
            1. Generate 3-5 specific questions that would help differentiate between these conditions.
            2. Focus on questions that would have different answers depending on the specific diagnosis.
            3. Format your response professionally for a medical consultation.
            4. Begin your response with: "To help me determine which diagnosis is most accurate, I need to ask you a few more specific questions:"
            5. Do NOT include any explanations or commentary - ONLY provide the numbered questions.`;
            
            console.log("Calling Perplexity API for differential questions...");
            
            const response = await axios.post(
                endpoint,
                {
                    model: 'sonar',
                    messages: [
                        { role: 'system', content: systemMessage },
                        { role: 'user', content: `Generate specific differential diagnosis questions for a patient reporting: "${symptoms}"` }
                    ],
                    temperature: 0.2,
                    top_p: 0.9,
                    stream: false
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${apiKey}`
                    },
                    timeout: 30000
                }
            );
            
            if (response.data && response.data.choices && response.data.choices.length > 0) {
                const perplexityQuestions = response.data.choices[0].message.content;
                console.log("Successfully received differential questions from Perplexity API");
                return perplexityQuestions;
            } else {
                console.error("Unexpected Perplexity API response format:", response.data);
                throw new Error("Invalid response from Perplexity API");
            }
        } catch (error) {
            console.error('Error calling Perplexity API:', error);
            // Fallback to OpenAI if Perplexity fails
            console.log("Falling back to OpenAI for differential questions...");
            const fallbackSystemMessage = `You are a medical expert providing differential diagnosis questions. 
            Based on the symptoms: "${symptoms}", create 3-5 specific questions that would help distinguish between possible diagnoses. 
            Format as a numbered list. Start with: "To help me determine which diagnosis is most accurate, I need to ask you a few more specific questions:"`;
            
            return callOpenAI(fallbackSystemMessage, []);
        }
    };
    
    // Extract diagnoses from AI response
    const extractDiagnoses = (aiResponse) => {
        try {
            console.log("Attempting to extract diagnoses from:", aiResponse);
            
            // Look for JSON in triple backticks
            const jsonMatch = aiResponse.match(/```(?:json)?(.*?)```/s);
            
            if (jsonMatch && jsonMatch[1]) {
                // Clean and parse the extracted JSON
                const jsonString = jsonMatch[1].trim();
                console.log("Extracted JSON string:", jsonString);
                
                const parsedData = JSON.parse(jsonString);
                
                if (parsedData && parsedData.diagnoses && Array.isArray(parsedData.diagnoses)) {
                    console.log("Successfully parsed diagnoses:", parsedData.diagnoses);
                    return parsedData.diagnoses;
                }
            }
            
            // Fallback: Try to extract diagnoses using regex pattern matching if JSON parsing fails
            console.log("JSON extraction failed, trying regex pattern matching");
            
            const diagnosisPattern = /(\d+\.\s*|-)?\s*([A-Za-z\s\-']+)\s*(?:\(|:)?\s*(\d+)%?\s*(?:confidence|probability|likelihood)?/g;
            const matches = [...aiResponse.matchAll(diagnosisPattern)];
            
            if (matches && matches.length > 0) {
                const extractedDiagnoses = matches.map(match => ({
                    name: match[2].trim(),
                    confidence: parseInt(match[3], 10)
                }));
                
                console.log("Extracted diagnoses via regex:", extractedDiagnoses);
                return extractedDiagnoses;
            }
            
            // If all else fails, return an empty array
            console.log("Failed to extract diagnoses using both methods");
            return [];
        } catch (error) {
            console.error("Error extracting diagnoses:", error);
            return [];
        }
    };
    
    // Format diagnoses for display to remove JSON
    const formatDiagnosesForDisplay = (aiResponse, diagnoses) => {
        // If no diagnoses were extracted, return the original response
        if (!diagnoses || diagnoses.length === 0) {
            return aiResponse;
        }
        
        // Remove the JSON block from the response
        let formattedResponse = aiResponse.replace(/```(?:json)?(.*?)```/s, '');
        
        // If the formatted response still has the JSON block, try a different pattern
        if (formattedResponse.includes('```')) {
            formattedResponse = aiResponse.replace(/```.*?```/s, '');
        }
        
        // Clean up any extra newlines that might have been created
        formattedResponse = formattedResponse.replace(/\n{3,}/g, '\n\n');
        
        // If we lost all content, create a formatted diagnostic message
        if (formattedResponse.trim().length === 0) {
            formattedResponse = "Based on your symptoms, I've identified the following potential diagnoses:\n\n";
            diagnoses.forEach((diagnosis, index) => {
                formattedResponse += `${index + 1}. **${diagnosis.name}** (${diagnosis.confidence}% confidence)\n`;
            });
            formattedResponse += "\nLet me ask you some additional questions to narrow down the diagnosis.";
        }
        
        return formattedResponse.trim();
    };
    
    // Extract key medical information from the consultation
    const extractKeyMedicalInfo = () => {
        try {
            // Get all system (doctor) messages
            const doctorMessages = messages.filter(msg => msg.sender === 'system');
            const patientMessages = messages.filter(msg => msg.sender === 'user');
            
            // Try to identify chief complaint from early patient messages
            const chiefComplaint = patientMessages.length > 0 ? patientMessages[0].content : 'Not specified';
            
            // Look for diagnosis messages (typically in differential stage)
            const diagnosisMessages = doctorMessages.filter(msg => 
                msg.content.includes('diagnosis') || 
                msg.content.includes('diagnoses') || 
                msg.content.toLowerCase().includes('condition')
            );
            
            // Look for treatment messages
            const treatmentMessages = doctorMessages.filter(msg => 
                msg.content.includes('treatment plan') || 
                msg.content.includes('recommend') || 
                msg.content.includes('medication') ||
                msg.content.toLowerCase().includes('follow-up')
            );
            
            // Get final messages that might contain follow-up recommendations
            const followUpMessages = doctorMessages.slice(-2);
            
            return {
                chiefComplaint,
                diagnosisMessages: diagnosisMessages.map(msg => msg.content),
                treatmentMessages: treatmentMessages.map(msg => msg.content),
                followUpMessages: followUpMessages.map(msg => msg.content)
            };
        } catch (error) {
            console.error('Error extracting key medical info:', error);
            return {
                chiefComplaint: 'Not specified',
                diagnosisMessages: [],
                treatmentMessages: [],
                followUpMessages: []
            };
        }
    };
    
    // Send a message
    const sendMessage = async (event) => {
        event.preventDefault();
        if (!userInput.trim()) return;

        // Add user message
        const userMessage = {
            sender: 'user',
            content: userInput,
            timestamp: new Date().toISOString()
        };

        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setUserInput('');

        try {
            setSendingMessage(true);

            // For initial greeting or general responses
            if (step === 'greeting') {
                const systemMessage = generateSystemMessage();
                const aiResponse = await callOpenAI(systemMessage, updatedMessages);
                
                // Add AI response
                const systemResponse = {
                    sender: 'system',
                    content: aiResponse,
                    timestamp: new Date().toISOString()
                };
                
                setMessages(prevMessages => [...prevMessages, systemResponse]);
                setStep('symptoms');
                setCurrentStep('questions');
            } 
            // For symptom collection
            else if (step === 'symptoms') {
                // After patient describes symptoms, proceed to diagnosis
                const systemMessage = generateSystemMessage();
                const aiResponse = await callOpenAI(systemMessage, updatedMessages);
                
                // Add AI response
                const systemResponse = {
                    sender: 'system',
                    content: aiResponse,
                    timestamp: new Date().toISOString()
                };
                
                setMessages(prevMessages => [...prevMessages, systemResponse]);
                setStep('differential');
                setCurrentStep('diagnosis');
            }
            // For differential diagnosis
            else if (step === 'differential') {
                // Track where we are in the differential diagnosis flow
                console.log("Current differential stage:", differentialStage);
                console.log("Current diagnoses:", diagnoses);

                // First message in differential phase - generate diagnoses
                if (!diagnoses || diagnoses.length === 0) {
                    console.log("Generating initial diagnoses...");
                    // Extract symptoms from conversation
                    const symptoms = updatedMessages
                        .filter(msg => msg.sender === 'user')
                        .map(msg => msg.content)
                        .join(' ');
                    
                    // Generate diagnoses with GPT-4o
                    const systemMessage = `You are Dr. CaringAI, a diagnostic AI doctor. Based on the patient's reported symptoms,
                    generate a list of 3 possible diagnoses with confidence levels and provide a brief explanation of each diagnosis.`;
                    
                    const aiResponse = await callOpenAI(systemMessage, updatedMessages);
                    
                    // Extract diagnoses from response
                    const extractedDiagnoses = extractDiagnoses(aiResponse);
                    console.log("Extracted diagnoses:", extractedDiagnoses);
                    
                    // If diagnoses were successfully extracted
                    if (extractedDiagnoses && extractedDiagnoses.length > 0) {
                        setDiagnoses(extractedDiagnoses);
                        setDifferentialStage('questions');
                        
                        try {
                            // Generate differential questions with Perplexity API
                            console.log("Getting differential questions from Perplexity API...");
                            const differentialQuestions = await generateDifferentialWithPerplexity(symptoms, extractedDiagnoses);
                            
                            // Format the AI response to remove raw JSON
                            const formattedDiagnosisResponse = formatDiagnosesForDisplay(aiResponse, extractedDiagnoses);
                            
                            // Add AI response with diagnoses and questions
                            const formattedResponse = `${formattedDiagnosisResponse}\n\n${differentialQuestions}`;
                            const systemResponse = {
                                sender: 'system',
                                content: formattedResponse,
                                timestamp: new Date().toISOString()
                            };
                            
                            setMessages(prevMessages => [...prevMessages, systemResponse]);
                        } catch (error) {
                            // Handle the error directly here instead of letting it bubble up
                            console.error("Error generating differential questions:", error);
                            
                            // Still continue with just the diagnoses if there's an error with the differential questions
                            // Format the AI response to remove raw JSON
                            const formattedDiagnosisResponse = formatDiagnosesForDisplay(aiResponse, extractedDiagnoses);
                            
                            const systemResponse = {
                                sender: 'system',
                                content: formattedDiagnosisResponse,
                                timestamp: new Date().toISOString()
                            };
                            
                            setMessages(prevMessages => [...prevMessages, systemResponse]);
                        }
                    } else {
                        // Fallback if diagnoses extraction failed
                        console.error("Failed to extract diagnoses from AI response");
                        const systemMessage = `You are Dr. CaringAI. Please analyze the patient's symptoms again and provide 
                        three potential diagnoses with confidence levels. Be sure to format as a clear list.`;
                        
                        const retryResponse = await callOpenAI(systemMessage, updatedMessages);
                        
                        const systemResponse = {
                            sender: 'system',
                            content: retryResponse,
                            timestamp: new Date().toISOString()
                        };
                        
                        setMessages(prevMessages => [...prevMessages, systemResponse]);
                    }
                } 
                // Patient has answered differential questions, proceed to final diagnosis
                else if (differentialStage === 'questions') {
                    console.log("Processing patient answers to differential questions...");
                    
                    const systemMessage = `You are Dr. CaringAI, a diagnostic AI doctor. Based on the entire conversation history, 
                    including the patient's responses to differential questions, determine the final diagnosis for ${patient?.firstName}.
                    The patient initially reported symptoms, and we've been discussing potential diagnoses including: 
                    ${diagnoses.map(d => `${d.name} (${d.confidence}% confidence)`).join(', ')}.
                    
                    After asking differential questions, the patient's latest response was: "${userMessage.content}"
                    
                    Provide a final diagnosis with confidence and explain your reasoning. Be medically accurate and thorough.
                    First, state the final diagnosis clearly. Then explain why this is the most likely diagnosis based on all information.
                    Include a brief mention of what diagnoses have been ruled out and why.`;
                    
                    const aiResponse = await callOpenAI(systemMessage, updatedMessages);
                    
                    // Add AI response with final diagnosis
                    const systemResponse = {
                        sender: 'system',
                        content: aiResponse,
                        timestamp: new Date().toISOString()
                    };
                    
                    setMessages(prevMessages => [...prevMessages, systemResponse]);
                    setDifferentialStage('complete');
                    setStep('treatment');
                    setCurrentStep('treatment');
                    
                    // After a brief delay, automatically send treatment message
                    setTimeout(async () => {
                        // Generate treatment plan
                        const treatmentSystemMessage = `You are Dr. CaringAI, an AI doctor. The patient has been diagnosed with 
                        a condition. Based on this diagnosis and the entire conversation history, provide a treatment plan (based on patient's preference), and explainnext steps.
                        Include medications if appropriate, lifestyle recommendations, and when to seek follow-up care.
                        Be medically accurate, thorough, and compassionate. Format your response clearly with sections for:
                        1. Treatment Plan
                        2. Lifestyle Recommendations
                        3. Follow-up Care
                        4. When to Seek Immediate Medical Attention`;
                        
                        const treatmentResponse = await callOpenAI(treatmentSystemMessage, [...updatedMessages, systemResponse]);
                        
                        // Add treatment message
                        const treatmentMessage = {
                            sender: 'system',
                            content: treatmentResponse,
                            timestamp: new Date().toISOString()
                        };
                        
                        setMessages(prevMessages => [...prevMessages, treatmentMessage]);
                        // Move to report step after treatment is complete
                        setStep('report');
                        setCurrentStep('report');
                    }, 2000);
                }
            }
            // For treatment plan
            else if (step === 'treatment') {
                // Handle any follow-up questions in the treatment phase
                const systemMessage = `You are Dr. CaringAI, an AI doctor. The patient has already been diagnosed and 
                received a treatment plan. This is a follow-up question from the patient: "${userInput}"
                
                Provide a helpful, medically accurate response. Be compassionate but professional.`;
                
                const aiResponse = await callOpenAI(systemMessage, updatedMessages);
                
                // Add AI response
                const systemResponse = {
                    sender: 'system',
                    content: aiResponse,
                    timestamp: new Date().toISOString()
                };
                
                setMessages(prevMessages => [...prevMessages, systemResponse]);
            }
        } catch (error) {
            console.error('Error in chat flow:', error);
            
            // Add error message
            const errorMessage = {
                sender: 'system',
                content: "I'm sorry, I encountered an error processing your request. Please try again or reload the page.",
                timestamp: new Date().toISOString()
            };
            
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        } finally {
            setSendingMessage(false);
        }
    };
    
    // Convert simple markdown to HTML
    const markdownToHTML = (text) => {
        if (!text) return '';
        
        // Replace markdown headings
        text = text.replace(/^# (.+)$/gm, '<h1>$1</h1>');
        text = text.replace(/^## (.+)$/gm, '<h2>$1</h2>');
        text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        
        // Replace markdown bold
        text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        
        // Replace markdown italic
        text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');
        
        // Replace markdown lists
        text = text.replace(/^- (.+)$/gm, '<li>$1</li>');
        text = text.replace(/^(\d+)\. (.+)$/gm, '<li>$2</li>');
        
        // Wrap adjacent list items in ul/ol tags
        let lines = text.split('\n');
        let inList = false;
        
        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith('<li>') && !inList) {
                lines[i] = '<ul>' + lines[i];
                inList = true;
            } else if (!lines[i].startsWith('<li>') && inList) {
                lines[i-1] = lines[i-1] + '</ul>';
                inList = false;
            }
        }
        
        if (inList) {
            lines[lines.length-1] = lines[lines.length-1] + '</ul>';
        }
        
        // Replace newlines with <br> tags
        text = lines.join('<br>');
        
        // Remove redundant <br> tags within HTML elements
        text = text.replace(/(<\/h[1-3]>)<br>/g, '$1');
        text = text.replace(/(<\/p>)<br>/g, '$1');
        text = text.replace(/(<\/li>)<br>/g, '$1');
        text = text.replace(/(<\/ul>)<br>/g, '$1');
        
        return text;
    };
    
    // Handle generating a PDF report
    const handleGenerateReport = async () => {
        try {
            setSendingMessage(true);
            setGeneratingPDF(true);
            
            // Add a message to indicate PDF generation is in progress
            const processingMessage = {
                sender: 'system',
                content: "I'm generating your medical report PDF. This may take a moment...",
                timestamp: new Date().toISOString()
            };
            
            setMessages(prevMessages => [...prevMessages, processingMessage]);
            
            // Extract key medical information from the consultation
            const keyMedicalInfo = extractKeyMedicalInfo();
            
            // Generate PDF content with GPT-4o
            const systemMessage = `You are Dr. CaringAI, an AI doctor. Write a report for ${patient?.firstName} ${patient?.lastName}.
            Create a comprehensive medical report with all key details needed for a human doctor to understand the patient's condition and our analysis. 
            
            The patient's chief complaint is: "${keyMedicalInfo.chiefComplaint}"
            
            The diagnostic process found: 
            ${keyMedicalInfo.diagnosisMessages.join('\n\n')}
            
            The treatment recommendations were: 
            ${keyMedicalInfo.treatmentMessages.join('\n\n')}
            
            Additional follow-up information:
            ${keyMedicalInfo.followUpMessages.join('\n\n')}
            
            Format this as a professional medical document with clear sections for:
            1. Patient information 
            2. Chief complaint
            3. Diagnosis
            4. Treatment Plan
            5. Follow-up Recommendations`;
            
            const reportContent = await callOpenAI(systemMessage, messages);
            
            // Format the report content with markdown conversion
            const formattedReportContent = markdownToHTML(reportContent);
            
            // Create a simple HTML structure for the PDF
            const htmlContent = `
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Medical Consultation Report - ${patient?.firstName} ${patient?.lastName}</title>
                    <style>
                        body { 
                            font-family: 'Helvetica', 'Arial', sans-serif; 
                            margin: 0; 
                            padding: 0;
                            color: #333; 
                            line-height: 1.6; 
                        }
                        .container {
                            max-width: 800px;
                            margin: 0 auto;
                            padding: 20px;
                        }
                        h1 { 
                            color: #2c3e50; 
                            text-align: center;
                            font-size: 24px;
                            margin-bottom: 5px;
                        }
                        h2 { 
                            color: #3498db; 
                            margin-top: 20px;
                            font-size: 18px;
                            border-bottom: 1px solid #eee;
                            padding-bottom: 5px;
                        }
                        h3 {
                            color: #2c3e50;
                            font-size: 16px;
                            margin-top: 15px;
                        }
                        .header { 
                            text-align: center; 
                            margin-bottom: 20px;
                            padding-bottom: 15px;
                            border-bottom: 2px solid #3498db;
                        }
                        .header p {
                            margin: 5px 0;
                            color: #7f8c8d;
                        }
                        .patient-info { 
                            background-color: #f8f9fa; 
                            padding: 15px; 
                            border-radius: 5px; 
                            margin-bottom: 20px; 
                            border-left: 4px solid #3498db;
                        }
                        .patient-info p {
                            margin: 8px 0;
                        }
                        .report-content {
                            margin-bottom: 30px;
                        }
                        .report-section {
                            margin-bottom: 20px;
                        }
                        .footer { 
                            text-align: center; 
                            margin-top: 30px; 
                            font-size: 0.8em; 
                            color: #7f8c8d;
                            padding-top: 10px;
                            border-top: 1px solid #eee;
                        }
                        p { margin: 10px 0; }
                        strong { color: #2c3e50; }
                        pre { 
                            white-space: pre-wrap; 
                            font-family: 'Helvetica', 'Arial', sans-serif;
                            margin: 0;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>Medical Consultation Report</h1>
                            <p>Dr. CaringAI Virtual Healthcare Assistant</p>
                            <p>Date: ${new Date().toLocaleDateString()}</p>
                        </div>
                        
                        <div class="patient-info">
                            <h2>Patient Information</h2>
                            <p><strong>Name:</strong> ${patient?.firstName} ${patient?.lastName}</p>
                            <p><strong>Date of Birth:</strong> ${patient?.dateOfBirth}</p>
                            <p><strong>Gender:</strong> ${patient?.gender}</p>
                        </div>
                        
                        <div class="report-content">
                            ${formattedReportContent}
                        </div>
                        
                        <div class="footer">
                            <p>This report was generated by Dr. CaringAI, an AI virtual healthcare assistant on ${new Date().toLocaleString()}.</p>
                            <p><strong>Disclaimer:</strong> This is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
                        </div>
                    </div>
                </body>
                </html>
            `;
            
            // Create a temporary container for the HTML content
            const element = document.createElement('div');
            element.innerHTML = htmlContent;
            document.body.appendChild(element);
            
            // Configure html2pdf options
            const options = {
                margin: 10,
                filename: `${patient?.firstName}_${patient?.lastName}_Medical_Report.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
            };
            
            // Generate PDF with html2pdf
            html2pdf().from(element).set(options).save().then(() => {
                // Clean up the temporary element
                document.body.removeChild(element);
                
                // Add a success message to the chat
                const successMessage = {
                    sender: 'system',
                    content: "I've generated a medical report PDF based on our consultation. You can save this as a reference for your healthcare provider.",
                    timestamp: new Date().toISOString()
                };
                
                setMessages(prevMessages => [...prevMessages, successMessage]);
                setSendingMessage(false);
                setGeneratingPDF(false);
            });
            
        } catch (error) {
            console.error('Error generating report:', error);
            alert('There was an error generating the report. Please try again.');
            setSendingMessage(false);
            setGeneratingPDF(false);
        }
    };
    
    // Handle back to home
    const handleBackToHome = () => {
        navigate('/');
    };
    
    // Show loading state
    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" role="status" />
                <p className="mt-3">Loading consultation...</p>
            </Container>
        );
    }
    
    // Show error state
    if (error) {
        return (
            <Container className="py-5">
                <Card className="shadow">
                    <Card.Body className="text-center">
                        <h4 className="text-danger mb-3">Error</h4>
                        <p>{error}</p>
                        <Button variant="primary" onClick={handleBackToHome}>
                            Back to Home
                        </Button>
                    </Card.Body>
                </Card>
            </Container>
        );
    }
    
    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>
                            <Button 
                                variant="link" 
                                className="p-0 me-2 text-muted" 
                                onClick={handleBackToHome}
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </Button>
                            Consultation for {patient.firstName} {patient.lastName}
                        </h2>
                        
                        {step === 'report' && (
                            <Button 
                                variant="success" 
                                onClick={handleGenerateReport}
                                disabled={sendingMessage || generatingPDF}
                            >
                                {generatingPDF ? (
                                    <>
                                        <FontAwesomeIcon icon={faSpinner} spin className="me-2" />
                                        Generating PDF...
                                    </>
                                ) : (
                                    <>
                                        <FontAwesomeIcon icon={faFilePdf} className="me-2" />
                                        Download Report
                                    </>
                                )}
                            </Button>
                        )}
                    </div>
                </Col>
            </Row>
            
            <Row>
                <Col lg={4} className="mb-4">
                    {/* Patient Information Card */}
                    <Card className="shadow mb-4">
                        <Card.Header className="bg-primary text-white">
                            <h5 className="mb-0">Patient Information</h5>
                        </Card.Header>
                        <Card.Body>
                            <Row className="mb-2">
                                <Col xs={4} className="text-muted">Name:</Col>
                                <Col xs={8}>{patient.firstName} {patient.lastName}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={4} className="text-muted">Date of Birth:</Col>
                                <Col xs={8}>{patient.dateOfBirth}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={4} className="text-muted">Gender:</Col>
                                <Col xs={8}>{patient.gender}</Col>
                            </Row>
                            <Row className="mb-2">
                                <Col xs={4} className="text-muted">Email:</Col>
                                <Col xs={8}>{patient.email}</Col>
                            </Row>
                            {patient.phone && (
                                <Row className="mb-2">
                                    <Col xs={4} className="text-muted">Phone:</Col>
                                    <Col xs={8}>{patient.phone}</Col>
                                </Row>
                            )}
                        </Card.Body>
                    </Card>
                    
                    {/* Consultation Progress */}
                    <Card className="shadow">
                        <Card.Header className="bg-secondary text-white">
                            <h5 className="mb-0">Consultation Progress</h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="mb-3">
                                <div className="d-flex justify-content-between align-items-center mb-1">
                                    <span>Overall Progress</span>
                                    <span>{progressPercentage}%</span>
                                </div>
                                <div className="progress">
                                    <div 
                                        className="progress-bar bg-success" 
                                        role="progressbar" 
                                        style={{ width: `${progressPercentage}%` }} 
                                        aria-valuenow={progressPercentage} 
                                        aria-valuemin="0" 
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                            </div>
                            
                            <h6 className="mb-2">Current Stage:</h6>
                            <ul className="list-unstyled">
                                <li className={`mb-2 ${currentStep === 'initial' ? 'fw-bold text-primary' : (currentStep !== 'initial' ? 'text-muted' : '')}`}>
                                    1. Initial Assessment
                                </li>
                                <li className={`mb-2 ${currentStep === 'questions' ? 'fw-bold text-primary' : (currentStep === 'initial' ? '' : 'text-muted')}`}>
                                    2. Information Gathering
                                </li>
                                <li className={`mb-2 ${currentStep === 'diagnosis' ? 'fw-bold text-primary' : (currentStep === 'initial' || currentStep === 'questions' ? '' : 'text-muted')}`}>
                                    3. Differential Diagnosis
                                </li>
                                <li className={`mb-2 ${currentStep === 'treatment' ? 'fw-bold text-primary' : (currentStep === 'report' ? 'text-muted' : '')}`}>
                                    4. Treatment Planning
                                </li>
                                <li className={`mb-2 ${currentStep === 'report' ? 'fw-bold text-primary' : ''}`}>
                                    5. Final Report
                                </li>
                            </ul>
                        </Card.Body>
                    </Card>
                </Col>
                
                <Col lg={8}>
                    {/* Chat Interface */}
                    <Card className="shadow">
                        <Card.Header className="bg-primary text-white">
                            <h5 className="mb-0">Medical Consultation</h5>
                        </Card.Header>
                        
                        <div 
                            ref={chatContainerRef}
                            className="chat-container bg-light p-3" 
                            style={{ height: '500px', overflowY: 'auto' }}
                        >
                            {messages.map((message, index) => (
                                <div 
                                    key={index} 
                                    className={`chat-message mb-3 ${message.sender === 'user' ? 'text-end' : ''}`}
                                >
                                    <div 
                                        className={`d-inline-block p-3 rounded-3 shadow-sm ${
                                            message.sender === 'user' 
                                                ? 'bg-primary text-white' 
                                                : 'bg-white border'
                                        }`}
                                        style={{ maxWidth: '80%', textAlign: 'left' }}
                                    >
                                        {message.content.split('\n').map((line, i) => (
                                            <React.Fragment key={i}>
                                                {line}
                                                {i < message.content.split('\n').length - 1 && <br />}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            ))}
                            
                            {sendingMessage && (
                                <div className="chat-message mb-3">
                                    <div className="d-inline-block p-3 rounded-3 shadow-sm bg-white border">
                                        <Spinner animation="border" size="sm" /> Thinking...
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <Card.Footer className="bg-white">
                            <Form onSubmit={sendMessage}>
                                <div className="d-flex">
                                    <Form.Control
                                        type="text"
                                        placeholder="Type your message here..."
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        disabled={sendingMessage || step === 'complete'}
                                    />
                                    <Button 
                                        type="submit" 
                                        variant="primary" 
                                        className="ms-2"
                                        disabled={sendingMessage || step === 'complete'}
                                    >
                                        <FontAwesomeIcon icon={faPaperPlane} />
                                    </Button>
                                </div>
                            </Form>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default ConsultationPage; 