import React, { useState } from 'react';
import { Container, Row, Col, Card, Accordion, Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faQuestionCircle, 
  faUserMd, 
  faLock, 
  faStethoscope, 
  faCreditCard,
  faToolbox
} from '@fortawesome/free-solid-svg-icons';

const FAQPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // FAQ categories with their respective questions and answers
  const faqCategories = [
    {
      id: 'general',
      title: 'General Questions',
      icon: faQuestionCircle,
      questions: [
        {
          question: "What is Dr. CaringAI?",
          answer: "Dr. CaringAI is an AI-powered medical consultation platform designed to provide preliminary medical assessments and personalized treatment plans. Our platform uses advanced artificial intelligence to simulate a medical consultation experience, helping users understand potential diagnoses and treatment options for their symptoms."
        },
        {
          question: "Who is behind Dr. CaringAI?",
          answer: "Dr. CaringAI was built by Ali, an AI Scientist with expertise in healthcare technology. With education from the Tuck School of Business and Geisel School of Medicine at Dartmouth, combined with experience at healthcare companies like Molecular You and Cardinal Health, Ali brings a unique blend of medical knowledge and AI expertise to the platform."
        },
        {
          question: "Is Dr. CaringAI a replacement for seeing a doctor?",
          answer: "No, Dr. CaringAI is not a replacement for professional medical care. Our platform is designed to provide preliminary assessments and information to help you better understand your symptoms and potential treatment options. We strongly recommend consulting with licensed healthcare professionals for definitive diagnoses and treatment plans, especially for serious or persistent conditions."
        },
        {
          question: "How accurate is Dr. CaringAI?",
          answer: "Dr. CaringAI uses state-of-the-art AI technology including GPT-4o and Perplexity API to provide the most accurate assessments possible. However, no AI system can match the expertise of trained medical professionals with years of clinical experience. Our system provides evidence-based assessments with confidence ratings, but should be used as a supplementary tool rather than a definitive medical authority."
        }
      ]
    },
    {
      id: 'using',
      title: 'Using the Platform',
      icon: faUserMd,
      questions: [
        {
          question: "How do I start a medical consultation?",
          answer: "To start a consultation, create an account or log in, then click on 'Start Consultation' from the dashboard. You'll first complete a patient intake form with your basic information and medical history. After submitting the form, you'll be directed to the consultation interface where you can describe your symptoms and interact with our AI system."
        },
        {
          question: "What information should I provide during a consultation?",
          answer: "For the most accurate assessment, provide detailed information about your symptoms, including when they started, their severity, any patterns you've noticed, and factors that make them better or worse. Also mention any relevant medical history, current medications, allergies, and lifestyle factors. The more comprehensive your information, the more accurate our assessment will be."
        },
        {
          question: "Can I upload medical test results or images?",
          answer: "Currently, our platform does not support the direct analysis of medical images or test results. However, you can mention any test results you've received during the consultation, and our system will take this information into account during the assessment process."
        },
        {
          question: "How long does a typical consultation take?",
          answer: "A typical consultation takes between 15-30 minutes, depending on the complexity of your symptoms and the amount of follow-up information needed. The process includes completing the intake form, describing your symptoms, answering follow-up questions, and reviewing your diagnosis and treatment options."
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy & Security',
      icon: faLock,
      questions: [
        {
          question: "How is my medical information protected?",
          answer: "We take your privacy seriously. All your medical information is encrypted both in transit and at rest. We employ industry-standard security measures including JWT authentication, rate limiting, and robust access controls. Our systems are designed to ensure the confidentiality and integrity of your sensitive health information."
        },
        {
          question: "Who has access to my consultation data?",
          answer: "Your consultation data is accessible only to you and our secure AI systems that process the information. No human staff have routine access to individual patient data. Any system administrators with potential access for maintenance purposes are bound by strict confidentiality agreements."
        },
        {
          question: "Is my data used to train your AI systems?",
          answer: "We may use aggregated, de-identified data to improve our AI systems and the quality of our service. However, we never use personally identifiable information for AI training without explicit consent. You can opt out of having your anonymized data used for system improvements in your account settings."
        },
        {
          question: "How long do you keep my medical information?",
          answer: "We retain your medical information for as long as you maintain an active account with us, plus any period required by applicable laws. You can request deletion of your data at any time through your account settings, and we will honor such requests except where retention is legally required."
        }
      ]
    },
    {
      id: 'medical',
      title: 'Medical Concerns',
      icon: faStethoscope,
      questions: [
        {
          question: "What types of medical conditions can Dr. CaringAI help with?",
          answer: "Dr. CaringAI is designed to provide preliminary assessments for a wide range of common medical conditions, including infections, skin conditions, digestive issues, respiratory complaints, and minor injuries. However, our platform is not suitable for emergency situations, severe mental health crises, or complex chronic conditions that require specialized care."
        },
        {
          question: "Can Dr. CaringAI prescribe medication?",
          answer: "No, Dr. CaringAI cannot prescribe medications. Only licensed healthcare professionals can legally prescribe medications. Our platform can suggest potential treatment options, including over-the-counter remedies and lifestyle modifications, but for prescription medications, you must consult with a licensed healthcare provider."
        },
        {
          question: "What should I do if my symptoms are severe or worsening?",
          answer: "If you're experiencing severe symptoms such as difficulty breathing, chest pain, severe bleeding, loss of consciousness, or any other potentially life-threatening condition, please seek emergency medical care immediately by calling emergency services or going to your nearest emergency room. Dr. CaringAI is not designed for emergency situations."
        },
        {
          question: "How should I use the treatment recommendations?",
          answer: "Treatment recommendations should be used as informational guidance rather than definitive medical advice. Always consult with a healthcare professional before starting any new treatment regimen, especially for medications or significant lifestyle changes. Our recommendations are meant to inform discussions with your healthcare provider."
        }
      ]
    },
    {
      id: 'technical',
      title: 'Technical Support',
      icon: faToolbox,
      questions: [
        {
          question: "What web browsers are supported?",
          answer: "Dr. CaringAI works best on modern web browsers including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of these browsers for optimal performance and security. Our platform is also responsive and works on mobile devices, though a desktop or tablet experience is recommended for the most comfortable consultation experience."
        },
        {
          question: "What should I do if I encounter a technical issue?",
          answer: "If you encounter a technical issue, try refreshing the page first. If the problem persists, clear your browser cache and cookies, then try again. For continued issues, please contact our support team through the 'Contact Us' page with details about the problem, including any error messages, the device you're using, and the browser version."
        },
        {
          question: "Can I access my previous consultations?",
          answer: "Yes, all your previous consultations are saved in your account history. To access them, log in to your account and navigate to the 'Consultation History' section. There, you can view details of past consultations, download reports, and even continue previous consultations if needed."
        },
        {
          question: "Is there a mobile app available?",
          answer: "Currently, Dr. CaringAI is available as a web application optimized for both desktop and mobile browsers. A dedicated mobile app is in development and will be released in the near future to provide an enhanced experience for smartphone users."
        }
      ]
    },
    {
      id: 'billing',
      title: 'Billing & Subscription',
      icon: faCreditCard,
      questions: [
        {
          question: "How much does Dr. CaringAI cost?",
          answer: "Dr. CaringAI offers several subscription tiers to meet different needs. Our basic plan starts at $9.99/month and includes up to 3 consultations per month. Premium plans with additional features start at $19.99/month. We also offer a pay-per-consultation option at $7.99 per consultation for users who don't need regular access."
        },
        {
          question: "Is there a free trial available?",
          answer: "Yes, we offer a 7-day free trial that includes one complete consultation. This allows you to experience the full capabilities of our platform before committing to a subscription. No credit card is required to start the free trial."
        },
        {
          question: "Can I cancel my subscription at any time?",
          answer: "Yes, you can cancel your subscription at any time through your account settings. After cancellation, you'll continue to have access to the service until the end of your current billing period. We don't offer partial refunds for unused portions of a billing period."
        },
        {
          question: "Do you offer refunds?",
          answer: "If you're unsatisfied with a consultation, please contact our support team within 48 hours of the consultation. We review refund requests on a case-by-case basis. For technical issues that prevented a proper consultation, we generally offer a consultation credit or refund."
        }
      ]
    }
  ];

  // Filter questions based on search term
  const filteredFAQs = searchTerm 
    ? faqCategories.map(category => ({
        ...category,
        questions: category.questions.filter(qa => 
          qa.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
          qa.answer.toLowerCase().includes(searchTerm.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqCategories;

  return (
    <div className="faq-page" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      <Container>
        {/* Hero Section */}
        <Row className="justify-content-center text-center mb-5">
          <Col md={10} lg={8}>
            <h1 className="display-4 fw-bold mb-4">Frequently Asked Questions</h1>
            <p className="lead mb-5">
              Find answers to common questions about Dr. CaringAI's AI-powered medical consultation platform.
            </p>
            
            {/* Search Bar */}
            <Form className="mb-5">
              <InputGroup className="mb-3 shadow-sm">
                <InputGroup.Text className="bg-white border-end-0">
                  <FontAwesomeIcon icon={faSearch} className="text-primary" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search for questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0"
                />
              </InputGroup>
            </Form>
          </Col>
        </Row>

        {/* FAQ Categories */}
        {filteredFAQs.length > 0 ? (
          <>
            <Row className="justify-content-center mb-5">
              <Col lg={10}>
                <div className="d-flex flex-wrap justify-content-center mb-4">
                  {faqCategories.map((category) => (
                    <Button 
                      key={category.id}
                      variant="outline-primary"
                      className="m-1 rounded-pill"
                      href={`#${category.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(category.id).scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <FontAwesomeIcon icon={category.icon} className="me-2" />
                      {category.title}
                    </Button>
                  ))}
                </div>
              </Col>
            </Row>

            {/* FAQ Content */}
            {filteredFAQs.map((category, index) => (
              <Row key={category.id} className="justify-content-center mb-5" id={category.id}>
                <Col lg={10}>
                  <Card className="border-0 shadow-sm mb-5">
                    <Card.Header className="bg-primary-light border-0 p-4">
                      <div className="d-flex align-items-center">
                        <div className="rounded-circle bg-white p-2 me-3">
                          <FontAwesomeIcon icon={category.icon} className="text-primary" />
                        </div>
                        <h2 className="h4 fw-bold mb-0">{category.title}</h2>
                      </div>
                    </Card.Header>
                    <Card.Body className="p-4">
                      <Accordion defaultActiveKey="0" alwaysOpen={false}>
                        {category.questions.map((qa, i) => (
                          <Accordion.Item key={i} eventKey={i.toString()} className="border-0 mb-3">
                            <Accordion.Header className="rounded shadow-sm">
                              <span className="fw-semibold">{qa.question}</span>
                            </Accordion.Header>
                            <Accordion.Body className="py-3">
                              <p className="mb-0">{qa.answer}</p>
                            </Accordion.Body>
                          </Accordion.Item>
                        ))}
                      </Accordion>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            ))}
          </>
        ) : (
          <Row className="justify-content-center">
            <Col md={8} className="text-center">
              <div className="py-5">
                <FontAwesomeIcon icon={faSearch} size="4x" className="text-muted mb-4" />
                <h3>No results found</h3>
                <p className="lead">
                  We couldn't find any questions matching your search term. Try using different keywords or browse through our categories.
                </p>
                <Button 
                  variant="primary" 
                  onClick={() => setSearchTerm('')}
                  className="mt-3"
                >
                  Clear Search
                </Button>
              </div>
            </Col>
          </Row>
        )}

        {/* Contact Section */}
        <Row className="justify-content-center mt-5">
          <Col md={10} lg={8} className="text-center">
            <div className="bg-light p-4 p-md-5 rounded-3 shadow-sm">
              <h3 className="h4 fw-bold mb-4">Still have questions?</h3>
              <p className="mb-4">
                If you couldn't find the answer you were looking for, our support team is here to help.
              </p>
              <Button 
                variant="primary" 
                size="lg" 
                className="rounded-pill"
                href="/contact"
              >
                Contact Us
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FAQPage; 