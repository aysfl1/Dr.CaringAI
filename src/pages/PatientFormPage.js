import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const PatientFormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nickName: '',
    dateOfBirth: '',
    gender: '',
    medicalHistory: '',
    allergies: '',
    currentMedications: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prevState => ({
        ...prevState,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    if (!formData.nickName.trim()) newErrors.nickName = 'NickName is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setServerError('');
    
    try {
      // This is a client-side only implementation - no server API calls
      const patientId = 'temp-' + Date.now();
      localStorage.setItem('currentPatient', JSON.stringify({
        ...formData,
        _id: patientId
      }));
      
      // Navigate to consultation page
      navigate(`/consultation/${patientId}`);
    } catch (error) {
      console.error('Error creating patient:', error);
      setServerError('There was an error submitting your information. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div className="text-center mb-4">
            <FontAwesomeIcon 
              icon={faUser} 
              size="3x" 
              className="text-primary mb-3" 
            />
            <h2>Patient Information</h2>
            <p className="text-muted">Please fill out your information to start the consultation</p>
          </div>
          
          {serverError && (
            <Alert variant="danger" className="mb-4">
              {serverError}
            </Alert>
          )}
          
          <Card className="shadow">
            <Card.Body className="p-4">
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>NickName <span className="text-muted">(Please do not use your real name.)</span> *</Form.Label>
                  <Form.Control
                    type="text"
                    name="nickName"
                    value={formData.nickName}
                    onChange={handleChange}
                    isInvalid={!!errors.nickName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.nickName}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Date of Birth*</Form.Label>
                      <Form.Control
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        isInvalid={!!errors.dateOfBirth}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.dateOfBirth}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender*</Form.Label>
                      <Form.Select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        isInvalid={!!errors.gender}
                      >
                        <option value="">Select Gender</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="other">Other</option>
                        <option value="prefer-not-to-say">Prefer not to say</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.gender}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                {/* Removed Email, Phone, Address, City, State, Zip Code fields as requested */}
                
                <Form.Group className="mb-3">
                  <Form.Label>Medical History</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleChange}
                    placeholder="Please list any past medical conditions or surgeries"
                  />
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Allergies</Form.Label>
                  <Form.Control
                    type="text"
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleChange}
                    placeholder="List any known allergies (medications, food, etc.)"
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Current Medications</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="currentMedications"
                    value={formData.currentMedications}
                    onChange={handleChange}
                    placeholder="List any medications you are currently taking"
                  />
                </Form.Group>
                
                <div className="d-grid">
                  <Button 
                    variant="primary" 
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner 
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                        Begin Consultation
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientFormPage; 