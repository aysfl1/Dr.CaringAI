import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Table, Badge, Button, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUsers, 
  faUserMd, 
  faChartLine, 
  faClipboardList, 
  faCalendarCheck, 
  faHeartbeat,
  faFileAlt,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import AdminLayout from '../../components/AdminLayout';
import { adminAPI } from '../../services/adminAPI';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalPatients: 0,
    activeConsultations: 0,
    completedConsultations: 0,
    recentConsultations: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real data from the backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await adminAPI.getDashboardStats();
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get appropriate badge color based on status
  const getStatusBadgeColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'success';
      case 'in progress':
        return 'primary';
      case 'waiting':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  // Handle view consultation
  const handleViewConsultation = (consultationId) => {
    console.log('View consultation:', consultationId);
    // In a real app, navigate to consultation detail page
    // Example: history.push(`/admin/consultations/${consultationId}`);
  };

  // Handle generate reports
  const handleGenerateReports = () => {
    console.log('Generate reports');
    // In a real app, this would trigger report generation
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Admin Dashboard</h2>
        <Button variant="primary" onClick={handleGenerateReports}>
          <FontAwesomeIcon icon={faFileAlt} className="me-2" />
          Generate Reports
        </Button>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 mb-3">
                <FontAwesomeIcon icon={faUsers} size="2x" className="text-primary" />
              </div>
              <h2 className="mb-1">{loading ? '...' : stats.totalPatients}</h2>
              <p className="text-muted mb-0">Total Patients</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
              <div className="rounded-circle bg-success bg-opacity-10 p-3 mb-3">
                <FontAwesomeIcon icon={faCalendarCheck} size="2x" className="text-success" />
              </div>
              <h2 className="mb-1">{loading ? '...' : stats.completedConsultations}</h2>
              <p className="text-muted mb-0">Completed Consultations</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 mb-3">
                <FontAwesomeIcon icon={faHeartbeat} size="2x" className="text-info" />
              </div>
              <h2 className="mb-1">{loading ? '...' : stats.activeConsultations}</h2>
              <p className="text-muted mb-0">Active Consultations</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
              <div className="rounded-circle bg-warning bg-opacity-10 p-3 mb-3">
                <FontAwesomeIcon icon={faUserMd} size="2x" className="text-warning" />
              </div>
              <h2 className="mb-1">{stats.medicalStaff || 2}</h2>
              <p className="text-muted mb-0">Medical Staff</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Consultations */}
      <Row className="mb-4">
        <Col>
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  <FontAwesomeIcon icon={faClipboardList} className="me-2 text-primary" />
                  Recent Consultations
                </h5>
                <Button 
                  variant="outline-primary" 
                  size="sm" 
                  as="a" 
                  href="/admin/consultations"
                >
                  View All
                </Button>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading consultations...</p>
                </div>
              ) : stats.recentConsultations.length === 0 ? (
                <div className="text-center py-5">
                  <p className="text-muted mb-0">No recent consultations found.</p>
                  <p className="text-muted">Patients will appear here after they start consultations.</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table hover className="align-middle mb-0">
                    <thead className="bg-light">
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
                          <td>{consultation.patient}</td>
                          <td>{formatDate(consultation.date)}</td>
                          <td>{consultation.chiefComplaint}</td>
                          <td>
                            <Badge bg={getStatusBadgeColor(consultation.status)}>
                              {consultation.status}
                            </Badge>
                          </td>
                          <td>
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => handleViewConsultation(consultation.id)}
                            >
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
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white border-0 py-3">
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faChartLine} className="me-2 text-primary" />
                Consultation Activity
              </h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-4">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <p className="mt-3 text-muted">Loading activity data...</p>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted">
                    Consultation trend over the past 7 days
                  </p>
                  <div className="activity-chart d-flex align-items-end justify-content-around h-100" style={{ height: '200px' }}>
                    {(stats.activityData || [60, 45, 80, 90, 55, 70, 85]).map((height, index) => (
                      <div 
                        key={index} 
                        className="activity-bar bg-primary rounded-top" 
                        style={{ height: `${height}%`, width: '40px' }}
                      ></div>
                    ))}
                  </div>
                  <div className="d-flex justify-content-around mt-2">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <div key={index} style={{ width: '40px' }} className="text-muted small">
                        {day}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </AdminLayout>
  );
};

export default AdminDashboard; 