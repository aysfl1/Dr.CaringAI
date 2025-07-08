import React from 'react';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faTachometerAlt, 
  faUsers, 
  faChartBar,
  faFileAlt,
  faClipboardList,
  faCog,
  faUserMd
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  // Check if current path is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Container fluid className="admin-layout p-0">
      <Row className="g-0">
        {/* Sidebar */}
        <Col md={3} lg={2} className="admin-sidebar bg-dark text-white shadow" style={{ minHeight: 'calc(100vh - 76px)' }}>
          <div className="p-3 text-center border-bottom border-secondary">
            <div className="d-inline-block rounded-circle bg-primary bg-opacity-25 p-3 mb-2">
              <FontAwesomeIcon icon={faUserMd} size="2x" className="text-primary" />
            </div>
            <h5 className="mb-1">{user?.full_name || 'Admin User'}</h5>
            <div className="badge bg-primary">{user?.role || 'Admin'}</div>
          </div>
          
          <Nav className="flex-column mt-3">
            <Nav.Link 
              as={Link} 
              to="/admin/dashboard" 
              className={`px-3 py-3 ${isActive('/admin/dashboard') ? 'active bg-primary bg-opacity-25' : 'text-light'}`}
            >
              <FontAwesomeIcon icon={faTachometerAlt} className="me-2" /> Dashboard
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/patients" 
              className={`px-3 py-3 ${isActive('/admin/patients') ? 'active bg-primary bg-opacity-25' : 'text-light'}`}
            >
              <FontAwesomeIcon icon={faUsers} className="me-2" /> Patients
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/consultations" 
              className={`px-3 py-3 ${isActive('/admin/consultations') ? 'active bg-primary bg-opacity-25' : 'text-light'}`}
            >
              <FontAwesomeIcon icon={faClipboardList} className="me-2" /> Consultations
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/reports" 
              className={`px-3 py-3 ${isActive('/admin/reports') ? 'active bg-primary bg-opacity-25' : 'text-light'}`}
            >
              <FontAwesomeIcon icon={faFileAlt} className="me-2" /> Reports
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/analytics" 
              className={`px-3 py-3 ${isActive('/admin/analytics') ? 'active bg-primary bg-opacity-25' : 'text-light'}`}
            >
              <FontAwesomeIcon icon={faChartBar} className="me-2" /> Analytics
            </Nav.Link>
            <Nav.Link 
              as={Link} 
              to="/admin/settings" 
              className={`px-3 py-3 ${isActive('/admin/settings') ? 'active bg-primary bg-opacity-25' : 'text-light'}`}
            >
              <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
            </Nav.Link>
          </Nav>
        </Col>
        
        {/* Main Content */}
        <Col md={9} lg={10} className="admin-content p-4">
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminLayout; 