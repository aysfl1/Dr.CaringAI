import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Dropdown, NavDropdown } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUserMd, 
  faTachometerAlt, 
  faUsers, 
  faSignOutAlt, 
  faUser, 
  faArrowRight,
  faHeartbeat,
  faQuestionCircle,
  faClipboardList,
  faPhoneAlt,
  faInfoCircle,
  faBook,
  faFileAlt,
  faShieldAlt,
  faChartLine,
  faChartPie,
  faCog
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../context/AuthContext';

const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [expanded, setExpanded] = useState(false);
    
    // Check if current path is an admin path
    const isAdminPath = location.pathname.startsWith('/admin');

    // Handle logout
    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Check if the current path matches the given path
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Close mobile menu when a link is clicked
    const handleNavLinkClick = () => {
        setExpanded(false);
    };

    // Logo element with medical icon
    const LogoElement = () => (
        <div className="d-flex align-items-center">
            <div className="logo-icon me-2 d-flex align-items-center justify-content-center" 
                style={{ 
                    width: '36px', 
                    height: '36px', 
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
    );

    // Render navigation based on whether user is in admin area or not
    return (
        <Navbar 
            bg="white" 
            expand="lg" 
            className="shadow-sm py-3 fixed-top"
            style={{ borderBottom: '1px solid var(--light-gray)' }}
            expanded={expanded}
            onToggle={setExpanded}
        >
            <Container>
                <Navbar.Brand as={Link} to={isAdminPath ? "/admin/dashboard" : "/"} onClick={handleNavLinkClick}>
                    <LogoElement />
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    {isAdminPath ? (
                        // Admin Navigation
                        <>
                            <Nav className="me-auto">
                                <Nav.Link 
                                    as={Link} 
                                    to="/admin/dashboard" 
                                    active={isActive('/admin/dashboard')}
                                    className="d-flex align-items-center px-3 py-2 mx-1"
                                    onClick={handleNavLinkClick}
                                >
                                    <FontAwesomeIcon icon={faTachometerAlt} className="me-2" />
                                    Dashboard
                                </Nav.Link>
                                <Nav.Link 
                                    as={Link} 
                                    to="/admin/patients" 
                                    active={isActive('/admin/patients')}
                                    className="d-flex align-items-center px-3 py-2 mx-1"
                                    onClick={handleNavLinkClick}
                                >
                                    <FontAwesomeIcon icon={faUsers} className="me-2" />
                                    Patients
                                </Nav.Link>
                                <Nav.Link 
                                    as={Link} 
                                    to="/admin/consultations" 
                                    active={isActive('/admin/consultations')}
                                    className="d-flex align-items-center px-3 py-2 mx-1"
                                    onClick={handleNavLinkClick}
                                >
                                    <FontAwesomeIcon icon={faClipboardList} className="me-2" />
                                    Consultations
                                </Nav.Link>
                                <NavDropdown 
                                    title={
                                        <span className="d-flex align-items-center">
                                            <FontAwesomeIcon icon={faChartLine} className="me-2" />
                                            Reports & Analytics
                                        </span>
                                    } 
                                    id="admin-dropdown"
                                    active={isActive('/admin/reports') || isActive('/admin/analytics')}
                                >
                                    <NavDropdown.Item 
                                        as={Link} 
                                        to="/admin/reports"
                                        active={isActive('/admin/reports')}
                                        onClick={handleNavLinkClick}
                                    >
                                        <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                                        Medical Reports
                                    </NavDropdown.Item>
                                    <NavDropdown.Item 
                                        as={Link} 
                                        to="/admin/analytics"
                                        active={isActive('/admin/analytics')}
                                        onClick={handleNavLinkClick}
                                    >
                                        <FontAwesomeIcon icon={faChartPie} className="me-2" />
                                        Analytics
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            
                            <Dropdown align="end">
                                <Dropdown.Toggle 
                                    variant="outline-light" 
                                    id="dropdown-basic"
                                    className="d-flex align-items-center border-0"
                                >
                                    <div className="d-flex align-items-center">
                                        <div className="rounded-circle bg-primary bg-opacity-10 p-2 me-2">
                                            <FontAwesomeIcon icon={faUserMd} className="text-primary" />
                                        </div>
                                        <span className="d-none d-md-inline">Dr. {user?.name || 'Admin'}</span>
                                    </div>
                                </Dropdown.Toggle>

                                <Dropdown.Menu className="shadow-sm border-0 mt-2">
                                    <Dropdown.Item as={Link} to="/admin/settings" className="py-2" onClick={handleNavLinkClick}>
                                        <FontAwesomeIcon icon={faCog} className="me-2 text-primary opacity-75" />
                                        Settings
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/profile" className="py-2" onClick={handleNavLinkClick}>
                                        <FontAwesomeIcon icon={faUser} className="me-2 text-primary opacity-75" />
                                        Profile
                                    </Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={() => { handleLogout(); handleNavLinkClick(); }} className="py-2 text-danger">
                                        <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                                        Logout
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    ) : (
                        // Patient Navigation
                        <Nav className="ms-auto align-items-center">
                            <Nav.Link 
                                as={Link} 
                                to="/about" 
                                active={isActive('/about')}
                                className="px-2 py-2 d-none d-md-flex align-items-center text-dark"
                                onClick={handleNavLinkClick}
                            >
                                <FontAwesomeIcon icon={faInfoCircle} className="me-1" />
                                <span className="d-inline">About&nbsp;Us</span>
                            </Nav.Link>
                            
                            <Nav.Link 
                                as={Link} 
                                to="/how-it-works" 
                                active={isActive('/how-it-works')}
                                className="px-2 py-2 d-none d-md-flex align-items-center text-dark"
                                onClick={handleNavLinkClick}
                            >
                                <FontAwesomeIcon icon={faQuestionCircle} className="me-1" />
                                <span className="d-inline">How&nbsp;It&nbsp;Works</span>
                            </Nav.Link>
                            
                            <NavDropdown 
                                title={
                                    <span className="text-dark">
                                        <FontAwesomeIcon icon={faBook} className="me-2 text-primary" />
                                        Resources
                                    </span>
                                } 
                                id="resources-dropdown"
                                className="d-none d-md-block"
                            >
                                <NavDropdown.Item 
                                    as={Link} 
                                    to="/faq"
                                    onClick={handleNavLinkClick}
                                >
                                    <FontAwesomeIcon icon={faQuestionCircle} className="me-2 text-primary opacity-75" />
                                    FAQ
                                </NavDropdown.Item>
                                <NavDropdown.Item 
                                    as={Link} 
                                    to="/contact"
                                    onClick={handleNavLinkClick}
                                >
                                    <FontAwesomeIcon icon={faPhoneAlt} className="me-2 text-primary opacity-75" />
                                    Contact Us
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item 
                                    as={Link} 
                                    to="/terms"
                                    onClick={handleNavLinkClick}
                                >
                                    <FontAwesomeIcon icon={faFileAlt} className="me-2 text-primary opacity-75" />
                                    Terms of Service
                                </NavDropdown.Item>
                                <NavDropdown.Item 
                                    as={Link} 
                                    to="/privacy"
                                    onClick={handleNavLinkClick}
                                >
                                    <FontAwesomeIcon icon={faShieldAlt} className="me-2 text-primary opacity-75" />
                                    Privacy Policy
                                </NavDropdown.Item>
                            </NavDropdown>
                            
                            {/* Mobile-only navigation items */}
                            <div className="d-md-none w-100">
                                <Nav.Link 
                                    as={Link} 
                                    to="/faq"
                                    className="px-3 py-2 d-flex align-items-center text-dark"
                                    onClick={handleNavLinkClick}
                                >
                                    <FontAwesomeIcon icon={faQuestionCircle} className="me-2 text-primary" />
                                    FAQ
                                </Nav.Link>
                                <Nav.Link 
                                    as={Link} 
                                    to="/contact"
                                    className="px-3 py-2 d-flex align-items-center text-dark"
                                    onClick={handleNavLinkClick}
                                >
                                    <FontAwesomeIcon icon={faPhoneAlt} className="me-2 text-primary" />
                                    Contact Us
                                </Nav.Link>
                                <Nav.Link 
                                    as={Link} 
                                    to="/terms"
                                    className="px-3 py-2 d-flex align-items-center text-dark"
                                    onClick={handleNavLinkClick}
                                >
                                    <FontAwesomeIcon icon={faFileAlt} className="me-2 text-primary" />
                                    Terms of Service
                                </Nav.Link>
                                <Nav.Link 
                                    as={Link} 
                                    to="/privacy"
                                    className="px-3 py-2 d-flex align-items-center text-dark"
                                    onClick={handleNavLinkClick}
                                >
                                    <FontAwesomeIcon icon={faShieldAlt} className="me-2 text-primary" />
                                    Privacy Policy
                                </Nav.Link>
                            </div>
                            
                            {location.pathname !== '/start-consultation' && (
                                <Button 
                                    as={Link} 
                                    to="/start-consultation" 
                                    variant="primary"
                                    className="d-flex align-items-center ms-md-3 px-4 mt-3 mt-md-0 w-100 w-md-auto justify-content-center"
                                    onClick={handleNavLinkClick}
                                >
                                    Start Consultation <FontAwesomeIcon icon={faArrowRight} className="ms-2" />
                                </Button>
                            )}
                            
                            {/* Admin login link with subtle styling */}
                            <Nav.Link 
                                as={Link} 
                                to="/admin/dashboard" 
                                className="ms-md-3 d-flex align-items-center small text-muted mt-3 mt-md-0 justify-content-center justify-content-md-start"
                                onClick={handleNavLinkClick}
                            >
                                <FontAwesomeIcon icon={faUser} className="me-1" />
                                Admin
                            </Nav.Link>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Navigation; 