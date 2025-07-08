import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserMd, 
  faArrowRight, 
  faHeartbeat, 
  faStethoscope, 
  faShieldAlt, 
  faCertificate, 
  faClock, 
  faComments 
} from '@fortawesome/free-solid-svg-icons';

const HomePage = () => {
  const navigate = useNavigate();

  const startConsultation = () => {
    navigate('/start-consultation');
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-section py-5" style={{ backgroundColor: 'var(--primary-light)' }}>
        <Container>
          <Row className="align-items-center py-4">
            <Col lg={6} className="mb-5 mb-lg-0">
              <div className="mb-4 fade-in">
                <span className="badge bg-white text-primary px-3 py-2 mb-3 shadow-sm">
                  Trusted Medical Consultation
                </span>
                <h1 className="fw-bold display-4 mb-3">
                  Professional Healthcare <span className="text-primary">At Your Fingertips</span>
                </h1>
                <p className="lead text-muted mb-4">
                  Experience personalized medical consultations powered by advanced AI in a secure, confidential environment. Get reliable diagnoses and treatment plans from the comfort of your home.
                </p>
                
                <div className="d-flex flex-wrap align-items-center mb-4">
                  <div className="d-flex align-items-center me-4 mb-2 mb-md-0">
                    <div className="rounded-circle bg-white p-2 shadow-sm me-2">
                      <FontAwesomeIcon icon={faShieldAlt} className="text-success" />
                    </div>
                    {/* <span className="small fw-medium">HIPAA Compliant</span> */}
                  </div>
                  <div className="d-flex align-items-center me-4 mb-2 mb-md-0">
                    <div className="rounded-circle bg-white p-2 shadow-sm me-2">
                      <FontAwesomeIcon icon={faCertificate} className="text-primary" />
                    </div>
                    <span className="small fw-medium">AI Enabled</span>
                  </div>
                  <div className="d-flex align-items-center mb-2 mb-md-0">
                    <div className="rounded-circle bg-white p-2 shadow-sm me-2">
                      <FontAwesomeIcon icon={faClock} className="text-secondary" />
                    </div>
                    <span className="small fw-medium">24/7 Availability</span>
                  </div>
                </div>
                
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={startConsultation}
                  className="px-4 py-3 shadow-sm"
                >
                  Start a Consultation <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center fade-in">
              <img 
                src="https://img.freepik.com/free-vector/online-doctor-consultation-illustration_88138-414.jpg" 
                alt="Doctor consulting with patient" 
                className="img-fluid rounded-lg shadow-lg" 
                style={{ maxHeight: '400px' }}
              />
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* How It Works Section */}
      <Container className="py-5">
        <Row className="justify-content-center text-center mb-5">
          <Col md={8}>
            <h2 className="fw-bold mb-4">How Our Consultation Works</h2>
            <p className="text-muted">Our AI-powered platform guides you through a step-by-step medical consultation process designed by healthcare professionals.</p>
          </Col>
        </Row>
        
        <Row>
          <Col md={4} className="mb-4">
            <div className="health-feature-card h-100">
              <div className="health-feature-icon bg-primary-light text-primary mx-auto">
                <FontAwesomeIcon icon={faComments} />
              </div>
              <h3 className="h5 fw-bold mb-3">Share Your Symptoms</h3>
              <p className="text-muted mb-0">
                Describe your symptoms and medical concerns in a conversational interface that adapts to your responses.
              </p>
            </div>
          </Col>
          
          <Col md={4} className="mb-4">
            <div className="health-feature-card h-100">
              <div className="health-feature-icon bg-secondary-light text-secondary mx-auto">
                <FontAwesomeIcon icon={faStethoscope} />
              </div>
              <h3 className="h5 fw-bold mb-3">Receive Analysis</h3>
              <p className="text-muted mb-0">
                Our advanced AI analyzes your inputs and medical history to generate potential diagnoses with confidence scores.
              </p>
            </div>
          </Col>
          
          <Col md={4} className="mb-4">
            <div className="health-feature-card h-100">
              <div className="health-feature-icon bg-success-light text-success mx-auto">
                <FontAwesomeIcon icon={faHeartbeat} />
              </div>
              <h3 className="h5 fw-bold mb-3">Get Treatment Plan</h3>
              <p className="text-muted mb-0">
                Receive personalized treatment options and a detailed implementation plan to address your health concerns.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
      
      {/* Testimonials/Benefits Section */}
      <div className="py-5" style={{ backgroundColor: 'var(--light)' }}>
        <Container>
          <Row className="justify-content-center text-center mb-5">
            <Col md={8}>
              <h2 className="fw-bold mb-4">Why Choose Dr. CaringAI</h2>
              <p className="text-muted">Our AI-powered consultation platform offers numerous advantages over traditional healthcare experiences.</p>
            </Col>
          </Row>
          
          <Row className="justify-content-center">
            <Col md={6} lg={4} className="mb-4">
              <Card className="health-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-primary-light p-3 me-3">
                      <FontAwesomeIcon icon={faClock} className="text-primary" />
                    </div>
                    <h3 className="h5 mb-0 fw-bold">Immediate Access</h3>
                  </div>
                  <p className="text-muted mb-0">
                    No appointment needed. Get medical consultations anytime, anywhere without waiting rooms or scheduling delays.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={4} className="mb-4">
              <Card className="health-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-primary-light p-3 me-3">
                      <FontAwesomeIcon icon={faShieldAlt} className="text-primary" />
                    </div>
                    <h3 className="h5 mb-0 fw-bold">Private & Secure</h3>
                  </div>
                  <p className="text-muted mb-0">
                    Your medical information is encrypted and protected with the highest security standards for complete confidentiality.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            
            <Col md={6} lg={4} className="mb-4">
              <Card className="health-card h-100 border-0 shadow-sm">
                <Card.Body className="p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="rounded-circle bg-primary-light p-3 me-3">
                      <FontAwesomeIcon icon={faUserMd} className="text-primary" />
                    </div>
                    <h3 className="h5 mb-0 fw-bold">Medical Expertise</h3>
                  </div>
                  <p className="text-muted mb-0">
                    Our AI system is trained on the latest medical research and clinical guidelines for accurate, up-to-date consultations.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      
      {/* CTA Section */}
      <div 
        className="py-5 text-center text-white" 
        style={{ 
          backgroundColor: 'var(--primary)', 
          backgroundImage: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)' 
        }}
      >
        <Container className="py-3">
          <h2 className="fw-bold mb-4">Ready to Get Started?</h2>
          <p className="lead mb-4">
            Begin your medical consultation now and take the first step toward better health.
          </p>
          <Button 
            variant="light" 
            size="lg" 
            onClick={startConsultation}
            className="px-4 py-3 fw-medium text-primary shadow"
          >
            Start My Consultation <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
          </Button>
        </Container>
      </div>
    </div>
  );
};

export default HomePage; 