import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, InputGroup, Badge, Dropdown, Row, Col, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFilter, 
  faEye, 
  faCalendarAlt,
  faClipboardList,
  faSort,
  faDownload,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import AdminLayout from '../../components/AdminLayout';
import { adminAPI } from '../../services/adminAPI';

const ConsultationsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch real consultations data from the backend
  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await adminAPI.getAllConsultations();
        setConsultations(response.data);
      } catch (error) {
        console.error('Error fetching consultations:', error);
        setError('Failed to load consultations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchConsultations();
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

  // Filter consultations based on search term and status filter
  const filteredConsultations = consultations.filter(consultation => {
    const matchesSearch = 
      consultation.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.chiefComplaint.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (consultation.diagnosis && consultation.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = 
      statusFilter === 'All' || 
      consultation.status.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  });

  // Handle view consultation
  const handleViewConsultation = (consultationId) => {
    console.log('View consultation:', consultationId);
    // In a real app, navigate to consultation detail page
    // Example: history.push(`/admin/consultations/${consultationId}`);
  };

  // Handle download report
  const handleDownloadReport = (consultationId) => {
    console.log('Download report:', consultationId);
    // In a real app, download the report
    // Example: adminAPI.downloadReport(consultationId).then(response => {...});
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FontAwesomeIcon icon={faClipboardList} className="me-2 text-primary" />
          Consultations
        </h2>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
          {error}
        </Alert>
      )}

      {/* Filters and Search */}
      <Card className="border-0 shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={6} lg={8}>
              <InputGroup className="mb-3 mb-md-0">
                <InputGroup.Text className="bg-light border-end-0">
                  <FontAwesomeIcon icon={faSearch} className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search by patient, complaint, or diagnosis..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border-start-0 bg-light"
                />
              </InputGroup>
            </Col>
            <Col md={6} lg={4}>
              <div className="d-flex gap-2">
                <Dropdown className="w-100">
                  <Dropdown.Toggle variant="light" className="w-100 d-flex align-items-center justify-content-between">
                    <span>
                      <FontAwesomeIcon icon={faFilter} className="me-2" />
                      Status: {statusFilter}
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setStatusFilter('All')}>All</Dropdown.Item>
                    <Dropdown.Item onClick={() => setStatusFilter('Completed')}>Completed</Dropdown.Item>
                    <Dropdown.Item onClick={() => setStatusFilter('In Progress')}>In Progress</Dropdown.Item>
                    <Dropdown.Item onClick={() => setStatusFilter('Waiting')}>Waiting</Dropdown.Item>
                    <Dropdown.Item onClick={() => setStatusFilter('Cancelled')}>Cancelled</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <Button variant="outline-secondary">
                  <FontAwesomeIcon icon={faSort} />
                </Button>
              </div>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Consultations Table */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading consultations...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Patient</th>
                    <th>Date</th>
                    <th>Chief Complaint</th>
                    <th>Diagnosis</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredConsultations.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        {searchTerm || statusFilter !== 'All' ? (
                          <>No consultations found matching your criteria.</>
                        ) : (
                          <>No consultations found. Patients will appear here after they start consultations.</>
                        )}
                      </td>
                    </tr>
                  ) : (
                    filteredConsultations.map((consultation) => (
                      <tr key={consultation.id}>
                        <td>{consultation.patient}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-muted me-2" />
                            {formatDate(consultation.date)}
                          </div>
                        </td>
                        <td>{consultation.chiefComplaint}</td>
                        <td>{consultation.diagnosis || 'Pending'}</td>
                        <td>
                          <Badge bg={getStatusBadgeColor(consultation.status)}>
                            {consultation.status}
                          </Badge>
                        </td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => handleViewConsultation(consultation.id)}
                            >
                              <FontAwesomeIcon icon={faEye} className="me-1" /> View
                            </Button>
                            {consultation.hasReport && (
                              <Button 
                                variant="outline-success" 
                                size="sm"
                                onClick={() => handleDownloadReport(consultation.id)}
                              >
                                <FontAwesomeIcon icon={faDownload} className="me-1" /> Report
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>
    </AdminLayout>
  );
};

export default ConsultationsPage; 