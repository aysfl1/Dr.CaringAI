import React from 'react';
import { Card, Button, ListGroup, Accordion, Badge, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faFileMedical, faDownload } from '@fortawesome/free-solid-svg-icons';
import { useConsultation } from '../context/ConsultationContext';

const DiagnosisTreatment = () => {
    const { 
        loading, 
        finalDiagnosis, 
        explanation, 
        treatmentOptions, 
        detailedPlan,
        reportUrl,
        selectTreatment,
        generateReport,
        downloadReport,
        consultation
    } = useConsultation();

    // Handle selecting a treatment option
    const handleSelectTreatment = async (treatmentId) => {
        if (!consultation) return;
        
        try {
            await selectTreatment(consultation.id, treatmentId);
        } catch (error) {
            console.error('Error selecting treatment:', error);
        }
    };

    // Format diagnosis data to be more human-readable
    const formatDiagnosisData = (diagnosis) => {
        if (!diagnosis) return null;
        
        // Check if diagnosis is a string (already formatted) or an object (needs formatting)
        if (typeof diagnosis === 'string') {
            return diagnosis;
        }
        
        // If it's an object, extract the diagnosis name or other relevant information
        if (typeof diagnosis === 'object') {
            return diagnosis.final_diagnosis || diagnosis.diagnosis || JSON.stringify(diagnosis);
        }
        
        return diagnosis;
    };

    // Handle generating a report
    const handleGenerateReport = async () => {
        if (!consultation) return;
        
        try {
            await generateReport(consultation.id);
        } catch (error) {
            console.error('Error generating report:', error);
        }
    };

    // Handle downloading a report
    const handleDownloadReport = async () => {
        if (!reportUrl) return;
        
        try {
            await downloadReport(reportUrl);
        } catch (error) {
            console.error('Error downloading report:', error);
        }
    };

    // If no diagnosis yet, show loading or empty state
    if (!finalDiagnosis) {
        return (
            <Card className="shadow mb-4">
                <Card.Header className="bg-info text-white">
                    <h4 className="mb-0">Diagnosis & Treatment</h4>
                </Card.Header>
                <Card.Body className="text-center py-5">
                    {loading ? (
                        <>
                            <Spinner animation="border" role="status" />
                            <p className="mt-3">Analyzing your symptoms and preparing diagnosis...</p>
                        </>
                    ) : (
                        <p>Complete the consultation to see your diagnosis and treatment options.</p>
                    )}
                </Card.Body>
            </Card>
        );
    }

    // Format the final diagnosis for display
    const formattedDiagnosis = formatDiagnosisData(finalDiagnosis);

    // Format the explanation for display
    const formattedExplanation = typeof explanation === 'object' 
        ? explanation.reasoning || JSON.stringify(explanation)
        : explanation;

    return (
        <div>
            {/* Diagnosis Card */}
            <Card className="shadow mb-4">
                <Card.Header className="bg-info text-white">
                    <h4 className="mb-0">Diagnosis</h4>
                </Card.Header>
                <Card.Body>
                    <h5 className="mb-3">{formattedDiagnosis}</h5>
                    <Card.Subtitle className="mb-2 text-muted">Explanation</Card.Subtitle>
                    <Card.Text>{formattedExplanation}</Card.Text>
                </Card.Body>
            </Card>

            {/* Treatment Options Card */}
            {treatmentOptions && treatmentOptions.length > 0 && !detailedPlan && (
                <Card className="shadow mb-4">
                    <Card.Header className="bg-success text-white">
                        <h4 className="mb-0">Treatment Options</h4>
                    </Card.Header>
                    <Card.Body>
                        <p className="mb-3">Please select one of the following treatment options:</p>
                        <ListGroup>
                            {treatmentOptions.map((option, index) => (
                                <ListGroup.Item 
                                    key={index}
                                    className="d-flex justify-content-between align-items-center"
                                >
                                    <div>
                                        <h5>{option.name}</h5>
                                        <p className="mb-1">{option.description}</p>
                                        <div>
                                            {option.tags && option.tags.map((tag, tagIndex) => (
                                                <Badge 
                                                    key={tagIndex} 
                                                    bg="info" 
                                                    className="me-1"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                    <Button 
                                        variant="outline-success"
                                        onClick={() => handleSelectTreatment(option.id || index.toString())}
                                        disabled={loading}
                                    >
                                        <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                                        Select
                                    </Button>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Card.Body>
                </Card>
            )}

            {/* Detailed Treatment Plan Card */}
            {detailedPlan && (
                <Card className="shadow mb-4">
                    <Card.Header className="bg-success text-white">
                        <h4 className="mb-0">Treatment Plan</h4>
                    </Card.Header>
                    <Card.Body>
                        <Accordion defaultActiveKey="0">
                            {detailedPlan.sections && detailedPlan.sections.map((section, index) => (
                                <Accordion.Item key={index} eventKey={index.toString()}>
                                    <Accordion.Header>{section.title}</Accordion.Header>
                                    <Accordion.Body>
                                        <p>{section.content}</p>
                                        {section.items && section.items.length > 0 && (
                                            <ListGroup variant="flush">
                                                {section.items.map((item, itemIndex) => (
                                                    <ListGroup.Item key={itemIndex}>
                                                        {item}
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>

                        <div className="d-flex justify-content-end mt-4">
                            {!reportUrl ? (
                                <Button 
                                    variant="primary" 
                                    onClick={handleGenerateReport}
                                    disabled={loading}
                                >
                                    <FontAwesomeIcon icon={faFileMedical} className="me-2" />
                                    {loading ? 'Generating...' : 'Generate Report'}
                                </Button>
                            ) : (
                                <Button 
                                    variant="success" 
                                    onClick={handleDownloadReport}
                                >
                                    <FontAwesomeIcon icon={faDownload} className="me-2" />
                                    Download Report
                                </Button>
                            )}
                        </div>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
};

export default DiagnosisTreatment; 