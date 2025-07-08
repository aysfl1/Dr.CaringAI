import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShieldAlt, 
  faUserLock, 
  faDatabase, 
  faExchangeAlt, 
  faCookieBite,
  faGlobe,
  faUserSecret,
  faFingerprint,
  faChild
} from '@fortawesome/free-solid-svg-icons';

const PrivacyPage = () => {
  // Last updated date
  const lastUpdated = "November 15, 2023";
  
  return (
    <div className="privacy-page" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
      <Container>
        {/* Hero Section */}
        <Row className="justify-content-center text-center mb-5">
          <Col md={10} lg={8}>
            <h1 className="display-4 fw-bold mb-4">Privacy Policy</h1>
            <p className="lead mb-0">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
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
                      <FontAwesomeIcon icon={faShieldAlt} className="text-primary" />
                    </div>
                    <h2 className="h4 fw-bold mb-0">1. Introduction</h2>
                  </div>
                  
                  <p>
                    Dr. CaringAI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                    explains how we collect, use, disclose, and safeguard your information when you use our website, 
                    mobile application, or any of our services (collectively, the "Services").
                  </p>
                  
                  <p>
                    Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that 
                    you have read, understood, and agree to be bound by all the terms of this Privacy Policy. If you do 
                    not agree with our policies and practices, please do not use our Services.
                  </p>
                  
                  <p>
                    <strong>IMPORTANT NOTICE:</strong> Because we collect and process health information, we take 
                    additional measures to protect this sensitive data. While we are not a covered entity under the 
                    Health Insurance Portability and Accountability Act, we strive to follow industry best practices for health data privacy. 
                    security practices as a matter of best practice.
                  </p>
                </div>
                
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle bg-primary-light p-3 me-3">
                      <FontAwesomeIcon icon={faDatabase} className="text-primary" />
                    </div>
                    <h2 className="h4 fw-bold mb-0">2. Information We Collect</h2>
                  </div>
                  
                  <p>
                    We collect several types of information from and about users of our Services, including:
                  </p>
                  
                  <h3 className="h5 fw-bold mt-4 mb-3">2.1 Personal Information</h3>
                  
                  <p>
                    Personal information is data that can be used to identify you individually. The personal information 
                    we collect may include:
                  </p>
                  
                  <ul>
                    <li className="mb-2">
                      <strong>Contact Information:</strong> Name, email address, phone number, and mailing address.
                    </li>
                    <li className="mb-2">
                      <strong>Account Information:</strong> Username, password, and account preferences.
                    </li>
                    <li className="mb-2">
                      <strong>Demographic Information:</strong> Age, gender, and location.
                    </li>
                    <li className="mb-2">
                      <strong>Payment Information:</strong> Credit card details, billing address, and other financial 
                      information necessary for processing payments (note: payment information is processed by our 
                      third-party payment processors and is not stored on our servers).
                    </li>
                  </ul>
                  
                  <h3 className="h5 fw-bold mt-4 mb-3">2.2 Health Information</h3>
                  
                  <p>
                    When you use our medical consultation services, we collect health-related information, including:
                  </p>
                  
                  <ul>
                    <li className="mb-2">
                      <strong>Medical History:</strong> Information about your past and current medical conditions, 
                      surgeries, and treatments.
                    </li>
                    <li className="mb-2">
                      <strong>Symptoms:</strong> Details about your current symptoms, their duration, severity, and 
                      other characteristics.
                    </li>
                    <li className="mb-2">
                      <strong>Medications:</strong> Information about prescription medications, over-the-counter drugs, 
                      and supplements you are taking.
                    </li>
                    <li className="mb-2">
                      <strong>Allergies:</strong> Information about your allergies to medications, foods, or other 
                      substances.
                    </li>
                    <li className="mb-2">
                      <strong>Lifestyle Information:</strong> Details about your diet, exercise habits, alcohol 
                      consumption, smoking status, and other lifestyle factors relevant to your health.
                    </li>
                  </ul>
                  
                  <h3 className="h5 fw-bold mt-4 mb-3">2.3 Usage Information</h3>
                  
                  <p>
                    We automatically collect certain information about how you access and use our Services, including:
                  </p>
                  
                  <ul>
                    <li className="mb-2">
                      <strong>Device Information:</strong> Information about the device you use to access our Services, 
                      including hardware model, operating system, unique device identifiers, and mobile network 
                      information.
                    </li>
                    <li className="mb-2">
                      <strong>Log Information:</strong> Information that your browser or device sends whenever you 
                      access our Services, such as IP address, browser type and version, time zone setting, browser 
                      plug-in types and versions, and operating system.
                    </li>
                    <li className="mb-2">
                      <strong>Usage Data:</strong> Information about your interactions with our Services, such as the 
                      pages or content you view, the time spent on those pages, the links you click, and the features 
                      you use.
                    </li>
                    <li className="mb-2">
                      <strong>Location Information:</strong> Information about your approximate location as determined 
                      from your IP address.
                    </li>
                  </ul>
                </div>
                
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle bg-primary-light p-3 me-3">
                      <FontAwesomeIcon icon={faUserLock} className="text-primary" />
                    </div>
                    <h2 className="h4 fw-bold mb-0">3. How We Use Your Information</h2>
                  </div>
                  
                  <p>
                    We use the information we collect for various purposes, including:
                  </p>
                  
                  <h3 className="h5 fw-bold mt-4 mb-3">3.1 Providing and Improving Our Services</h3>
                  
                  <ul>
                    <li className="mb-2">
                      To provide you with the medical consultation services you request.
                    </li>
                    <li className="mb-2">
                      To generate potential diagnoses and treatment recommendations based on the information you provide.
                    </li>
                    <li className="mb-2">
                      To create and maintain your account and customize your experience.
                    </li>
                    <li className="mb-2">
                      To improve and develop our Services, including by analyzing usage patterns and trends.
                    </li>
                    <li className="mb-2">
                      To troubleshoot technical issues and ensure the proper functioning of our Services.
                    </li>
                  </ul>
                  
                  <h3 className="h5 fw-bold mt-4 mb-3">3.2 Communications</h3>
                  
                  <ul>
                    <li className="mb-2">
                      To communicate with you about your account or use of our Services.
                    </li>
                    <li className="mb-2">
                      To respond to your inquiries, comments, or concerns.
                    </li>
                    <li className="mb-2">
                      To send you technical notices, updates, security alerts, and administrative messages.
                    </li>
                    <li className="mb-2">
                      To provide you with information about new features, services, and promotions that may be of 
                      interest to you (you may opt out of marketing communications at any time).
                    </li>
                  </ul>
                  
                  <h3 className="h5 fw-bold mt-4 mb-3">3.3 Research and Analytics</h3>
                  
                  <ul>
                    <li className="mb-2">
                      To conduct research and analytics to improve our medical algorithms and the accuracy of our 
                      diagnostic and treatment recommendations.
                    </li>
                    <li className="mb-2">
                      To analyze trends and usage patterns to better understand how users interact with our Services.
                    </li>
                    <li className="mb-2">
                      To compile aggregate statistics about our users and their interactions with our Services.
                    </li>
                  </ul>
                  
                  <p>
                    <strong>Note:</strong> For research and analytics purposes, we use de-identified or aggregated data 
                    whenever possible to minimize privacy risks.
                  </p>
                  
                  <h3 className="h5 fw-bold mt-4 mb-3">3.4 Legal and Security Purposes</h3>
                  
                  <ul>
                    <li className="mb-2">
                      To enforce our Terms of Service and other agreements.
                    </li>
                    <li className="mb-2">
                      To protect the rights, property, or safety of Dr. CaringAI, our users, or others.
                    </li>
                    <li className="mb-2">
                      To detect, prevent, and address technical issues, security breaches, and fraudulent activities.
                    </li>
                    <li className="mb-2">
                      To comply with applicable laws, regulations, legal processes, or governmental requests.
                    </li>
                  </ul>
                </div>
                
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle bg-primary-light p-3 me-3">
                      <FontAwesomeIcon icon={faExchangeAlt} className="text-primary" />
                    </div>
                    <h2 className="h4 fw-bold mb-0">4. How We Share Your Information</h2>
                  </div>
                  
                  <p>
                    We may share your information in the following circumstances:
                  </p>
                  
                  <h3 className="h5 fw-bold mt-4 mb-3">4.1 Service Providers</h3>
                  
                  <p>
                    We may share your information with third-party service providers who perform services on our behalf, 
                    such as:
                  </p>
                  
                  <ul>
                    <li className="mb-2">
                      Cloud hosting and storage providers.
                    </li>
                    <li className="mb-2">
                      Payment processors.
                    </li>
                    <li className="mb-2">
                      Analytics providers.
                    </li>
                    <li className="mb-2">
                      Customer support services.
                    </li>
                    <li className="mb-2">
                      Email and communication service providers.
                    </li>
                  </ul>
                  
                  <p>
                    These service providers are contractually obligated to use your information only as necessary to 
                    provide services to us and in accordance with this Privacy Policy.
                  </p>
                  
                  <h3 className="h5 fw-bold mt-4 mb-3">4.2 AI and Technology Partners</h3>
                  
                  <p>
                    We may share de-identified health information with our AI and technology partners to improve our 
                    algorithms and the accuracy of our diagnostic and treatment recommendations. This information is 
                    stripped of personal identifiers and cannot reasonably be used to identify you.
                  </p>
                  
                  <h3 className="h5 fw-bold mt-4 mb-3">4.3 Business Transfers</h3>
                  
                  <p>
                    If Dr. CaringAI is involved in a merger, acquisition, financing, reorganization, bankruptcy, or 
                    sale of all or a portion of our assets, your information may be transferred as part of that 
                    transaction. We will notify you of any such change in ownership or control of your personal 
                    information.
                  </p>
                  
                  <h3 className="h5 fw-bold mt-4 mb-3">4.4 Legal Requirements</h3>
                  
                  <p>
                    We may disclose your information if required to do so by law or in response to valid requests by 
                    public authorities (e.g., a court or government agency). We may also disclose your information to:
                  </p>
                  
                  <ul>
                    <li className="mb-2">
                      Enforce our Terms of Service and other agreements.
                    </li>
                    <li className="mb-2">
                      Protect the rights, property, or safety of Dr. CaringAI, our users, or others.
                    </li>
                    <li className="mb-2">
                      Prevent or investigate possible wrongdoing in connection with our Services.
                    </li>
                  </ul>
                  
                  <h3 className="h5 fw-bold mt-4 mb-3">4.5 With Your Consent</h3>
                  
                  <p>
                    We may share your information with third parties when you have given us your consent to do so.
                  </p>
                  
                  <p>
                    <strong>Important:</strong> We do not sell your personal information to third parties for their 
                    marketing purposes.
                  </p>
                </div>
                
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle bg-primary-light p-3 me-3">
                      <FontAwesomeIcon icon={faCookieBite} className="text-primary" />
                    </div>
                    <h2 className="h4 fw-bold mb-0">5. Cookies and Similar Technologies</h2>
                  </div>
                  
                  <p>
                    We use cookies and similar tracking technologies to collect information about your interactions with 
                    our Services. Cookies are small data files that are placed on your device when you visit a website. 
                    We use the following types of cookies:
                  </p>
                  
                  <ul>
                    <li className="mb-2">
                      <strong>Essential Cookies:</strong> These cookies are necessary for our Services to function 
                      properly and cannot be switched off in our systems. They are usually set in response to actions 
                      you take, such as setting your privacy preferences, logging in, or filling in forms.
                    </li>
                    <li className="mb-2">
                      <strong>Analytical/Performance Cookies:</strong> These cookies allow us to count visits and traffic 
                      sources so we can measure and improve the performance of our Services. They help us know which 
                      pages are the most and least popular and see how visitors move around our website.
                    </li>
                    <li className="mb-2">
                      <strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced 
                      functionality and personalization. They may be set by us or by third-party providers whose services 
                      we have added to our pages.
                    </li>
                    <li className="mb-2">
                      <strong>Targeting Cookies:</strong> These cookies may be set through our site by our advertising 
                      partners. They may be used by those companies to build a profile of your interests and show you 
                      relevant advertisements on other sites.
                    </li>
                  </ul>
                  
                  <p>
                    You can control cookies through your browser settings and other tools. However, if you block certain 
                    cookies, you may not be able to use all the features of our Services.
                  </p>
                </div>
                
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle bg-primary-light p-3 me-3">
                      <FontAwesomeIcon icon={faUserSecret} className="text-primary" />
                    </div>
                    <h2 className="h4 fw-bold mb-0">6. Data Security</h2>
                  </div>
                  
                  <p>
                    We implement appropriate technical and organizational measures to protect your information against 
                    unauthorized access, alteration, disclosure, or destruction. Our security measures include:
                  </p>
                  
                  <ul>
                    <li className="mb-2">
                      Encryption of sensitive data both in transit and at rest.
                    </li>
                    <li className="mb-2">
                      Regular security assessments and penetration testing.
                    </li>
                    <li className="mb-2">
                      Access controls and authentication mechanisms.
                    </li>
                    <li className="mb-2">
                      Regular security training for our staff.
                    </li>
                    <li className="mb-2">
                      Monitoring systems to detect and prevent suspicious activities.
                    </li>
                  </ul>
                  
                  <p>
                    However, no method of transmission over the Internet or electronic storage is 100% secure. While we 
                    strive to use commercially acceptable means to protect your information, we cannot guarantee its 
                    absolute security.
                  </p>
                </div>
                
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle bg-primary-light p-3 me-3">
                      <FontAwesomeIcon icon={faGlobe} className="text-primary" />
                    </div>
                    <h2 className="h4 fw-bold mb-0">7. International Data Transfers</h2>
                  </div>
                  
                  <p>
                    Dr. CaringAI is based in the United States, and we process and store information on servers located 
                    in the United States. If you are located outside the United States, your information may be 
                    transferred to, stored, and processed in a country different from your country of residence, 
                    including the United States.
                  </p>
                  
                  <p>
                    By using our Services, you consent to the transfer of your information to the United States and other 
                    countries which may have different data protection laws than those in your country of residence.
                  </p>
                  
                  <p>
                    We take appropriate safeguards to ensure that your personal information remains protected in 
                    accordance with this Privacy Policy when transferred internationally.
                  </p>
                </div>
                
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle bg-primary-light p-3 me-3">
                      <FontAwesomeIcon icon={faFingerprint} className="text-primary" />
                    </div>
                    <h2 className="h4 fw-bold mb-0">8. Your Rights and Choices</h2>
                  </div>
                  
                  <p>
                    Depending on your location, you may have certain rights regarding your personal information. These 
                    may include:
                  </p>
                  
                  <ul>
                    <li className="mb-2">
                      <strong>Access:</strong> You can request a copy of the personal information we hold about you.
                    </li>
                    <li className="mb-2">
                      <strong>Correction:</strong> You can request that we correct inaccurate or incomplete information 
                      about you.
                    </li>
                    <li className="mb-2">
                      <strong>Deletion:</strong> You can request that we delete your personal information in certain 
                      circumstances.
                    </li>
                    <li className="mb-2">
                      <strong>Restriction:</strong> You can request that we restrict the processing of your personal 
                      information in certain circumstances.
                    </li>
                    <li className="mb-2">
                      <strong>Data Portability:</strong> You can request a copy of the personal information you provided 
                      to us in a structured, commonly used, and machine-readable format.
                    </li>
                    <li className="mb-2">
                      <strong>Objection:</strong> You can object to our processing of your personal information in 
                      certain circumstances.
                    </li>
                  </ul>
                  
                  <p>
                    To exercise any of these rights, please contact us using the information provided in the "Contact Us" 
                    section below. We will respond to your request within a reasonable timeframe and in accordance with 
                    applicable laws.
                  </p>
                  
                  <p>
                    <strong>Note:</strong> Some of these rights may be limited where we have compelling legitimate 
                    grounds to process your information or where we are required to retain your information for legal 
                    reasons.
                  </p>
                </div>
                
                <div className="mb-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="rounded-circle bg-primary-light p-3 me-3">
                      <FontAwesomeIcon icon={faChild} className="text-primary" />
                    </div>
                    <h2 className="h4 fw-bold mb-0">9. Children's Privacy</h2>
                  </div>
                  
                  <p>
                    Our Services are not directed to children under the age of 18. We do not knowingly collect personal 
                    information from children under 18. If you are a parent or guardian and you believe that your child 
                    has provided us with personal information, please contact us so that we can take steps to delete such 
                    information.
                  </p>
                  
                  <p>
                    If we become aware that we have collected personal information from children without verification of 
                    parental consent, we will take steps to remove that information from our servers.
                  </p>
                </div>
                
                <div className="mb-5">
                  <h2 className="h4 fw-bold mb-4">10. Changes to This Privacy Policy</h2>
                  
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for other 
                    operational, legal, or regulatory reasons. When we make changes, we will update the "Last Updated" 
                    date at the top of this Privacy Policy and notify you through the Services or by other means.
                  </p>
                  
                  <p>
                    Your continued use of our Services after any such update constitutes your acceptance of the modified 
                    Privacy Policy. We encourage you to review this Privacy Policy periodically to stay informed about 
                    how we collect, use, and protect your information.
                  </p>
                </div>
                
                <div>
                  <h2 className="h4 fw-bold mb-4">11. Contact Us</h2>
                  
                  <p>
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy 
                    practices, please contact us at:
                  </p>
                  
                  <address className="mb-0">
                    <strong>Dr. CaringAI, Inc.</strong><br />
                    43 Hanover Street<br />
                    Hanover, NH 03755<br />
                    <a href="mailto:privacy@drcaringai.com" className="text-decoration-none">privacy@drcaringai.com</a><br />
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

export default PrivacyPage; 