import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faStethoscope, faChartLine, faCalendarAlt, faUserMd, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { patientAPI, consultationAPI } from '../services/api';

const DashboardPage = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalPatients: 0,
        totalConsultations: 0,
        recentConsultations: []
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch dashboard data
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                
                // In a real app, we would have a dedicated API endpoint for dashboard stats
                // For now, we'll simulate by fetching patients and consultations separately
                const patients = await patientAPI.getPatients();
                const consultations = await consultationAPI.getRecentConsultations();
                
                setStats({
                    totalPatients: patients.length,
                    totalConsultations: consultations.length,
                    recentConsultations: consultations.slice(0, 5) // Get only the 5 most recent
                });
                
                setError(null);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setError('Failed to load dashboard data. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        
        fetchDashboardData();
    }, []);

    // Navigate to add patient page
    const handleAddPatient = () => {
        navigate('/patients', { state: { showAddPatient: true } });
    };

    // Navigate to patients page
    const handleViewPatients = () => {
        navigate('/patients');
    };

    // Navigate to consultation page
    const handleViewConsultation = (consultationId, patientId) => {
        navigate(`/consultation/${patientId}`, { state: { consultationId } });
    };

    // Format date
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    // Show loading state
    if (loading) {
        return (
            <Container className="py-5 text-center">
                <Spinner animation="border" role="status" />
                <p className="mt-3">Loading dashboard data...</p>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>Dashboard</h2>
                        <div>
                            <Button 
                                variant="primary" 
                                onClick={handleAddPatient}
                                className="me-2"
                            >
                                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                                Add New Patient
                            </Button>
                            <Button 
                                variant="outline-primary" 
                                onClick={handleViewPatients}
                            >
                                <FontAwesomeIcon icon={faUsers} className="me-2" />
                                View All Patients
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>

            {error && (
                <Row className="mb-4">
                    <Col>
                        <div className="alert alert-danger">{error}</div>
                    </Col>
                </Row>
            )}

            {/* Stats Cards */}
            <Row className="mb-4">
                <Col md={4} className="mb-3 mb-md-0">
                    <Card className="shadow h-100">
                        <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
                            <div className="rounded-circle bg-primary bg-opacity-10 p-3 mb-3">
                                <FontAwesomeIcon icon={faUsers} size="2x" className="text-primary" />
                            </div>
                            <h3 className="mb-1">{stats.totalPatients}</h3>
                            <p className="text-muted mb-0">Total Patients</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4} className="mb-3 mb-md-0">
                    <Card className="shadow h-100">
                        <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
                            <div className="rounded-circle bg-success bg-opacity-10 p-3 mb-3">
                                <FontAwesomeIcon icon={faStethoscope} size="2x" className="text-success" />
                            </div>
                            <h3 className="mb-1">{stats.totalConsultations}</h3>
                            <p className="text-muted mb-0">Total Consultations</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="shadow h-100">
                        <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
                            <div className="rounded-circle bg-info bg-opacity-10 p-3 mb-3">
                                <FontAwesomeIcon icon={faUserMd} size="2x" className="text-info" />
                            </div>
                            <h3 className="mb-1">Dr. {user?.name || 'User'}</h3>
                            <p className="text-muted mb-0">Healthcare Provider</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Recent Consultations */}
            <Row className="mb-4">
                <Col>
                    <Card className="shadow">
                        <Card.Header className="bg-light">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />
                                    Recent Consultations
                                </h5>
                                <Button 
                                    variant="outline-primary" 
                                    size="sm"
                                    onClick={handleViewPatients}
                                >
                                    View All
                                </Button>
                            </div>
                        </Card.Header>
                        <Card.Body>
                            {stats.recentConsultations.length === 0 ? (
                                <p className="text-center py-3">No recent consultations found.</p>
                            ) : (
                                <div className="table-responsive">
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>Patient</th>
                                                <th>Date</th>
                                                <th>Chief Complaint</th>
                                                <th>Status</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {stats.recentConsultations.map((consultation) => (
                                                <tr key={consultation.id}>
                                                    <td>{consultation.patient_name}</td>
                                                    <td>{formatDate(consultation.created_at)}</td>
                                                    <td>{consultation.chief_complaint || 'Not specified'}</td>
                                                    <td>
                                                        <span className={`badge bg-${getStatusBadgeColor(consultation.status)}`}>
                                                            {consultation.status}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <Button 
                                                            variant="outline-primary" 
                                                            size="sm"
                                                            onClick={() => handleViewConsultation(consultation.id, consultation.patient_id)}
                                                        >
                                                            <FontAwesomeIcon icon={faStethoscope} className="me-1" />
                                                            View
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </div>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Activity Chart */}
            <Row>
                <Col>
                    <Card className="shadow">
                        <Card.Header className="bg-light">
                            <h5 className="mb-0">
                                <FontAwesomeIcon icon={faChartLine} className="me-2" />
                                Consultation Activity
                            </h5>
                        </Card.Header>
                        <Card.Body>
                            <div className="text-center py-4">
                                <p className="text-muted">
                                    Activity chart will be displayed here. In a real application, this would show
                                    consultation trends over time using a chart library like Chart.js or Recharts.
                                </p>
                                <div className="activity-placeholder">
                                    <div className="bar" style={{ height: '60px' }}></div>
                                    <div className="bar" style={{ height: '80px' }}></div>
                                    <div className="bar" style={{ height: '40px' }}></div>
                                    <div className="bar" style={{ height: '100px' }}></div>
                                    <div className="bar" style={{ height: '70px' }}></div>
                                    <div className="bar" style={{ height: '90px' }}></div>
                                    <div className="bar" style={{ height: '50px' }}></div>
                                </div>
                                <style jsx>{`
                                    .activity-placeholder {
                                        display: flex;
                                        justify-content: space-around;
                                        align-items: flex-end;
                                        height: 120px;
                                        margin: 20px 0;
                                    }
                                    .bar {
                                        width: 40px;
                                        background-color: #007bff;
                                        opacity: 0.7;
                                        border-radius: 4px 4px 0 0;
                                    }
                                `}</style>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

// Helper function to get badge color based on status
const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
        case 'completed':
            return 'success';
        case 'in progress':
            return 'primary';
        case 'pending':
            return 'warning';
        case 'cancelled':
            return 'danger';
        default:
            return 'secondary';
    }
};

export default DashboardPage; 