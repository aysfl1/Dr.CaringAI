import React from 'react';
import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faGraduationCap, 
  faBriefcase, 
  faFlask, 
  faHeartbeat, 
  faLaptopCode, 
  faHandshake
} from '@fortawesome/free-solid-svg-icons';
// Import your profile photo
import profilePhoto from '../../assets/images/profile-photo.jpg';

const AboutPage = () => {
  return (
    <div className="about-page" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      <Container>
        {/* Hero Section */}
        <Row className="justify-content-center mb-5">
          <Col md={10} className="text-center">
            <h1 className="display-4 fw-bold mb-4">About <span className="text-primary">Dr. CaringAI</span></h1>
            <p className="lead text-muted mb-5">
              Revolutionizing healthcare through AI-powered medical consultations that are accessible, accurate, and personalized.
            </p>
          </Col>
        </Row>

        {/* Founder Section */}
        <Row className="align-items-center mb-5 pb-4 border-bottom">
          <Col lg={4} className="mb-4 mb-lg-0">
            <div className="text-center">
              <div 
                className="rounded-circle mx-auto mb-4 d-flex align-items-center justify-content-center"
                style={{ 
                  width: '220px', 
                  height: '220px', 
                  backgroundColor: 'var(--primary-light)', 
                  overflow: 'hidden' 
                }}
              >
                
                {<Image src={profilePhoto} alt="Amirali Yousefli" className="img-fluid" />}
                

              </div>
              <h3 className="h4 fw-bold">Amirali (Ali) Yousefli</h3>
              <p className="text-muted">Dartmouth MBA/MPH Candidate</p>
              <div className="d-flex justify-content-center">
                <a href="https://www.linkedin.com/in/aysf" className="btn btn-sm btn-outline-primary mx-1">LinkedIn</a>
                <a href="mailto:Amirali.Yousefli.tu25@tuck.dartmouth.edu" className="btn btn-sm btn-outline-primary mx-1">Email</a>
              </div>
            </div>
          </Col>
          <Col lg={8}>
            <h3 className="h4 fw-bold mb-4">Meet Ali</h3>
            <p>
              Ali is a healthcare innovator with a unique combination of expertise spanning medicine, business, 
              and artificial intelligence. With a background in both healthcare and technology, Ali is passionate about 
              leveraging AI to transform patient care.
            </p>
            <p>
              Ali has an MBA degree from Tuck School of Business at Dartmouth and an MPH degree from Geisel School of Medicine, 
              Ali brings deep knowledge of healthcare systems and business strategy to Dr. CaringAI. His experience as an 
              AI Scientist at Molecular You has been instrumental in developing secure dual-LLM architectures with RAG integration 
              for personalized healthcare recommendations.
            </p>
            <p>
              Ali's vision for Dr. CaringAI emerged from his experience observing gaps in healthcare access and his belief 
              that AI can democratize medical expertise while supporting healthcare providers in clinical decision-making.
            </p>
          </Col>
        </Row>

        {/* Education & Experience Section */}
        <Row className="mb-5">
          <Col md={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="rounded-circle bg-primary-light p-3 me-3">
                    <FontAwesomeIcon icon={faGraduationCap} className="text-primary" />
                  </div>
                  <h3 className="h5 mb-0 fw-bold">Education</h3>
                </div>
                
                <div className="mb-4">
                  <h4 className="h6 fw-bold">Tuck School of Business at Dartmouth</h4>
                  <p className="small text-muted mb-1">Candidate for MBA – STEM Designated, 2023-2025</p>
                  <p className="small">Merit-based Tuck Scholarship Recipient; Health Care Club, Tuck Center for Health Care Fellow</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="h6 fw-bold">Geisel School of Medicine at Dartmouth</h4>
                  <p className="small text-muted mb-1">Candidate for MPH, 2024-2025</p>
                </div>
                
                <div>
                  <h4 className="h6 fw-bold">University of Manitoba</h4>
                  <p className="small text-muted mb-1">Bachelor of Science (Biology, Chemistry), 2013-2017</p>
                  <p className="small">Research Projects: In-vitro assays of snake venom metalloproteases | Histological studies on mice myocardium</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} className="mb-4">
            <Card className="border-0 shadow-sm h-100">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="rounded-circle bg-primary-light p-3 me-3">
                    <FontAwesomeIcon icon={faBriefcase} className="text-primary" />
                  </div>
                  <h3 className="h5 mb-0 fw-bold">Professional Experience</h3>
                </div>
                
                <div className="mb-4">
                  <h4 className="h6 fw-bold">Molecular You</h4>
                  <p className="small text-muted mb-1">AI Scientist (2024)</p>
                  <p className="small">Developed patient-focused healthcare solutions through secure dual-LLM architecture with RAG integration, enabling personalized recommendations and supporting healthcare providers in clinical decision-making.</p>
                </div>
                
                <div className="mb-4">
                  <h4 className="h6 fw-bold">Cardinal Health</h4>
                  <p className="small text-muted mb-1">Senior Specialist, Quality Assurance (2020-2023)</p>
                  <p className="small">Led Kaizen events, delivering $1M+ cost savings by strategically improving U.S. Manufacturing process. Directed temperature management across all 8 Canadian warehouses, protecting inventory integrity worth $100M+.</p>
                </div>
                
                <div>
                  <h4 className="h6 fw-bold">Apotex Inc.</h4>
                  <p className="small text-muted mb-1">Research Scientist, R&D Chemistry Department (2018-2020)</p>
                  <p className="small">Led cross-functional projects to optimize production and isolation of Active Pharmaceutical Ingredients (APIs). Obtained multiple awards for collaboration and quality.</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Mission and Vision */}
        <Row className="justify-content-center mb-5">
          <Col md={10}>
            <Card className="border-0 shadow-sm mb-5">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <div className="rounded-circle bg-primary-light p-3 me-3">
                    <FontAwesomeIcon icon={faHeartbeat} className="text-primary" />
                  </div>
                  <h3 className="h5 mb-0 fw-bold">Our Mission & Vision</h3>
                </div>
                
                <Row>
                  <Col md={6} className="mb-4 mb-md-0">
                    <h4 className="h6 fw-bold">Mission</h4>
                    <p>
                      Our mission is to democratize healthcare by providing accessible, AI-powered medical consultations that deliver 
                      personalized diagnoses and treatment plans. We aim to bridge the gap between patients and quality healthcare, 
                      regardless of geographical or socioeconomic barriers.
                    </p>
                  </Col>
                  
                  <Col md={6}>
                    <h4 className="h6 fw-bold">Vision</h4>
                    <p>
                      We envision a world where everyone has immediate access to high-quality medical guidance. By combining 
                      cutting-edge AI technology with rigorous medical knowledge, we strive to create a healthcare ecosystem that 
                      empowers patients while supporting healthcare providers, ultimately improving health outcomes globally.
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Technical Projects */}
        <Row className="mb-5">
          <Col md={12}>
            <h2 className="h3 fw-bold mb-4 text-center">Technical Projects</h2>
          </Col>
          
          <Col md={6} lg={4} className="mb-4">
            <Card className="health-card h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle bg-primary-light p-3 me-3">
                    <FontAwesomeIcon icon={faLaptopCode} className="text-primary" />
                  </div>
                  <h3 className="h5 mb-0 fw-bold">Dr. AI Web Application</h3>
                </div>
                <p className="text-muted mb-0">
                  Building web-based diagnostic support system combining clinical reasoning with agentic AI orchestration.
                  Implementing comprehensive patient interview, differential diagnosis, Perplexity medical research, and treatment.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={4} className="mb-4">
            <Card className="health-card h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle bg-primary-light p-3 me-3">
                    <FontAwesomeIcon icon={faFlask} className="text-primary" />
                  </div>
                  <h3 className="h5 mb-0 fw-bold">Clinical AI Integration</h3>
                </div>
                <p className="text-muted mb-0">
                  Capstone project developing structured implementation framework addressing technical infrastructure, clinical workflow integration, and business sustainability.
                  Analyzing ethical considerations and bias mitigation strategies for AI deployment.
                </p>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6} lg={4} className="mb-4">
            <Card className="health-card h-100 border-0 shadow-sm">
              <Card.Body className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div className="rounded-circle bg-primary-light p-3 me-3">
                    <FontAwesomeIcon icon={faHandshake} className="text-primary" />
                  </div>
                  <h3 className="h5 mb-0 fw-bold">LLM Applications In Healthcare</h3>
                </div>
                <p className="text-muted mb-0">
                  Authored comprehensive research examining LLM implementation in healthcare settings. Developed and implemented a novel dual-LLM architecture with RAG integration, demonstrating security-first design principles.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Values Section */}
        <Row className="justify-content-center">
          <Col md={10}>
            <div className="text-center mb-5">
              <h2 className="h3 fw-bold mb-4">Our Core Values</h2>
              <p className="text-muted">
                At Dr. CaringAI, we're guided by a set of core principles that inform every aspect of our work.
              </p>
            </div>
            
            <Row className="mb-5">
              <Col md={4} className="mb-4">
                <div className="text-center">
                  <div className="health-icon-container mx-auto">
                    <FontAwesomeIcon icon={faHeartbeat} />
                  </div>
                  <h3 className="h5 fw-bold mb-3">Patient-Centered Care</h3>
                  <p className="text-muted">
                    We place patients at the center of everything we do, ensuring our technology serves their needs with compassion and respect.
                  </p>
                </div>
              </Col>
              
              <Col md={4} className="mb-4">
                <div className="text-center">
                  <div className="health-icon-container mx-auto">
                    <FontAwesomeIcon icon={faFlask} />
                  </div>
                  <h3 className="h5 fw-bold mb-3">Scientific Rigor</h3>
                  <p className="text-muted">
                    We maintain the highest standards of medical accuracy and scientific integrity in all our AI systems and recommendations.
                  </p>
                </div>
              </Col>
              
              <Col md={4} className="mb-4">
                <div className="text-center">
                  <div className="health-icon-container mx-auto">
                    <FontAwesomeIcon icon={faHandshake} />
                  </div>
                  <h3 className="h5 fw-bold mb-3">Accessibility & Inclusion</h3>
                  <p className="text-muted">
                    We strive to make quality healthcare accessible to all, bridging gaps in healthcare delivery and promoting inclusion.
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AboutPage; 