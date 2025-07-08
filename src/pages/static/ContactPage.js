import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faClock, 
  faPaperPlane,
  faCheck,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

const ContactPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError] = useState(false);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1500);
  };
  
  return (
    <div className="contact-page" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      <Container>
        {/* Hero Section */}
        <Row className="justify-content-center text-center mb-5">
          <Col md={10} lg={8}>
            <h1 className="display-4 fw-bold mb-4">Contact Us</h1>
            <p className="lead mb-0">
              Have questions about our AI-powered medical platform? Our team is here to help.
            </p>
          </Col>
        </Row>
        
        <Row className="justify-content-center">
          {/* Contact Information */}
          <Col lg={4} md={5} className="mb-4 mb-md-0">
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <h2 className="h4 fw-bold mb-4">Get in Touch</h2>
                
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <div className="rounded-circle bg-primary-light p-3">
                      <FontAwesomeIcon icon={faEnvelope} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="h6 fw-bold">Email Us</h3>
                    <p className="mb-0">
                      <a href="mailto:support@drcaringai.com" className="text-decoration-none text-body">
                        support@drcaringai.com
                      </a>
                    </p>
                    <p className="mb-0">
                      <a href="mailto:info@drcaringai.com" className="text-decoration-none text-body">
                        info@drcaringai.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <div className="rounded-circle bg-primary-light p-3">
                      <FontAwesomeIcon icon={faPhone} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="h6 fw-bold">Call Us</h3>
                    <p className="mb-0">
                      <a href="tel:+18005551234" className="text-decoration-none text-body">
                        +1 (800) 555-1234
                      </a>
                    </p>
                    <p className="small text-muted mb-0">Monday to Friday, 9am - 6pm EST</p>
                  </div>
                </div>
                
                <div className="d-flex mb-4">
                  <div className="me-3">
                    <div className="rounded-circle bg-primary-light p-3">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="h6 fw-bold">Location</h3>
                    <p className="mb-0">
                      Dr. CaringAI, Inc.<br />
                      43 Hanover Street<br />
                      Hanover, NH 03755
                    </p>
                  </div>
                </div>
                
                <div className="d-flex">
                  <div className="me-3">
                    <div className="rounded-circle bg-primary-light p-3">
                      <FontAwesomeIcon icon={faClock} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="h6 fw-bold">Support Hours</h3>
                    <p className="mb-0">
                      <strong>Monday to Friday:</strong> 9:00 AM - 6:00 PM EST<br />
                      <strong>Saturday:</strong> 10:00 AM - 2:00 PM EST<br />
                      <strong>Sunday:</strong> Closed
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          {/* Contact Form */}
          <Col lg={6} md={7}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-4">
                <h2 className="h4 fw-bold mb-4">Send us a Message</h2>
                
                {showSuccess && (
                  <Alert variant="success" className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faCheck} className="me-2" />
                    <div>
                      Thank you for contacting us! We'll get back to you as soon as possible.
                    </div>
                  </Alert>
                )}
                
                {showError && (
                  <Alert variant="danger">
                    Sorry, there was an error submitting your message. Please try again.
                  </Alert>
                )}
                
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="contactName">
                        <Form.Label className="fw-semibold">Your Name</Form.Label>
                        <Form.Control 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          required
                          className="shadow-sm"
                        />
                      </Form.Group>
                    </Col>
                    
                    <Col md={6} className="mb-3">
                      <Form.Group controlId="contactEmail">
                        <Form.Label className="fw-semibold">Email Address</Form.Label>
                        <Form.Control 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email"
                          required
                          className="shadow-sm"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Form.Group className="mb-3" controlId="contactSubject">
                    <Form.Label className="fw-semibold">Subject</Form.Label>
                    <Form.Control 
                      type="text" 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                      required
                      className="shadow-sm"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-4" controlId="contactMessage">
                    <Form.Label className="fw-semibold">Message</Form.Label>
                    <Form.Control 
                      as="textarea" 
                      rows={5} 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="How can we help you?"
                      required
                      className="shadow-sm"
                    />
                  </Form.Group>
                  
                  <div className="d-grid">
                    <Button 
                      variant="primary" 
                      size="lg" 
                      type="submit"
                      disabled={isSubmitting}
                      className="py-3"
                    >
                      {isSubmitting ? (
                        <>Sending Message...</>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faPaperPlane} className="me-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <div className="text-center mt-3">
                    <small className="text-muted d-flex align-items-center justify-content-center">
                      <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                      Your information is secure and will never be shared with third parties.
                    </small>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* Map Section */}
        <Row className="justify-content-center mt-5">
          <Col md={10}>
            <Card className="border-0 shadow-sm">
              <Card.Body className="p-0">
                <div className="ratio ratio-21x9">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2866.2967968804554!2d-72.29236188867596!3d43.70343325350724!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cb4c9ced6a8a337%3A0x38e79aae5c9aaa89!2s43%20S%20Main%20St%2C%20Hanover%2C%20NH%2003755%2C%20USA!5e0!3m2!1sen!2sca!4v1656000000000!5m2!1sen!2sca" 
                    width="600" 
                    height="450" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Dr. CaringAI Location Map"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        
        {/* FAQ Teaser */}
        <Row className="justify-content-center mt-5">
          <Col md={10} lg={8} className="text-center">
            <div className="bg-light p-4 p-md-5 rounded-3 shadow-sm">
              <h3 className="h4 fw-bold mb-3">Frequently Asked Questions</h3>
              <p className="mb-4">
                Looking for quick answers? Check our comprehensive FAQ section for information 
                about our platform, privacy policies, and medical consultation process.
              </p>
              <Button 
                variant="outline-primary" 
                size="lg" 
                className="rounded-pill"
                href="/faq"
              >
                View FAQ
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage; 