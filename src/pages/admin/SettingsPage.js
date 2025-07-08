import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Tabs, Tab, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCog, 
  faSave, 
  faUserCog, 
  faEnvelope, 
  faLock,
  faGlobe,
  faShieldAlt,
  faDatabase,
  faKey
} from '@fortawesome/free-solid-svg-icons';
import AdminLayout from '../../components/AdminLayout';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Profile form state
  const [profileForm, setProfileForm] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    phone: '(555) 123-4567',
    title: 'System Administrator',
    bio: 'Medical consultation system administrator with over 5 years of healthcare IT experience.'
  });

  // Security form state
  const [securityForm, setSecurityForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // System settings form state
  const [systemSettings, setSystemSettings] = useState({
    siteName: 'Dr. CaringAI',
    contactEmail: 'support@draidoctor.com',
    enableRegistration: true,
    enableNotifications: true,
    dataRetentionDays: 90,
    sessionTimeoutMinutes: 30,
    apiKeys: {
      openai: '••••••••••••••••••••••••••••••',
      perplexity: '••••••••••••••••••••••••••••••'
    }
  });

  // Handle profile form change
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle security form change
  const handleSecurityChange = (e) => {
    const { name, value } = e.target;
    setSecurityForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle system settings change
  const handleSystemSettingsChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSystemSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle API key change
  const handleApiKeyChange = (key, value) => {
    setSystemSettings(prev => ({
      ...prev,
      apiKeys: {
        ...prev.apiKeys,
        [key]: value
      }
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, this would save to the backend
    console.log('Form submitted:', {
      activeTab,
      profileForm,
      securityForm,
      systemSettings
    });
    
    // Show success message
    setSaveSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setSaveSuccess(false);
    }, 3000);
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FontAwesomeIcon icon={faCog} className="me-2 text-primary" />
          Settings
        </h2>
      </div>
      
      {saveSuccess && (
        <Alert variant="success" className="mb-4">
          Settings successfully saved!
        </Alert>
      )}

      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          <Tabs
            id="settings-tabs"
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-0 settings-tabs"
          >
            <Tab eventKey="profile" title={<><FontAwesomeIcon icon={faUserCog} className="me-2" />Profile</>}>
              <div className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={profileForm.name}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={profileForm.email}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                          type="text"
                          name="phone"
                          value={profileForm.phone}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Title/Position</Form.Label>
                        <Form.Control
                          type="text"
                          name="title"
                          value={profileForm.title}
                          onChange={handleProfileChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={12}>
                      <Form.Group className="mb-3">
                        <Form.Label>Bio/Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="bio"
                          value={profileForm.bio}
                          onChange={handleProfileChange}
                          rows={3}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className="text-end mt-2">
                    <Button type="submit" variant="primary">
                      <FontAwesomeIcon icon={faSave} className="me-2" />
                      Save Profile
                    </Button>
                  </div>
                </Form>
              </div>
            </Tab>
            
            <Tab eventKey="security" title={<><FontAwesomeIcon icon={faLock} className="me-2" />Security</>}>
              <div className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="currentPassword"
                          value={securityForm.currentPassword}
                          onChange={handleSecurityChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}></Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="newPassword"
                          value={securityForm.newPassword}
                          onChange={handleSecurityChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control
                          type="password"
                          name="confirmPassword"
                          value={securityForm.confirmPassword}
                          onChange={handleSecurityChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <hr className="my-4" />
                  <h5 className="mb-3">Two-Factor Authentication</h5>
                  <Form.Check 
                    type="switch"
                    id="2fa-switch"
                    label="Enable two-factor authentication for increased security"
                    className="mb-3"
                  />
                  <div className="text-end mt-2">
                    <Button type="submit" variant="primary">
                      <FontAwesomeIcon icon={faSave} className="me-2" />
                      Save Security Settings
                    </Button>
                  </div>
                </Form>
              </div>
            </Tab>
            
            <Tab eventKey="system" title={<><FontAwesomeIcon icon={faGlobe} className="me-2" />System</>}>
              <div className="p-4">
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>System Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="siteName"
                          value={systemSettings.siteName}
                          onChange={handleSystemSettingsChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Support Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="contactEmail"
                          value={systemSettings.contactEmail}
                          onChange={handleSystemSettingsChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Data Retention (days)</Form.Label>
                        <Form.Control
                          type="number"
                          name="dataRetentionDays"
                          value={systemSettings.dataRetentionDays}
                          onChange={handleSystemSettingsChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Session Timeout (minutes)</Form.Label>
                        <Form.Control
                          type="number"
                          name="sessionTimeoutMinutes"
                          value={systemSettings.sessionTimeoutMinutes}
                          onChange={handleSystemSettingsChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Check 
                        type="switch"
                        id="enable-registration"
                        label="Enable User Registration"
                        name="enableRegistration"
                        checked={systemSettings.enableRegistration}
                        onChange={handleSystemSettingsChange}
                        className="mb-3"
                      />
                    </Col>
                    <Col md={6}>
                      <Form.Check 
                        type="switch"
                        id="enable-notifications"
                        label="Enable Email Notifications"
                        name="enableNotifications"
                        checked={systemSettings.enableNotifications}
                        onChange={handleSystemSettingsChange}
                        className="mb-3"
                      />
                    </Col>
                  </Row>
                  
                  <hr className="my-4" />
                  
                  <h5 className="mb-3">
                    <FontAwesomeIcon icon={faKey} className="me-2 text-primary" />
                    API Keys
                  </h5>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>OpenAI API Key</Form.Label>
                        <Form.Control
                          type="password"
                          value={systemSettings.apiKeys.openai}
                          onChange={(e) => handleApiKeyChange('openai', e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Perplexity API Key</Form.Label>
                        <Form.Control
                          type="password"
                          value={systemSettings.apiKeys.perplexity}
                          onChange={(e) => handleApiKeyChange('perplexity', e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <div className="text-end mt-2">
                    <Button type="submit" variant="primary">
                      <FontAwesomeIcon icon={faSave} className="me-2" />
                      Save System Settings
                    </Button>
                  </div>
                </Form>
              </div>
            </Tab>
            
            <Tab eventKey="database" title={<><FontAwesomeIcon icon={faDatabase} className="me-2" />Database</>}>
              <div className="p-4">
                <Card className="bg-light mb-4">
                  <Card.Body>
                    <h5 className="mb-3">Database Information</h5>
                    <Row>
                      <Col md={6}>
                        <div className="mb-3">
                          <div className="text-muted small">Database Type</div>
                          <div>MongoDB</div>
                        </div>
                        <div className="mb-3">
                          <div className="text-muted small">Connection Status</div>
                          <div className="text-success">Connected</div>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mb-3">
                          <div className="text-muted small">Database Size</div>
                          <div>245 MB</div>
                        </div>
                        <div className="mb-3">
                          <div className="text-muted small">Last Backup</div>
                          <div>2025-03-12 02:30 AM</div>
                        </div>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
                
                <h5 className="mb-3">Database Operations</h5>
                <Row className="g-3">
                  <Col md={4}>
                    <Card className="h-100">
                      <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                        <div className="mb-3 rounded-circle bg-primary bg-opacity-10 p-3">
                          <FontAwesomeIcon icon={faDatabase} className="text-primary" />
                        </div>
                        <h6>Backup Database</h6>
                        <p className="text-muted small mb-3">Create a full backup of the database</p>
                        <Button variant="outline-primary" size="sm" className="mt-auto">Backup Now</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="h-100">
                      <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                        <div className="mb-3 rounded-circle bg-warning bg-opacity-10 p-3">
                          <FontAwesomeIcon icon={faDatabase} className="text-warning" />
                        </div>
                        <h6>Optimize Database</h6>
                        <p className="text-muted small mb-3">Optimize database for better performance</p>
                        <Button variant="outline-warning" size="sm" className="mt-auto">Optimize</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col md={4}>
                    <Card className="h-100">
                      <Card.Body className="d-flex flex-column align-items-center text-center p-4">
                        <div className="mb-3 rounded-circle bg-danger bg-opacity-10 p-3">
                          <FontAwesomeIcon icon={faShieldAlt} className="text-danger" />
                        </div>
                        <h6>Security Audit</h6>
                        <p className="text-muted small mb-3">Run a security audit on the database</p>
                        <Button variant="outline-danger" size="sm" className="mt-auto">Run Audit</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>
            </Tab>
            
            <Tab eventKey="notifications" title={<><FontAwesomeIcon icon={faEnvelope} className="me-2" />Notifications</>}>
              <div className="p-4">
                <Form onSubmit={handleSubmit}>
                  <h5 className="mb-3">Email Notification Settings</h5>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>SMTP Server</Form.Label>
                        <Form.Control
                          type="text"
                          value="smtp.example.com"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>SMTP Port</Form.Label>
                        <Form.Control
                          type="number"
                          value="587"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={3}>
                      <Form.Group className="mb-3">
                        <Form.Label>Encryption</Form.Label>
                        <Form.Select>
                          <option value="tls">TLS</option>
                          <option value="ssl">SSL</option>
                          <option value="none">None</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>SMTP Username</Form.Label>
                        <Form.Control
                          type="text"
                          value="notifications@example.com"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>SMTP Password</Form.Label>
                        <Form.Control
                          type="password"
                          value="••••••••••••"
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  
                  <hr className="my-4" />
                  
                  <h5 className="mb-3">Notification Events</h5>
                  
                  <Form.Check 
                    type="switch"
                    id="new-patient-notification"
                    label="New patient registration"
                    className="mb-2"
                    defaultChecked
                  />
                  
                  <Form.Check 
                    type="switch"
                    id="consultation-complete-notification"
                    label="Consultation completed"
                    className="mb-2"
                    defaultChecked
                  />
                  
                  <Form.Check 
                    type="switch"
                    id="system-error-notification"
                    label="System errors and alerts"
                    className="mb-2"
                    defaultChecked
                  />
                  
                  <Form.Check 
                    type="switch"
                    id="backup-complete-notification"
                    label="Database backup completed"
                    className="mb-2"
                  />
                  
                  <div className="text-end mt-4">
                    <Button variant="outline-secondary" className="me-2">
                      Test Email
                    </Button>
                    <Button type="submit" variant="primary">
                      <FontAwesomeIcon icon={faSave} className="me-2" />
                      Save Notification Settings
                    </Button>
                  </div>
                </Form>
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default SettingsPage; 