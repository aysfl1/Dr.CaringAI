import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeartbeat, 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt
} from '@fortawesome/free-solid-svg-icons';
import {
  faTwitter,
  faFacebookF,
  faLinkedinIn,
  faInstagram
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-light py-5 mt-auto">
      <Container>
        <Row className="mb-4">
          <Col lg={4} md={6} className="mb-4 mb-md-0">
            <div className="mb-3 d-flex align-items-center">
              <div className="logo-icon me-2 d-flex align-items-center justify-content-center" 
                style={{ 
                  width: '32px', 
                  height: '32px', 
                  borderRadius: '50%', 
                  backgroundColor: 'var(--primary-light)',
                  color: 'var(--primary)'
                }}>
                <FontAwesomeIcon icon={faHeartbeat} />
              </div>
              <div>
                <span className="fw-bold" style={{ color: 'var(--primary)' }}>Dr.</span>
                <span className="fw-bold" style={{ color: 'var(--dark)' }}>CaringAI</span>
              </div>
            </div>
            <p className="text-muted mb-3">
              Revolutionizing healthcare through AI-powered medical consultations, making quality healthcare guidance accessible to everyone.
            </p>
            <div className="d-flex mb-3">
              <a href="https://twitter.com" className="me-3 text-muted" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
              <a href="https://facebook.com" className="me-3 text-muted" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faFacebookF} />
              </a>
              <a href="https://linkedin.com" className="me-3 text-muted" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="https://instagram.com" className="text-muted" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </div>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3 text-dark">Company</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/about" className="text-decoration-none text-muted">About Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/how-it-works" className="text-decoration-none text-muted">How It Works</Link>
              </li>
              <li className="mb-2">
                <Link to="/contact" className="text-decoration-none text-muted">Contact Us</Link>
              </li>
              <li className="mb-2">
                <Link to="/faq" className="text-decoration-none text-muted">FAQ</Link>
              </li>
            </ul>
          </Col>
          
          <Col lg={2} md={6} className="mb-4 mb-md-0">
            <h5 className="fw-bold mb-3 text-dark">Legal</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/terms" className="text-decoration-none text-muted">Terms of Service</Link>
              </li>
              <li className="mb-2">
                <Link to="/privacy" className="text-decoration-none text-muted">Privacy Policy</Link>
              </li>
              <li className="mb-2">
                <Link to="/cookie-policy" className="text-decoration-none text-muted">Cookie Policy</Link>
              </li>
              <li className="mb-2">
                {/* <Link to="/hipaa" className="text-decoration-none text-muted">HIPAA Compliance</Link> */}
              </li>
            </ul>
          </Col>
          
          <Col lg={4} md={6}>
            <h5 className="fw-bold mb-3 text-dark">Contact Us</h5>
            <ul className="list-unstyled">
              <li className="mb-2 d-flex align-items-center">
                <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-primary" />
                <span className="text-muted">43 Hanover Street, Hanover, NH 03755</span>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <FontAwesomeIcon icon={faPhone} className="me-2 text-primary" />
                <a href="tel:+18005551234" className="text-decoration-none text-muted">+1 (800) 555-1234</a>
              </li>
              <li className="mb-2 d-flex align-items-center">
                <FontAwesomeIcon icon={faEnvelope} className="me-2 text-primary" />
                <a href="mailto:info@drcaringai.com" className="text-decoration-none text-muted">info@drcaringai.com</a>
              </li>
            </ul>
          </Col>
        </Row>
        
        <hr className="my-4" />
        
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <p className="text-muted mb-0 small">
              &copy; {currentYear} Dr. CaringAI. All rights reserved.
            </p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="text-muted mb-0 small">
              <span className="me-2">Made with ❤️ for better healthcare</span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 