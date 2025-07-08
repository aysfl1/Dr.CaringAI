import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserMd } from '@fortawesome/free-solid-svg-icons';

const LoginPage = () => {
    const navigate = useNavigate();
    const { login, user, loading, error } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validationError, setValidationError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // If user is already logged in, redirect to admin dashboard
    if (user) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate form - only email is required
        if (!email.trim()) {
            setValidationError('Please enter your email.');
            return;
        }
        
        // Clear validation error
        setValidationError('');
        
        // Set submitting state
        setIsSubmitting(true);
        
        try {
            // Attempt login with entered email and either the entered password or a default one
            const passwordToUse = password.trim() || 'defaultpassword';
            await login(email, passwordToUse);
            
            // Navigate to admin dashboard on success
            navigate('/admin/dashboard');
        } catch (error) {
            console.error('Login error:', error);
            // Error is handled by the auth context
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={8} lg={6} xl={5}>
                    <div className="text-center mb-4">
                        <FontAwesomeIcon 
                            icon={faUserMd} 
                            size="4x" 
                            className="text-primary mb-3" 
                        />
                        <h2 className="mb-1">Medical Consultation</h2>
                        <p className="text-muted">AI-Powered Healthcare Assistant</p>
                    </div>
                    
                    <Card className="shadow">
                        <Card.Body className="p-4">
                            <h4 className="mb-4 text-center">Admin Sign In</h4>
                            
                            {/* Show error messages */}
                            {(error || validationError) && (
                                <Alert variant="danger">
                                    {validationError || error}
                                </Alert>
                            )}
                            
                            <Alert variant="info">
                                <strong>Note:</strong> Password verification is temporarily disabled. Enter any valid admin/doctor email to access the system.
                            </Alert>
                            
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled={isSubmitting}
                                        required
                                    />
                                </Form.Group>
                                
                                <Form.Group className="mb-4">
                                    <Form.Label>Password (optional)</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter your password (optional)"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isSubmitting}
                                    />
                                </Form.Group>
                                
                                <div className="d-grid">
                                    <Button 
                                        variant="primary" 
                                        type="submit"
                                        disabled={isSubmitting || loading}
                                    >
                                        {isSubmitting || loading ? (
                                            <>
                                                <Spinner 
                                                    as="span" 
                                                    animation="border" 
                                                    size="sm" 
                                                    role="status" 
                                                    aria-hidden="true" 
                                                    className="me-2"
                                                />
                                                Signing in...
                                            </>
                                        ) : (
                                            <>
                                                <FontAwesomeIcon icon={faSignInAlt} className="me-2" />
                                                Sign In
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                    
                    <div className="text-center mt-4">
                        <p className="text-muted">
                            Valid admin emails: <br />
                            Email: doctor@example.com <br />
                            Email: admin@example.com
                        </p>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginPage; 