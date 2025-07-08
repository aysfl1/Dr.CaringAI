import React, { useState } from 'react';
import { Card, Row, Col, Table, Button, Form, Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartLine, 
  faChartPie, 
  faChartBar, 
  faDownload,
  faUsers,
  faCalendarCheck,
  faStethoscope,
  faChartArea
} from '@fortawesome/free-solid-svg-icons';
import AdminLayout from '../../components/AdminLayout';

const AnalyticsPage = () => {
  const [dateRange, setDateRange] = useState('last30Days');
  const [activeTab, setActiveTab] = useState('overview');

  const diagnosticsData = [
    { diagnosis: 'Migraine', count: 24, percentage: 18 },
    { diagnosis: 'Common Cold', count: 19, percentage: 14 },
    { diagnosis: 'Gastritis', count: 16, percentage: 12 },
    { diagnosis: 'Hypertension', count: 14, percentage: 10 },
    { diagnosis: 'Anxiety', count: 12, percentage: 9 },
    { diagnosis: 'Muscle Strain', count: 10, percentage: 7 },
    { diagnosis: 'Bronchitis', count: 9, percentage: 7 },
    { diagnosis: 'Allergic Rhinitis', count: 8, percentage: 6 },
    { diagnosis: 'Urinary Tract Infection', count: 7, percentage: 5 },
    { diagnosis: 'Others', count: 16, percentage: 12 }
  ];

  const usageTimeData = [
    { hour: '8 AM', consultations: 5 },
    { hour: '9 AM', consultations: 8 },
    { hour: '10 AM', consultations: 12 },
    { hour: '11 AM', consultations: 15 },
    { hour: '12 PM', consultations: 10 },
    { hour: '1 PM', consultations: 7 },
    { hour: '2 PM', consultations: 13 },
    { hour: '3 PM', consultations: 18 },
    { hour: '4 PM', consultations: 14 },
    { hour: '5 PM', consultations: 11 },
    { hour: '6 PM', consultations: 8 },
    { hour: '7 PM', consultations: 4 }
  ];

  const renderBarChart = (data) => (
    <div className="bar-chart d-flex align-items-end" style={{ height: '250px' }}>
      {data.map((item, index) => (
        <div key={index} className="bar-chart-column d-flex flex-column align-items-center flex-grow-1">
          <div 
            className="bar-chart-bar rounded-top bg-primary" 
            style={{ 
              height: `${(item.consultations / 20) * 100}%`, 
              width: '80%',
              minHeight: '5px'
            }}
          ></div>
          <div className="bar-chart-label text-muted small mt-2">{item.hour}</div>
        </div>
      ))}
    </div>
  );

  const renderPieChart = (data) => (
    <div className="position-relative" style={{ height: '250px' }}>
      <div className="pie-chart-container d-flex justify-content-center mb-4">
        <div className="pie-chart-placeholder rounded-circle d-flex align-items-center justify-content-center" 
             style={{ width: '200px', height: '200px', border: '2px solid #e9ecef' }}>
          <div className="text-center">
            <div className="text-muted mb-1">Total</div>
            <h3>135</h3>
            <div className="text-muted">Consultations</div>
          </div>
        </div>
      </div>
      <div className="pie-chart-legend mt-3">
        <Row>
          {data.slice(0, 4).map((item, index) => (
            <Col xs={6} key={index} className="mb-2">
              <div className="d-flex align-items-center">
                <div className="legend-color me-2" 
                  style={{ 
                    width: '12px', 
                    height: '12px', 
                    backgroundColor: `hsl(${index * 40}, 70%, 50%)`,
                    borderRadius: '3px'
                  }}>
                </div>
                <div className="legend-label small">
                  {item.diagnosis} ({item.percentage}%)
                </div>
              </div>
            </Col>
          ))}
          <Col xs={12} className="mt-2">
            <div className="d-flex align-items-center">
              <div className="legend-color me-2" 
                style={{ 
                  width: '12px', 
                  height: '12px', 
                  backgroundColor: 'hsl(200, 70%, 50%)',
                  borderRadius: '3px'
                }}>
              </div>
              <div className="legend-label small">
                Others ({data.slice(4).reduce((sum, item) => sum + item.percentage, 0)}%)
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );

  const handleDateRangeChange = (e) => {
    setDateRange(e.target.value);
    // In a real application, this would fetch new data based on date range
  };

  const handleExportData = () => {
    // In a real application, this would export the data
    console.log('Export data');
  };

  return (
    <AdminLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FontAwesomeIcon icon={faChartLine} className="me-2 text-primary" />
          Analytics
        </h2>
        <div className="d-flex gap-3">
          <Form.Select 
            value={dateRange} 
            onChange={handleDateRangeChange}
            style={{ width: '180px' }}
          >
            <option value="last7Days">Last 7 Days</option>
            <option value="last30Days">Last 30 Days</option>
            <option value="last90Days">Last 90 Days</option>
            <option value="thisYear">This Year</option>
            <option value="allTime">All Time</option>
          </Form.Select>
          <Button variant="outline-primary" onClick={handleExportData}>
            <FontAwesomeIcon icon={faDownload} className="me-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
              <div className="rounded-circle bg-primary bg-opacity-10 p-3 mb-3">
                <FontAwesomeIcon icon={faUsers} size="2x" className="text-primary" />
              </div>
              <h2 className="mb-1">124</h2>
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
              <h2 className="mb-1">135</h2>
              <p className="text-muted mb-0">Consultations</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
              <div className="rounded-circle bg-info bg-opacity-10 p-3 mb-3">
                <FontAwesomeIcon icon={faStethoscope} size="2x" className="text-info" />
              </div>
              <h2 className="mb-1">18.5</h2>
              <p className="text-muted mb-0">Avg. Minutes per Consultation</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={3}>
          <Card className="border-0 shadow-sm h-100">
            <Card.Body className="d-flex flex-column align-items-center justify-content-center p-4">
              <div className="rounded-circle bg-warning bg-opacity-10 p-3 mb-3">
                <FontAwesomeIcon icon={faChartArea} size="2x" className="text-warning" />
              </div>
              <h2 className="mb-1">82%</h2>
              <p className="text-muted mb-0">Completion Rate</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Content Tabs */}
      <Tabs
        id="analytics-tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="overview" title="Overview">
          <Row className="g-4">
            <Col md={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white py-3 border-0">
                  <h5 className="mb-0">
                    <FontAwesomeIcon icon={faChartBar} className="me-2 text-primary" />
                    Consultation Traffic by Hour
                  </h5>
                </Card.Header>
                <Card.Body>
                  {renderBarChart(usageTimeData)}
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="border-0 shadow-sm h-100">
                <Card.Header className="bg-white py-3 border-0">
                  <h5 className="mb-0">
                    <FontAwesomeIcon icon={faChartPie} className="me-2 text-primary" />
                    Common Diagnoses
                  </h5>
                </Card.Header>
                <Card.Body>
                  {renderPieChart(diagnosticsData)}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>
        <Tab eventKey="patients" title="Patient Analytics">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3 border-0">
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faUsers} className="me-2 text-primary" />
                Patient Demographics
              </h5>
            </Card.Header>
            <Card.Body className="text-center">
              <p className="text-muted mb-4">
                Patient demographic data would be displayed here with charts showing age distribution, gender ratio, and common medical conditions.
              </p>
              <div className="placeholder-chart d-flex justify-content-around align-items-end bg-light rounded p-4" style={{ height: '250px' }}>
                {[35, 65, 40, 80, 55, 75, 35, 60, 45].map((height, index) => (
                  <div 
                    key={index} 
                    className="placeholder-bar bg-primary rounded-top" 
                    style={{ height: `${height}%`, width: '30px' }}
                  ></div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Tab>
        <Tab eventKey="diagnostics" title="Diagnostic Trends">
          <Card className="border-0 shadow-sm">
            <Card.Header className="bg-white py-3 border-0">
              <h5 className="mb-0">
                <FontAwesomeIcon icon={faStethoscope} className="me-2 text-primary" />
                Top Diagnoses
              </h5>
            </Card.Header>
            <Card.Body className="p-0">
              <div className="table-responsive">
                <Table hover className="align-middle mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th>Diagnosis</th>
                      <th>Count</th>
                      <th>Percentage</th>
                      <th>Trend</th>
                    </tr>
                  </thead>
                  <tbody>
                    {diagnosticsData.map((item, index) => (
                      <tr key={index}>
                        <td>{item.diagnosis}</td>
                        <td>{item.count}</td>
                        <td>{item.percentage}%</td>
                        <td>
                          <div className="mini-chart d-flex align-items-end" style={{ height: '20px', width: '100px' }}>
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="mini-bar mx-1"
                                style={{
                                  height: `${Math.random() * 100}%`,
                                  width: '10px',
                                  backgroundColor: 'rgba(13, 110, 253, 0.5)',
                                  borderRadius: '2px'
                                }}
                              ></div>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>
    </AdminLayout>
  );
};

export default AnalyticsPage; 