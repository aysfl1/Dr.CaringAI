import React, { useState, useEffect } from 'react';
import { Card, Table, Button, Form, InputGroup, Row, Col, Dropdown, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSearch, 
  faFileAlt,
  faDownload,
  faCalendarAlt,
  faFilter,
  faSort,
  faEye,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons';
import AdminLayout from '../../components/AdminLayout';
import { adminAPI } from '../../services/adminAPI';

const ReportsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalReports: 0,
    todayReports: 0,
    totalDownloads: 0
  });

  // Fetch real reports data from the backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);
        const reportsResponse = await adminAPI.getAllReports();
        setReports(reportsResponse.data);
        
        // In a real app, you would also fetch stats
        // Example: const statsResponse = await adminAPI.getReportsStats();
        // setStats(statsResponse.data);
        
        // For now, calculate stats from the fetched reports
        const today = new Date().toISOString().split('T')[0];
        setStats({
          totalReports: reportsResponse.data.length,
          todayReports: reportsResponse.data.filter(report => report.date.startsWith(today)).length,
          totalDownloads: reportsResponse.data.reduce((sum, report) => sum + (report.downloadCount || 0), 0)
        });
      } catch (error) {
        console.error('Error fetching reports:', error);
        setError('Failed to load reports. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Filter reports based on search term and date filter
  const filteredReports = reports.filter(report => {
    const matchesSearch = 
      report.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (report.diagnosis && report.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Date filtering logic - simplified for now
    let matchesDate = true;
    if (dateFilter !== 'All Time') {
      const reportDate = new Date(report.date);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      
      if (dateFilter === 'Today') {
        matchesDate = reportDate.toDateString() === today.toDateString();
      } else if (dateFilter === 'This Week') {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        matchesDate = reportDate >= weekAgo;
      } else if (dateFilter === 'This Month') {
        matchesDate = reportDate.getMonth() === today.getMonth() && 
                      reportDate.getFullYear() === today.getFullYear();
      } else if (dateFilter === 'Last Month') {
        const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1;
        const year = today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear();
        matchesDate = reportDate.getMonth() === lastMonth && 
                      reportDate.getFullYear() === year;
      }
    }
    
    return matchesSearch && matchesDate;
  });

  // Handle view report
  const handleViewReport = (reportId) => {
    console.log('View report:', reportId);
    // In a real app, open the report in a new window
    // Example: window.open(`/api/reports/${reportId}/view`, '_blank');
  };

  // Handle download report
  const handleDownloadReport = (reportId) => {
    console.log('Download report:', reportId);
    // In a real app, download the report
    adminAPI.downloadReport(reportId)
      .then(response => {
        // Create a download link and click it
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `report-${reportId}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error downloading report:', error);
        alert('Failed to download report. Please try again later.');
      });
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FontAwesomeIcon icon={faFileAlt} className="me-2 text-primary" />
          Medical Reports
        </h2>
      </div>

      {error && (
        <Alert variant="danger" className="mb-4">
          <FontAwesomeIcon icon={faExclamationTriangle} className="me-2" />
          {error}
        </Alert>
      )}

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-primary bg-opacity-10 p-3 me-3">
                  <FontAwesomeIcon icon={faFileAlt} className="text-primary" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Total Reports</h6>
                  <h3 className="mb-0">{loading ? '...' : stats.totalReports}</h3>
                </div>
              </div>
              <p className="text-muted mb-0">Medical reports generated for patient consultations</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-success bg-opacity-10 p-3 me-3">
                  <FontAwesomeIcon icon={faCalendarAlt} className="text-success" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Today's Reports</h6>
                  <h3 className="mb-0">{loading ? '...' : stats.todayReports}</h3>
                </div>
              </div>
              <p className="text-muted mb-0">Reports generated in the last 24 hours</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body>
              <div className="d-flex align-items-center mb-3">
                <div className="rounded-circle bg-info bg-opacity-10 p-3 me-3">
                  <FontAwesomeIcon icon={faDownload} className="text-info" />
                </div>
                <div>
                  <h6 className="text-muted mb-1">Downloads</h6>
                  <h3 className="mb-0">{loading ? '...' : stats.totalDownloads}</h3>
                </div>
              </div>
              <p className="text-muted mb-0">Total report downloads this month</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

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
                  placeholder="Search by patient or diagnosis..."
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
                      Date: {dateFilter}
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setDateFilter('All Time')}>All Time</Dropdown.Item>
                    <Dropdown.Item onClick={() => setDateFilter('Today')}>Today</Dropdown.Item>
                    <Dropdown.Item onClick={() => setDateFilter('This Week')}>This Week</Dropdown.Item>
                    <Dropdown.Item onClick={() => setDateFilter('This Month')}>This Month</Dropdown.Item>
                    <Dropdown.Item onClick={() => setDateFilter('Last Month')}>Last Month</Dropdown.Item>
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

      {/* Reports Table */}
      <Card className="border-0 shadow-sm">
        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-3 text-muted">Loading reports...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>Patient</th>
                    <th>Date Generated</th>
                    <th>Diagnosis</th>
                    <th>File Size</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReports.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center py-4">
                        {searchTerm || dateFilter !== 'All Time' ? (
                          <>No reports found matching your criteria.</>
                        ) : (
                          <>No reports found. Reports will appear here after consultations are completed.</>
                        )}
                      </td>
                    </tr>
                  ) : (
                    filteredReports.map((report) => (
                      <tr key={report.id}>
                        <td>{report.patient}</td>
                        <td>
                          <div className="d-flex align-items-center">
                            <FontAwesomeIcon icon={faCalendarAlt} className="text-muted me-2" />
                            {formatDate(report.date)}
                          </div>
                        </td>
                        <td>{report.diagnosis}</td>
                        <td>{report.size || '1.0 MB'}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <Button 
                              variant="outline-primary" 
                              size="sm"
                              onClick={() => handleViewReport(report.id)}
                            >
                              <FontAwesomeIcon icon={faEye} className="me-1" /> View
                            </Button>
                            <Button 
                              variant="outline-success" 
                              size="sm"
                              onClick={() => handleDownloadReport(report.id)}
                            >
                              <FontAwesomeIcon icon={faDownload} className="me-1" /> Download
                            </Button>
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

export default ReportsPage; 