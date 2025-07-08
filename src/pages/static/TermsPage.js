import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGavel, 
  faUserShield, 
  faFileContract, 
  faHandshake, 
  faExclamationTriangle 
} from '@fortawesome/free-solid-svg-icons';

const TermsPage = () => {
  // Last updated date
  const lastUpdated = "November 15, 2023";
  
  return (
    <div className="terms-page" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      <Container>
        {/* Hero Section */}
        <Row className="justify-content-center text-center mb-5">
          <Col md={10} lg={8}>
            <h1 className="display-4 fw-bold mb-4">Terms of Service</h1>
            <p className="lead mb-0">
              Please read these terms carefully before using our platform.
            </p>
            <p className="text-muted mt-3">
              <small>Last Updated: {lastUpdated}</small>
            </p>
          </Col>
        </Row>
        
        <Row className="justify-content-center mb-5">
          <Col md={10}>
            <Card className="border-0 shadow-sm mb-4">
              <Card.Body className="p-4 p-md-5">
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle bg-primary-light p-3 me-3">
                      <FontAwesomeIcon icon={faFileContract} className="text-primary" />
                    </div>
                    <h2 className="h4 fw-bold mb-0">1. Introduction</h2>
                  </div>
                  
                  <p>
                    Welcome to Dr. CaringAI ("we," "our," or "us"). By accessing or using our website, 
                    mobile application, or any of our services (collectively, the "Services"), you 
                    agree to be bound by these Terms of Service ("Terms"). These Terms constitute a 
                    legally binding agreement between you and Dr. CaringAI regarding your use of the Services.
                  </p>
                  
                  <p>
                    Please read these Terms carefully. If you do not agree with these Terms, you may not 
                    access or use our Services. By accessing or using our Services, you represent that 
                    you are at least 18 years old or the age of majority in your jurisdiction, whichever is greater.
                  </p>
                  
                  <p>
                    <strong>IMPORTANT NOTICE:</strong> Our Services are not intended to replace professional medical 
                    advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified 
                    health provider with any questions you may have regarding a medical condition.
                  </p>
                </div>
                
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle bg-primary-light p-3 me-3">
                      <FontAwesomeIcon icon={faHandshake} className="text-primary" />
                    </div>
                    <h2 className="h4 fw-bold mb-0">2. Services Description</h2>
                  </div>
                  
                  <p>
                    Dr. CaringAI provides an AI-powered medical consultation platform that uses 
                    artificial intelligence to provide preliminary medical assessments and personalized 
                    treatment recommendations. Our Services include, but are not limited to:
                  </p>
                  
                  <ul>
                    <li className="mb-2">
                      <strong>Patient Intake:</strong> Collection of your basic information, medical history,
                      current symptoms, and other relevant health data.
                    </li>
                    <li className="mb-2">
                      <strong>Symptom Analysis:</strong> AI-driven analysis of the information you provide to generate
                      possible diagnoses and treatment options.
                    </li>
                    <li className="mb-2">
                      <strong>Treatment Recommendations:</strong> Suggestions for potential treatment approaches based
                      on your symptoms and medical history.
                    </li>
                    <li className="mb-2">
                      <strong>Medical Reports:</strong> Generation and storage of consultation reports summarizing your
                      symptoms, potential diagnoses, and treatment recommendations.
                    </li>
                  </ul>
                  
                  <p>
                    <strong>IMPORTANT LIMITATIONS:</strong> Our Services are provided for informational purposes 
                    only and do not constitute medical advice, diagnosis, or treatment. Our AI system is designed 
                    to assist users in understanding potential causes of their symptoms and possible treatment 
                    options, but it is not a replacement for professional medical care.
                  </p>
                </div>
                
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle bg-primary-light p-3 me-3">
                      <FontAwesomeIcon icon={faUserShield} className="text-primary" />
                    </div>
                    <h2 className="h4 fw-bold mb-0">3. User Accounts</h2>
                  </div>
                  
                  <p>
                    To access certain features of our Services, you may be required to create an account. You agree to
                    provide accurate, current, and complete information during the registration process and to update
                    such information to keep it accurate, current, and complete.
                  </p>
                  
                  <p>
                    You are solely responsible for:
                  </p>
                  
                  <ol type="a" className="mb-3">
                    <li className="mb-2">
                      Maintaining the confidentiality of your account credentials;
                    </li>
                    <li className="mb-2">
                      All activities that occur under your account; and
                    </li>
                    <li className="mb-2">
                      Notifying us immediately of any unauthorized use of your account or any other breach of security.
                    </li>
                  </ol>
                  
                  <p>
                    We reserve the right to disable any user account at any time if, in our opinion, you have failed to
                    comply with these Terms or if we believe your account has been compromised.
                  </p>
                </div>
                
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle bg-primary-light p-3 me-3">
                      <FontAwesomeIcon icon={faExclamationTriangle} className="text-primary" />
                    </div>
                    <h2 className="h4 fw-bold mb-0">4. Medical Disclaimer</h2>
                  </div>
                  
                  <p>
                    <strong>THE SERVICES ARE NOT INTENDED FOR USE IN MEDICAL EMERGENCIES OR FOR THE DIAGNOSIS OR
                    TREATMENT OF MEDICAL CONDITIONS WITHOUT THE SUPERVISION OF A LICENSED MEDICAL PROFESSIONAL.</strong>
                  </p>
                  
                  <p>
                    Dr. CaringAI is not a healthcare provider, and our Services do not create a doctor-patient
                    relationship between you and Dr. CaringAI or any of its employees, contractors, or affiliated
                    entities. The information provided through our Services is not a substitute for professional
                    medical advice, diagnosis, or treatment.
                  </p>
                  
                  <p>
                    If you are experiencing a medical emergency, call your local emergency services immediately or
                    visit the nearest emergency room. Never disregard professional medical advice or delay seeking it
                    because of something you have read or received through our Services.
                  </p>
                  
                  <p>
                    Our AI system makes assessments based on the information you provide and current medical knowledge,
                    but it has limitations and may not account for all possible factors relevant to your specific
                    situation. Always consult with qualified healthcare providers for medical advice tailored to your
                    individual circumstances.
                  </p>
                </div>
                
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle bg-primary-light p-3 me-3">
                      <FontAwesomeIcon icon={faGavel} className="text-primary" />
                    </div>
                    <h2 className="h4 fw-bold mb-0">5. Intellectual Property Rights</h2>
                  </div>
                  
                  <p>
                    Dr. CaringAI and its licensors own all right, title, and interest in and to the Services,
                    including all intellectual property rights therein. The Services are protected by copyright,
                    trademark, patent, trade secret, and other laws of both the United States and foreign countries.
                  </p>
                  
                  <p>
                    These Terms do not grant you any right, title, or interest in the Services, others' content
                    in the Services, Dr. CaringAI trademarks, logos, or other brand features, or intellectual
                    property and other rights relating thereto.
                  </p>
                  
                  <p>
                    Subject to your compliance with these Terms, Dr. CaringAI grants you a limited, non-exclusive,
                    non-transferable, non-sublicensable license to access and use the Services for your personal,
                    non-commercial use.
                  </p>
                </div>
                
                <div className="mb-5">
                  <h2 className="h4 fw-bold mb-4">6. Privacy</h2>
                  
                  <p>
                    Our <a href="/privacy" className="text-decoration-none">Privacy Policy</a> describes how we handle the information you provide to us when you use
                    our Services. By using the Services, you agree to our collection, use, and sharing of
                    information as set forth in our Privacy Policy.
                  </p>
                  
                  <p>
                    We take the security and privacy of your health information seriously and implement
                    appropriate technical and organizational measures designed to protect your information.
                    However, no security system is impenetrable, and we cannot guarantee the security of
                    our systems with absolute certainty.
                  </p>
                </div>
                
                <div className="mb-5">
                  <h2 className="h4 fw-bold mb-4">7. Limitation of Liability</h2>
                  
                  <p>
                    <strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, DR. CARINGAI AND ITS DIRECTORS,
                    OFFICERS, EMPLOYEES, AGENTS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                    SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO DAMAGES FOR LOSS
                    OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:</strong>
                  </p>
                  
                  <ol type="a" className="mb-3">
                    <li className="mb-2">
                      Your access to or use of, or inability to access or use, the Services;
                    </li>
                    <li className="mb-2">
                      Any conduct or content of any third party on the Services;
                    </li>
                    <li className="mb-2">
                      Any content obtained from the Services; and
                    </li>
                    <li className="mb-2">
                      Unauthorized access, use, or alteration of your transmissions or content.
                    </li>
                  </ol>
                  
                  <p>
                    <strong>IN NO EVENT SHALL DR. CARINGAI'S TOTAL LIABILITY TO YOU FOR ALL CLAIMS RELATED TO
                    THE SERVICES EXCEED THE AMOUNT PAID BY YOU TO DR. CARINGAI (IF ANY) FOR THE SERVICES
                    DURING THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO SUCH LIABILITY.</strong>
                  </p>
                  
                  <p>
                    Some jurisdictions do not allow the exclusion or limitation of certain damages, so some or
                    all of the exclusions and limitations in this section may not apply to you.
                  </p>
                </div>
                
                <div className="mb-5">
                  <h2 className="h4 fw-bold mb-4">8. Indemnification</h2>
                  
                  <p>
                    You agree to defend, indemnify, and hold harmless Dr. CaringAI and its directors, officers,
                    employees, agents, and affiliates from and against any and all claims, damages, obligations,
                    losses, liabilities, costs, and expenses (including but not limited to attorney's fees)
                    arising from:
                  </p>
                  
                  <ol type="a" className="mb-3">
                    <li className="mb-2">
                      Your use of and access to the Services;
                    </li>
                    <li className="mb-2">
                      Your violation of these Terms;
                    </li>
                    <li className="mb-2">
                      Your violation of any third-party right, including without limitation any intellectual
                      property right, publicity, confidentiality, property, or privacy right; or
                    </li>
                    <li className="mb-2">
                      Any claim that content you provided caused damage to a third party.
                    </li>
                  </ol>
                  
                  <p>
                    This defense and indemnification obligation will survive these Terms and your use of the Services.
                  </p>
                </div>
                
                <div className="mb-5">
                  <h2 className="h4 fw-bold mb-4">9. Modifications to the Terms</h2>
                  
                  <p>
                    We may modify these Terms from time to time. When we make changes, we will update the "Last
                    Updated" date at the top of these Terms and notify you through the Services or by other means.
                    Your continued use of the Services after any such update constitutes your acceptance of the
                    modified Terms.
                  </p>
                  
                  <p>
                    If you do not agree to the modified Terms, you must stop using the Services.
                  </p>
                </div>
                
                <div className="mb-5">
                  <h2 className="h4 fw-bold mb-4">10. Termination</h2>
                  
                  <p>
                    You may terminate your use of the Services at any time by deactivating your account and
                    discontinuing your use of the Services.
                  </p>
                  
                  <p>
                    We may terminate or suspend your access to all or part of the Services, with or without notice,
                    for any reason, including, without limitation, if we believe that you have violated these Terms.
                    Upon termination, all licenses and other rights granted to you in these Terms will immediately
                    cease.
                  </p>
                </div>
                
                <div className="mb-5">
                  <h2 className="h4 fw-bold mb-4">11. Governing Law and Jurisdiction</h2>
                  
                  <p>
                    These Terms shall be governed by and construed in accordance with the laws of the State of
                    New Hampshire, without regard to its conflict of law provisions.
                  </p>
                  
                  <p>
                    Any legal action or proceeding arising out of or relating to these Terms or your use of the
                    Services shall be brought exclusively in the federal or state courts located in New Hampshire,
                    and you consent to the personal jurisdiction of such courts.
                  </p>
                </div>
                
                <div>
                  <h2 className="h4 fw-bold mb-4">12. Contact Information</h2>
                  
                  <p>
                    If you have any questions about these Terms, please contact us at:
                  </p>
                  
                  <address className="mb-0">
                    <strong>Dr. CaringAI, Inc.</strong><br />
                    43 Hanover Street<br />
                    Hanover, NH 03755<br />
                    <a href="mailto:legal@drcaringai.com" className="text-decoration-none">legal@drcaringai.com</a><br />
                    <a href="tel:+18005551234" className="text-decoration-none">+1 (800) 555-1234</a>
                  </address>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TermsPage; 