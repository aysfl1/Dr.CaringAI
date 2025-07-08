import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faComments, 
  faClipboardList, 
  faMicroscope, 
  faStethoscope, 
  faNotesMedical, 
  faFileMedical,
  faShieldAlt,
  faRobot,
  faBrain,
  faDatabase
} from '@fortawesome/free-solid-svg-icons';

const HowItWorksPage = () => {
  return (
    <div className="how-it-works-page" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      <Container>
        {/* Hero Section */}
        <Row className="justify-content-center text-center mb-5">
          <Col md={10} lg={8}>
            <h1 className="display-4 fw-bold mb-4">How <span className="text-primary">Dr. CaringAI</span> Works</h1>
            <p className="lead mb-5">
              Our AI-powered medical consultation platform combines advanced technology with medical expertise to deliver personalized care through a simple, secure process.
            </p>
          </Col>
        </Row>

        {/* Process Overview */}
        <Row className="mb-5">
          <Col lg={12}>
            <div className="consultation-progress mb-5">
              <div className="consultation-step completed">
                <div className="consultation-step-number">1</div>
                <div className="consultation-step-text">Patient Intake</div>
              </div>
              <div className="consultation-step completed">
                <div className="consultation-step-number">2</div>
                <div className="consultation-step-text">Information Gathering</div>
              </div>
              <div className="consultation-step completed">
                <div className="consultation-step-number">3</div>
                <div className="consultation-step-text">Differential Diagnosis</div>
              </div>
              <div className="consultation-step completed">
                <div className="consultation-step-number">4</div>
                <div className="consultation-step-text">Final Diagnosis</div>
              </div>
              <div className="consultation-step completed">
                <div className="consultation-step-number">5</div>
                <div className="consultation-step-text">Treatment Plan</div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Detailed Steps */}
        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <Card className="border-0 h-100 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="rounded-circle bg-primary-light p-3 me-3">
                    <FontAwesomeIcon icon={faClipboardList} className="text-primary" />
                  </div>
                  <h3 className="h5 mb-0 fw-bold">1. Patient Intake</h3>
                </div>
                <p>
                  Your consultation begins with a secure patient intake form where you'll provide basic biographical information, 
                  medical history, allergies, and current medications. This information helps our AI system understand your 
                  background and tailor the consultation to your specific needs.
                </p>
                <p className="mb-0 small fst-italic text-muted">
                  <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                  All your information is encrypted and protected under strict privacy standards.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} className="mb-4">
            <Card className="border-0 h-100 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="rounded-circle bg-primary-light p-3 me-3">
                    <FontAwesomeIcon icon={faComments} className="text-primary" />
                  </div>
                  <h3 className="h5 mb-0 fw-bold">2. Information Gathering</h3>
                </div>
                <p>
                  Our Interview Agent engages you in a conversational interface where you can describe your chief complaint 
                  and symptoms. The system asks targeted follow-up questions to gather comprehensive information about your 
                  condition, adapting its inquiries based on your responses.
                </p>
                <p className="mb-0 small fst-italic text-muted">
                  <FontAwesomeIcon icon={faRobot} className="me-2" />
                  Powered by GPT-4o mini, our system calculates an interview completeness score to ensure thorough information gathering.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} className="mb-4">
            <Card className="border-0 h-100 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="rounded-circle bg-primary-light p-3 me-3">
                    <FontAwesomeIcon icon={faMicroscope} className="text-primary" />
                  </div>
                  <h3 className="h5 mb-0 fw-bold">3. Differential Diagnosis</h3>
                </div>
                <p>
                  Using the gathered information, our Initial Diagnosis Agent identifies the three most probable diagnoses, 
                  with confidence scores and reasoning. To refine these diagnoses, our Medical Research Agent performs 
                  deep research and generates additional targeted questions to distinguish between potential conditions.
                </p>
                <p className="mb-0 small fst-italic text-muted">
                  <FontAwesomeIcon icon={faBrain} className="me-2" />
                  Our diagnosis system combines GPT-4o with Perplexity API for accurate, evidence-based analysis.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} className="mb-4">
            <Card className="border-0 h-100 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="rounded-circle bg-primary-light p-3 me-3">
                    <FontAwesomeIcon icon={faStethoscope} className="text-primary" />
                  </div>
                  <h3 className="h5 mb-0 fw-bold">4. Final Diagnosis</h3>
                </div>
                <p>
                  After analyzing all the information, including your responses to differential diagnosis questions, our 
                  Final Diagnosis Agent synthesizes a comprehensive assessment of your condition. This diagnosis is presented 
                  in both technical medical terminology and patient-friendly language to ensure complete understanding.
                </p>
                <p className="mb-0 small fst-italic text-muted">
                  <FontAwesomeIcon icon={faDatabase} className="me-2" />
                  Each diagnosis is backed by medical evidence and reasoning to ensure transparency.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} className="mb-4">
            <Card className="border-0 h-100 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="rounded-circle bg-primary-light p-3 me-3">
                    <FontAwesomeIcon icon={faNotesMedical} className="text-primary" />
                  </div>
                  <h3 className="h5 mb-0 fw-bold">5. Treatment Plan</h3>
                </div>
                <p>
                  Based on the final diagnosis, our Treatment Plan Agent develops multiple personalized treatment options.
                  You can select the approach that best fits your preferences and lifestyle. The system then creates a 
                  detailed step-by-step implementation guide for your chosen treatment plan.
                </p>
                <p className="mb-0 small fst-italic text-muted">
                  <FontAwesomeIcon icon={faRobot} className="me-2" />
                  Treatment plans are tailored to your specific circumstances, medical history, and preferences.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} className="mb-4">
            <Card className="border-0 h-100 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="rounded-circle bg-primary-light p-3 me-3">
                    <FontAwesomeIcon icon={faFileMedical} className="text-primary" />
                  </div>
                  <h3 className="h5 mb-0 fw-bold">6. Documentation & Report</h3>
                </div>
                <p>
                  At the end of your consultation, our Report Generation Agent compiles all information into a comprehensive 
                  medical report. This detailed document includes your symptoms, diagnosis, treatment plan, and supporting 
                  evidence. You can download this report as a PDF for your records or to share with healthcare providers.
                </p>
                <p className="mb-0 small fst-italic text-muted">
                  <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                  All consultation data is securely stored with appropriate patient identifiers.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Technology Stack */}
        <Row className="justify-content-center mb-5">
          <Col md={10}>
            <Card className="border-0 shadow-sm">
              <Card.Header className="bg-white p-4 border-0">
                <h3 className="h4 fw-bold mb-0">Our Technology Stack</h3>
              </Card.Header>
              <Card.Body className="p-4">
                <Row>
                  <Col md={6} className="mb-4">
                    <h4 className="h6 fw-bold">Frontend</h4>
                    <p>
                      Built with React.js for a dynamic, responsive user interface with reusable components for real-time chat,
                      treatment plan selection, and medical form management. React Hook Form and Yup validation ensure secure,
                      accurate data capture for patient information.
                    </p>
                  </Col>
                  
                  <Col md={6} className="mb-4">
                    <h4 className="h6 fw-bold">Backend</h4>
                    <p>
                      Powered by FastAPI and Python for asynchronous AI orchestration, enabling parallel processing of GPT-4o
                      and Perplexity API calls. MongoDB provides flexible document storage for nested patient records and
                      session management with TTL indexes for automatic cleanup.
                    </p>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6} className="mb-4">
                    <h4 className="h6 fw-bold">AI Architecture</h4>
                    <p>
                      Multiple specialized AI agents work together in an orchestrated system: Interview Agent (GPT-4o mini),
                      Initial and Final Diagnosis Agents (GPT-4o), Medical Research Agent (Perplexity API), Treatment Plan
                      Agent (GPT-4o), and Report Generation Agent (GPT-4o).
                    </p>
                  </Col>
                  
                  <Col md={6}>
                    <h4 className="h6 fw-bold">Security & Compliance</h4>
                    <p>
                      All patient data is encrypted and protected under strict security protocols. Our infrastructure is
                      designed with secure session management, JWT authentication, and
                      rate limiting to protect against unauthorized access.
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Important Notes */}
        <Row className="justify-content-center">
          <Col md={10}>
            <div className="bg-primary-light p-4 rounded-3 shadow-sm">
              <h3 className="h5 fw-bold mb-3">Important Notes</h3>
              <ul className="mb-0">
                <li className="mb-2">
                  <strong>Not a Replacement for Emergency Care:</strong> Dr. CaringAI is not designed for emergency situations. 
                  If you're experiencing severe symptoms or a medical emergency, please call emergency services or visit your 
                  nearest emergency room immediately.
                </li>
                <li className="mb-2">
                  <strong>Consult with Healthcare Providers:</strong> While our AI system provides valuable insights and 
                  recommendations, we encourage you to discuss the results with licensed healthcare professionals for 
                  validation and further guidance.
                </li>
                <li>
                  <strong>Continuous Improvement:</strong> Our system is constantly learning and improving. We regularly 
                  update our medical knowledge base and AI algorithms to ensure the highest quality of care.
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HowItWorksPage; 