import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faPaperPlane, 
    faUser, 
    faStethoscope, 
    faClipboardCheck, 
    faMedkit, 
    faHeartbeat,
    faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import { useConsultation } from '../context/ConsultationContext';

const ConsultationChat = ({ patientName }) => {
    const [message, setMessage] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const [currentQuestions, setCurrentQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [submittingAnswers, setSubmittingAnswers] = useState(false);
    const chatEndRef = useRef(null);
    
    const { 
        loading, 
        currentStep, 
        questions, 
        completenessScore,
        differentialQuestions,
        submitChiefComplaint,
        answerQuestions,
        answerDifferentialQuestions
    } = useConsultation();

    // Scroll to bottom of chat when messages change
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [chatMessages]);

    // Update chat messages when questions change
    useEffect(() => {
        if (questions && questions.length > 0) {
            const newMessages = questions.map(question => ({
                sender: 'ai',
                content: question,
                timestamp: new Date().toISOString()
            }));
            
            setChatMessages(prev => [...prev, ...newMessages]);
            setCurrentQuestions(questions);
            
            // Initialize answers object
            const initialAnswers = {};
            questions.forEach(question => {
                initialAnswers[question] = '';
            });
            setAnswers(initialAnswers);
        }
    }, [questions]);

    // Update chat messages when differential questions change
    useEffect(() => {
        if (differentialQuestions && differentialQuestions.length > 0) {
            const newMessages = differentialQuestions.map(question => ({
                sender: 'ai',
                content: question,
                timestamp: new Date().toISOString()
            }));
            
            setChatMessages(prev => [...prev, ...newMessages]);
            setCurrentQuestions(differentialQuestions);
            
            // Initialize answers object
            const initialAnswers = {};
            differentialQuestions.forEach(question => {
                initialAnswers[question] = '';
            });
            setAnswers(initialAnswers);
        }
    }, [differentialQuestions]);

    // Add welcome message on initial render
    useEffect(() => {
        if (patientName && chatMessages.length === 0) {
            setChatMessages([
                {
                    sender: 'ai',
                    content: `Hello ${patientName}! I'm Dr. AI. I'll be helping you today. Please describe your chief complaint or the main reason for your consultation.`,
                    timestamp: new Date().toISOString()
                }
            ]);
        }
    }, [patientName, chatMessages.length]);

    // Handle sending a message
    const handleSendMessage = async (e) => {
        e.preventDefault();
        
        if (!message.trim()) return;
        
        // Add user message to chat
        const userMessage = {
            sender: 'user',
            content: message,
            timestamp: new Date().toISOString()
        };
        
        setChatMessages(prev => [...prev, userMessage]);
        
        // Clear input field
        setMessage('');
        
        try {
            // Add thinking message
            const thinkingMessage = {
                sender: 'ai',
                content: 'Analyzing your input...',
                timestamp: new Date().toISOString(),
                isThinking: true
            };
            
            setChatMessages(prev => [...prev, thinkingMessage]);
            
            // Submit chief complaint to API
            await submitChiefComplaint(message);
            
            // Remove thinking message
            setChatMessages(prev => prev.filter(msg => !msg.isThinking));
            
        } catch (error) {
            console.error('Error submitting chief complaint:', error);
            
            // Remove thinking message
            setChatMessages(prev => prev.filter(msg => !msg.isThinking));
            
            // Add error message
            setChatMessages(prev => [...prev, {
                sender: 'ai',
                content: 'I apologize, but I encountered an error processing your request. Please try again.',
                timestamp: new Date().toISOString(),
                isError: true
            }]);
        }
    };
    
    // Handle submitting answers to questions
    const handleSubmitAnswers = async () => {
        // Check if all questions have been answered
        const unansweredQuestions = Object.keys(answers).filter(q => !answers[q].trim());
        
        if (unansweredQuestions.length > 0) {
            // Show warning for unanswered questions
            alert('Please answer all questions before proceeding.');
            return;
        }
        
        setSubmittingAnswers(true);
        
        // Add user answers to chat
        const userAnswerMessages = Object.entries(answers).map(([question, answer]) => ({
            sender: 'user',
            content: answer,
            timestamp: new Date().toISOString(),
            question
        }));
        
        setChatMessages(prev => [...prev, ...userAnswerMessages]);
        
        try {
            // Add thinking message
            const thinkingMessage = {
                sender: 'ai',
                content: 'Processing your answers...',
                timestamp: new Date().toISOString(),
                isThinking: true
            };
            
            setChatMessages(prev => [...prev, thinkingMessage]);
            
            // Submit answers to API based on the current step
            if (currentStep === 'interview') {
                await answerQuestions(answers);
            } else if (currentStep === 'differential') {
                await answerDifferentialQuestions(answers);
            }
            
            // Remove thinking message
            setChatMessages(prev => prev.filter(msg => !msg.isThinking));
            
            // Reset answers
            setAnswers({});
            setCurrentQuestions([]);
            
        } catch (error) {
            console.error('Error submitting answers:', error);
            
            // Remove thinking message
            setChatMessages(prev => prev.filter(msg => !msg.isThinking));
            
            // Add error message
            setChatMessages(prev => [...prev, {
                sender: 'ai',
                content: 'I apologize, but I encountered an error processing your answers. Please try again.',
                timestamp: new Date().toISOString(),
                isError: true
            }]);
        } finally {
            setSubmittingAnswers(false);
        }
    };
    
    // Handle answer change
    const handleAnswerChange = (question, value) => {
        setAnswers(prev => ({
            ...prev,
            [question]: value
        }));
    };
    
    // Render a chat message
    const renderChatMessage = (message, index) => {
        const isAI = message.sender === 'ai';
        const isThinking = message.isThinking;
        const isError = message.isError;
        
        return (
            <div 
                key={index} 
                className={`d-flex ${isAI ? 'justify-content-start' : 'justify-content-end'} mb-3 fade-in`}
            >
                {isAI && (
                    <div className="me-2">
                        <div className="ai-avatar d-flex align-items-center justify-content-center rounded-circle shadow-sm" 
                            style={{ 
                                width: '40px', 
                                height: '40px', 
                                backgroundColor: 'var(--primary-light)', 
                                color: 'var(--primary)',
                                border: '1px solid var(--primary)'
                            }}>
                            <FontAwesomeIcon icon={faStethoscope} />
                        </div>
                    </div>
                )}
                
                <div 
                    className={`chat-bubble ${isAI ? 'ai-bubble' : 'user-bubble'} ${isThinking ? 'thinking-bubble' : ''} ${isError ? 'error-bubble' : ''}`}
                    style={{
                        opacity: isThinking ? 0.7 : 1,
                        position: 'relative',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }}
                >
                    {isThinking ? (
                        <div className="d-flex align-items-center">
                            <span className="me-2">{message.content}</span>
                            <Spinner animation="border" size="sm" />
                        </div>
                    ) : isError ? (
                        <div className="d-flex align-items-start">
                            <FontAwesomeIcon icon={faExclamationCircle} className="me-2 text-danger mt-1" />
                            <div>{message.content}</div>
                        </div>
                    ) : (
                        <div>
                            {message.content}
                            {message.question && (
                                <div className="text-muted small mt-1">
                                    <i>In response to: {message.question}</i>
                                </div>
                            )}
                        </div>
                    )}
                    
                    <div 
                        className="small text-muted mt-1" 
                        style={{ 
                            fontSize: '0.7rem',
                            position: 'absolute',
                            bottom: '5px',
                            right: isAI ? 'auto' : '10px',
                            left: isAI ? '10px' : 'auto'
                        }}
                    >
                        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                </div>
                
                {!isAI && (
                    <div className="ms-2">
                        <div className="user-avatar d-flex align-items-center justify-content-center rounded-circle shadow-sm"
                            style={{ 
                                width: '40px', 
                                height: '40px', 
                                backgroundColor: 'var(--secondary-light)', 
                                color: 'var(--secondary)',
                                border: '1px solid var(--secondary)'
                            }}>
                            <FontAwesomeIcon icon={faUser} />
                        </div>
                    </div>
                )}
            </div>
        );
    };
    
    // Render questions form
    const renderQuestionsForm = () => {
        if (currentQuestions.length === 0) return null;
        
        return (
            <div className="questions-form p-4 bg-white rounded-lg shadow-sm mb-4 border border-light">
                <h5 className="mb-3 d-flex align-items-center">
                    <FontAwesomeIcon icon={faClipboardCheck} className="me-2 text-primary" />
                    Please answer the following questions:
                </h5>
                
                <Form>
                    {currentQuestions.map((question, index) => (
                        <Form.Group key={index} className="mb-4">
                            <Form.Label className="fw-medium d-flex align-items-center">
                                <span className="question-number d-flex align-items-center justify-content-center me-2 rounded-circle bg-primary-light text-primary fw-bold"
                                    style={{ 
                                        width: '26px', 
                                        height: '26px', 
                                        fontSize: '0.8rem',
                                        border: '1px solid var(--primary)'
                                    }}>
                                    {index + 1}
                                </span>
                                {question}
                            </Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={answers[question] || ''}
                                onChange={(e) => handleAnswerChange(question, e.target.value)}
                                placeholder="Your answer..."
                                className="bg-light"
                            />
                        </Form.Group>
                    ))}
                    
                    <div className="d-flex justify-content-between align-items-center">
                        {completenessScore !== undefined && (
                            <div className="completeness-score d-flex align-items-center">
                                <span className="me-2 fw-medium">Consultation Progress:</span>
                                <div className="progress" style={{ width: '150px', height: '10px' }}>
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{ width: `${completenessScore}%` }}
                                        aria-valuenow={completenessScore}
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    ></div>
                                </div>
                                <span className="ms-2">{Math.round(completenessScore)}%</span>
                            </div>
                        )}
                        
                        <Button
                            variant="primary"
                            onClick={handleSubmitAnswers}
                            disabled={submittingAnswers}
                            className="px-4 d-flex align-items-center"
                        >
                            {submittingAnswers ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    Submit Answers
                                    <FontAwesomeIcon icon={faPaperPlane} className="ms-2" />
                                </>
                            )}
                        </Button>
                    </div>
                </Form>
            </div>
        );
    };
    
    return (
        <div className="consultation-chat-container" style={{ paddingTop: '80px' }}> {/* Added padding to account for fixed navbar */}
            <Container>
                <Row className="justify-content-center">
                    <Col lg={10}>
                        {/* Consultation Progress Indicator */}
                        <div className="consultation-progress">
                            <div className={`consultation-step ${currentStep === 'interview' ? 'active' : ''} ${currentStep !== 'interview' ? 'completed' : ''}`}>
                                <div className="consultation-step-number">1</div>
                                <div className="consultation-step-text">Information Gathering</div>
                            </div>
                            <div className={`consultation-step ${currentStep === 'differential' ? 'active' : ''} ${['diagnosis', 'treatment', 'report'].includes(currentStep) ? 'completed' : ''}`}>
                                <div className="consultation-step-number">2</div>
                                <div className="consultation-step-text">Differential Diagnosis</div>
                            </div>
                            <div className={`consultation-step ${currentStep === 'diagnosis' ? 'active' : ''} ${['treatment', 'report'].includes(currentStep) ? 'completed' : ''}`}>
                                <div className="consultation-step-number">3</div>
                                <div className="consultation-step-text">Diagnosis</div>
                            </div>
                            <div className={`consultation-step ${currentStep === 'treatment' ? 'active' : ''} ${currentStep === 'report' ? 'completed' : ''}`}>
                                <div className="consultation-step-number">4</div>
                                <div className="consultation-step-text">Treatment</div>
                            </div>
                            <div className={`consultation-step ${currentStep === 'report' ? 'active' : ''}`}>
                                <div className="consultation-step-number">5</div>
                                <div className="consultation-step-text">Report</div>
                            </div>
                        </div>
                        
                        <Card className="shadow-sm border-0 mb-4 overflow-hidden">
                            <Card.Header className="bg-white py-3 d-flex align-items-center">
                                <div className="health-icon-container me-3" style={{ width: '48px', height: '48px' }}>
                                    <FontAwesomeIcon icon={faMedkit} size="lg" />
                                </div>
                                <div>
                                    <h5 className="mb-0 fw-bold">Medical Consultation</h5>
                                    <p className="mb-0 text-muted small">
                                        {currentStep === 'interview' && 'Information Gathering Phase'}
                                        {currentStep === 'differential' && 'Differential Diagnosis Phase'}
                                        {currentStep === 'diagnosis' && 'Final Diagnosis Phase'}
                                        {currentStep === 'treatment' && 'Treatment Plan Phase'}
                                        {currentStep === 'report' && 'Consultation Report Phase'}
                                    </p>
                                </div>
                            </Card.Header>
                            
                            <Card.Body className="p-4">
                                <div className="chat-container p-3" style={{ minHeight: '400px', maxHeight: '500px', overflowY: 'auto' }}>
                                    {chatMessages.map(renderChatMessage)}
                                    <div ref={chatEndRef} />
                                </div>
                            </Card.Body>
                            
                            <Card.Footer className="bg-white p-3">
                                {currentQuestions.length > 0 ? (
                                    renderQuestionsForm()
                                ) : (
                                    <Form onSubmit={handleSendMessage}>
                                        <div className="d-flex">
                                            <Form.Control
                                                type="text"
                                                placeholder="Describe your symptoms or concerns..."
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                disabled={loading || currentStep !== 'interview'}
                                                className="me-2 shadow-sm border"
                                            />
                                            <Button
                                                variant="primary"
                                                type="submit"
                                                disabled={loading || !message.trim() || currentStep !== 'interview'}
                                                className="d-flex align-items-center justify-content-center" 
                                                style={{ width: '50px', height: '50px', borderRadius: '50%' }}
                                            >
                                                {loading ? (
                                                    <Spinner animation="border" size="sm" />
                                                ) : (
                                                    <FontAwesomeIcon icon={faPaperPlane} />
                                                )}
                                            </Button>
                                        </div>
                                    </Form>
                                )}
                            </Card.Footer>
                        </Card>
                        
                        {/* Health Tips */}
                        <div className="health-tips bg-primary-light p-3 rounded-lg shadow-sm d-flex align-items-center">
                            <div className="me-3 bg-white rounded-circle p-2 shadow-sm text-primary">
                                <FontAwesomeIcon icon={faHeartbeat} />
                            </div>
                            <p className="mb-0 small">
                                <strong>Health Tip:</strong> Remember to provide as much detail as possible about your symptoms, including when they started, severity, and any factors that make them better or worse.
                            </p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ConsultationChat; 