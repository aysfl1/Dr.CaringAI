import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, InputGroup, Spinner, Badge, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUserPlus, faStethoscope, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { patientAPI } from '../services/api';
import PatientIntakeForm from '../components/PatientIntakeForm';

const PatientsPage = () => {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddPatientModal, setShowAddPatientModal] = useState(false);
    const [showEditPatientModal, setShowEditPatientModal] = useState(false);
    const [currentPatient, setCurrentPatient] = useState(null);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [patientToDelete, setPatientToDelete] = useState(null);

    // Fetch patients on component mount
    useEffect(() => {
        fetchPatients();
    }, []);

    // Fetch patients from API
    const fetchPatients = async () => {
        try {
            setLoading(true);
            const data = await patientAPI.getPatients();
            setPatients(data);
            setError(null);
        } catch (error) {
            console.error('Error fetching patients:', error);
            setError('Failed to load patients. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Handle patient creation
    const handlePatientCreated = (newPatient) => {
        setPatients(prev => [...prev, newPatient]);
        setShowAddPatientModal(false);
    };

    // Handle patient update
    const handlePatientUpdated = (updatedPatient) => {
        setPatients(prev => 
            prev.map(patient => 
                patient.id === updatedPatient.id ? updatedPatient : patient
            )
        );
        setShowEditPatientModal(false);
        setCurrentPatient(null);
    };

    // Handle edit patient click
    const handleEditPatient = (patient) => {
        setCurrentPatient(patient);
        setShowEditPatientModal(true);
    };

    // Handle delete patient click
    const handleDeleteClick = (patient) => {
        setPatientToDelete(patient);
        setShowDeleteConfirmation(true);
    };

    // Handle confirm delete
    const handleConfirmDelete = async () => {
        if (!patientToDelete) return;
        
        try {
            await patientAPI.deletePatient(patientToDelete.id);
            setPatients(prev => prev.filter(p => p.id !== patientToDelete.id));
            setShowDeleteConfirmation(false);
            setPatientToDelete(null);
        } catch (error) {
            console.error('Error deleting patient:', error);
            setError('Failed to delete patient. Please try again.');
        }
    };

    // Handle start consultation click
    const handleStartConsultation = (patientId) => {
        navigate(`/consultation/${patientId}`);
    };

    // Filter patients based on search term
    const filteredPatients = patients.filter(patient => {
        const fullName = `${patient.first_name} ${patient.last_name}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase()) || 
               patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    });

    // Calculate age from date of birth
    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        return age;
    };

    return (
        <Container className="py-4">
            <Row className="mb-4">
                <Col>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2>Patients</h2>
                        <Button 
                            variant="primary" 
                            onClick={() => setShowAddPatientModal(true)}
                        >
                            <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                            Add New Patient
                        </Button>
                    </div>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <Card className="shadow">
                        <Card.Body>
                            <InputGroup className="mb-3">
                                <InputGroup.Text>
                                    <FontAwesomeIcon icon={faSearch} />
                                </InputGroup.Text>
                                <Form.Control
                                    placeholder="Search patients by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </InputGroup>

                            {loading ? (
                                <div className="text-center py-4">
                                    <Spinner animation="border" role="status" />
                                    <p className="mt-2">Loading patients...</p>
                                </div>
                            ) : error ? (
                                <div className="text-center py-4 text-danger">
                                    <p>{error}</p>
                                    <Button 
                                        variant="outline-primary" 
                                        onClick={fetchPatients}
                                    >
                                        Try Again
                                    </Button>
                                </div>
                            ) : filteredPatients.length === 0 ? (
                                <div className="text-center py-4">
                                    <p>No patients found. {searchTerm ? 'Try a different search term or ' : ''}add a new patient.</p>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Age</th>
                                                <th>Gender</th>
                                                <th>Email</th>
                                                <th>Medical Conditions</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {filteredPatients.map(patient => (
                                                <tr key={patient.id}>
                                                    <td>{patient.first_name} {patient.last_name}</td>
                                                    <td>{calculateAge(patient.date_of_birth)}</td>
                                                    <td>{patient.gender}</td>
                                                    <td>{patient.email}</td>
                                                    <td>
                                                        {patient.medical_conditions && patient.medical_conditions.length > 0 ? (
                                                            patient.medical_conditions.map((condition, index) => (
                                                                <Badge 
                                                                    key={index} 
                                                                    bg="info" 
                                                                    className="me-1 mb-1"
                                                                >
                                                                    {condition}
                                                                </Badge>
                                                            ))
                                                        ) : (
                                                            <span className="text-muted">None</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <Button 
                                                            variant="outline-primary" 
                                                            size="sm" 
                                                            className="me-2"
                                                            onClick={() => handleStartConsultation(patient.id)}
                                                        >
                                                            <FontAwesomeIcon icon={faStethoscope} className="me-1" />
                                                            Consult
                                                        </Button>
                                                        <Button 
                                                            variant="outline-secondary" 
                                                            size="sm" 
                                                            className="me-2"
                                                            onClick={() => handleEditPatient(patient)}
                                                        >
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </Button>
                                                        <Button 
                                                            variant="outline-danger" 
                                                            size="sm"
                                                            onClick={() => handleDeleteClick(patient)}
                                                        >
                                                            <FontAwesomeIcon icon={faTrash} />
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

            {/* Add Patient Modal */}
            <Modal 
                show={showAddPatientModal} 
                onHide={() => setShowAddPatientModal(false)}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PatientIntakeForm 
                        onPatientCreated={handlePatientCreated}
                        onCancel={() => setShowAddPatientModal(false)}
                    />
                </Modal.Body>
            </Modal>

            {/* Edit Patient Modal */}
            <Modal 
                show={showEditPatientModal} 
                onHide={() => {
                    setShowEditPatientModal(false);
                    setCurrentPatient(null);
                }}
                size="lg"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {currentPatient && (
                        <PatientIntakeForm 
                            patient={currentPatient}
                            onPatientUpdated={handlePatientUpdated}
                            onCancel={() => {
                                setShowEditPatientModal(false);
                                setCurrentPatient(null);
                            }}
                            isEditing={true}
                        />
                    )}
                </Modal.Body>
            </Modal>

            {/* Delete Confirmation Modal */}
            <Modal 
                show={showDeleteConfirmation} 
                onHide={() => {
                    setShowDeleteConfirmation(false);
                    setPatientToDelete(null);
                }}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {patientToDelete && (
                        <p>
                            Are you sure you want to delete the patient record for{' '}
                            <strong>{patientToDelete.first_name} {patientToDelete.last_name}</strong>?
                            This action cannot be undone.
                        </p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button 
                        variant="secondary" 
                        onClick={() => {
                            setShowDeleteConfirmation(false);
                            setPatientToDelete(null);
                        }}
                    >
                        Cancel
                    </Button>
                    <Button 
                        variant="danger" 
                        onClick={handleConfirmDelete}
                    >
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default PatientsPage; 