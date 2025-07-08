import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, 
    faEnvelope, 
    faPhone, 
    faMapMarkerAlt, 
    faCalendarAlt, 
    faVenusMars, 
    faPlus, 
    faMinus, 
    faClipboardList, 
    faAllergies, 
    faPills, 
    faHeartbeat, 
    faHistory, 
    faUserFriends, 
    faShieldAlt,
    faNotesMedical,
    faCheck
} from '@fortawesome/free-solid-svg-icons';
import { patientAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';

// Validation schema for patient intake form
const PatientSchema = Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    date_of_birth: Yup.date().required('Date of birth is required').max(new Date(), 'Future date not allowed'),
    gender: Yup.string().required('Gender is required'),
    phone_number: Yup.string().matches(/^\d{10,15}$/, 'Phone number must be 10-15 digits'),
    address: Yup.string(),
    city: Yup.string(),
    state: Yup.string(),
    zip_code: Yup.string(),
    allergies: Yup.array().of(Yup.string()),
    current_medications: Yup.array().of(Yup.string()),
    medical_conditions: Yup.array().of(Yup.string()),
    surgical_history: Yup.array().of(Yup.string()),
    family_medical_history: Yup.array().of(Yup.string()),
});

const PatientIntakeForm = ({ onPatientCreated }) => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Initial form values
    const initialValues = {
        first_name: '',
        last_name: '',
        email: '',
        date_of_birth: '',
        gender: '',
        phone_number: '',
        address: '',
        city: '',
        state: '',
        zip_code: '',
        allergies: [''],
        current_medications: [''],
        medical_conditions: [''],
        surgical_history: [''],
        family_medical_history: [''],
    };

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        setLoading(true);
        setError(null);
        
        try {
            // Format data
            const formattedData = {
                ...values,
                // Remove empty strings from arrays
                allergies: values.allergies.filter(item => item.trim()),
                current_medications: values.current_medications.filter(item => item.trim()),
                medical_conditions: values.medical_conditions.filter(item => item.trim()),
                surgical_history: values.surgical_history.filter(item => item.trim()),
                family_medical_history: values.family_medical_history.filter(item => item.trim()),
            };
            
            // Create patient
            const patient = await patientAPI.createPatient(formattedData);
            
            // Reset form
            resetForm();
            
            // Call the callback
            if (onPatientCreated) {
                onPatientCreated(patient);
            }
            
            // Navigate to consultation
            navigate(`/consultation/${patient.id}`);
            
        } catch (err) {
            console.error('Error creating patient:', err);
            setError('An error occurred while creating the patient. Please try again later.');
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };
    
    // Render array fields (allergies, medications, etc.)
    const renderArrayFields = (arrayHelpers, values, fieldName, label, icon) => (
        <div className="mb-4">
            <div className="d-flex align-items-center mb-3">
                <div className="health-icon-container me-2" style={{ width: '36px', height: '36px' }}>
                    <FontAwesomeIcon icon={icon} size="sm" />
                </div>
                <h5 className="mb-0">{label}</h5>
            </div>
            
            {values[fieldName].map((_, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                    <Field
                        name={`${fieldName}.${index}`}
                        className="form-control shadow-sm"
                        placeholder={`Enter ${label.toLowerCase()}`}
                    />
                    
                    <Button
                        type="button"
                        variant="outline-danger"
                        className="ms-2 d-flex align-items-center justify-content-center p-2"
                        style={{ width: '36px', height: '36px' }}
                        onClick={() => arrayHelpers.remove(index)}
                        disabled={values[fieldName].length === 1}
                    >
                        <FontAwesomeIcon icon={faMinus} />
                    </Button>
                    
                    {index === values[fieldName].length - 1 && (
                        <Button
                            type="button"
                            variant="outline-primary"
                            className="ms-2 d-flex align-items-center justify-content-center p-2"
                            style={{ width: '36px', height: '36px' }}
                            onClick={() => arrayHelpers.push('')}
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </Button>
                    )}
                </div>
            ))}
        </div>
    );

    return (
        <div className="patient-intake-container" style={{ paddingTop: '80px' }}>
            <Container>
                <Row className="justify-content-center">
                    <Col lg={10}>
                        <Card className="shadow-sm border-0 mb-4">
                            <Card.Header className="bg-white py-3 border-0 d-flex align-items-center">
                                <div className="health-icon-container me-3">
                                    <FontAwesomeIcon icon={faNotesMedical} />
                                </div>
                                <div>
                                    <h4 className="mb-0 fw-bold">Patient Information</h4>
                                    <p className="mb-0 text-muted">Please fill in your details to start the consultation</p>
                                </div>
                            </Card.Header>
                            
                            <Card.Body className="p-4">
                                {error && (
                                    <Alert variant="danger" className="mb-4">
                                        <div className="d-flex align-items-center">
                                            <FontAwesomeIcon icon={faShieldAlt} className="me-2" />
                                            {error}
                                        </div>
                                    </Alert>
                                )}
                                
                                <div className="text-center mb-4 py-3 bg-primary-light rounded-lg">
                                    <h5 className="text-primary mb-2">Your Privacy Matters</h5>
                                    <p className="mb-0 small text-muted">
                                        All your medical information is encrypted and securely stored. 
                                        <br />We never share your personal data with third parties.
                                    </p>
                                </div>
                                
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={PatientSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ values, errors, touched, isSubmitting }) => (
                                        <Form>
                                            <Row className="mb-4">
                                                <Col md={12}>
                                                    <h5 className="form-section-title mb-3 d-flex align-items-center">
                                                        <FontAwesomeIcon icon={faUser} className="text-primary me-2" />
                                                        Personal Information
                                                    </h5>
                                                </Col>
                                                
                                                <Col md={6} className="mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="first_name" className="form-label">
                                                            First Name <span className="text-danger">*</span>
                                                        </label>
                                                        <div className="input-group">
                                                            <span className="input-group-text bg-white text-primary">
                                                                <FontAwesomeIcon icon={faUser} />
                                                            </span>
                                                            <Field
                                                                type="text"
                                                                name="first_name"
                                                                id="first_name"
                                                                className={`form-control ${errors.first_name && touched.first_name ? 'is-invalid' : ''}`}
                                                                placeholder="Your first name"
                                                            />
                                                        </div>
                                                        <ErrorMessage
                                                            name="first_name"
                                                            component="div"
                                                            className="text-danger small mt-1"
                                                        />
                                                    </div>
                                                </Col>
                                                
                                                <Col md={6} className="mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="last_name" className="form-label">
                                                            Last Name <span className="text-danger">*</span>
                                                        </label>
                                                        <div className="input-group">
                                                            <span className="input-group-text bg-white text-primary">
                                                                <FontAwesomeIcon icon={faUser} />
                                                            </span>
                                                            <Field
                                                                type="text"
                                                                name="last_name"
                                                                id="last_name"
                                                                className={`form-control ${errors.last_name && touched.last_name ? 'is-invalid' : ''}`}
                                                                placeholder="Your last name"
                                                            />
                                                        </div>
                                                        <ErrorMessage
                                                            name="last_name"
                                                            component="div"
                                                            className="text-danger small mt-1"
                                                        />
                                                    </div>
                                                </Col>
                                                
                                                <Col md={6} className="mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="email" className="form-label">
                                                            Email <span className="text-danger">*</span>
                                                        </label>
                                                        <div className="input-group">
                                                            <span className="input-group-text bg-white text-primary">
                                                                <FontAwesomeIcon icon={faEnvelope} />
                                                            </span>
                                                            <Field
                                                                type="email"
                                                                name="email"
                                                                id="email"
                                                                className={`form-control ${errors.email && touched.email ? 'is-invalid' : ''}`}
                                                                placeholder="Your email address"
                                                            />
                                                        </div>
                                                        <ErrorMessage
                                                            name="email"
                                                            component="div"
                                                            className="text-danger small mt-1"
                                                        />
                                                    </div>
                                                </Col>
                                                
                                                <Col md={6} className="mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="phone_number" className="form-label">
                                                            Phone Number
                                                        </label>
                                                        <div className="input-group">
                                                            <span className="input-group-text bg-white text-primary">
                                                                <FontAwesomeIcon icon={faPhone} />
                                                            </span>
                                                            <Field
                                                                type="tel"
                                                                name="phone_number"
                                                                id="phone_number"
                                                                className={`form-control ${errors.phone_number && touched.phone_number ? 'is-invalid' : ''}`}
                                                                placeholder="Your phone number"
                                                            />
                                                        </div>
                                                        <ErrorMessage
                                                            name="phone_number"
                                                            component="div"
                                                            className="text-danger small mt-1"
                                                        />
                                                    </div>
                                                </Col>
                                                
                                                <Col md={6} className="mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="date_of_birth" className="form-label">
                                                            Date of Birth <span className="text-danger">*</span>
                                                        </label>
                                                        <div className="input-group">
                                                            <span className="input-group-text bg-white text-primary">
                                                                <FontAwesomeIcon icon={faCalendarAlt} />
                                                            </span>
                                                            <Field
                                                                type="date"
                                                                name="date_of_birth"
                                                                id="date_of_birth"
                                                                className={`form-control ${errors.date_of_birth && touched.date_of_birth ? 'is-invalid' : ''}`}
                                                            />
                                                        </div>
                                                        <ErrorMessage
                                                            name="date_of_birth"
                                                            component="div"
                                                            className="text-danger small mt-1"
                                                        />
                                                    </div>
                                                </Col>
                                                
                                                <Col md={6} className="mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="gender" className="form-label">
                                                            Gender <span className="text-danger">*</span>
                                                        </label>
                                                        <div className="input-group">
                                                            <span className="input-group-text bg-white text-primary">
                                                                <FontAwesomeIcon icon={faVenusMars} />
                                                            </span>
                                                            <Field
                                                                as="select"
                                                                name="gender"
                                                                id="gender"
                                                                className={`form-control ${errors.gender && touched.gender ? 'is-invalid' : ''}`}
                                                            >
                                                                <option value="">Select Gender</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                                <option value="other">Other</option>
                                                                <option value="prefer_not_to_say">Prefer not to say</option>
                                                            </Field>
                                                        </div>
                                                        <ErrorMessage
                                                            name="gender"
                                                            component="div"
                                                            className="text-danger small mt-1"
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            
                                            <Row className="mb-4">
                                                <Col md={12}>
                                                    <h5 className="form-section-title mb-3 d-flex align-items-center">
                                                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-primary me-2" />
                                                        Address
                                                    </h5>
                                                </Col>
                                                
                                                <Col md={12} className="mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="address" className="form-label">Street Address</label>
                                                        <Field
                                                            type="text"
                                                            name="address"
                                                            id="address"
                                                            className="form-control"
                                                            placeholder="Your street address"
                                                        />
                                                    </div>
                                                </Col>
                                                
                                                <Col md={5} className="mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="city" className="form-label">City</label>
                                                        <Field
                                                            type="text"
                                                            name="city"
                                                            id="city"
                                                            className="form-control"
                                                            placeholder="Your city"
                                                        />
                                                    </div>
                                                </Col>
                                                
                                                <Col md={4} className="mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="state" className="form-label">State</label>
                                                        <Field
                                                            type="text"
                                                            name="state"
                                                            id="state"
                                                            className="form-control"
                                                            placeholder="Your state"
                                                        />
                                                    </div>
                                                </Col>
                                                
                                                <Col md={3} className="mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="zip_code" className="form-label">Zip Code</label>
                                                        <Field
                                                            type="text"
                                                            name="zip_code"
                                                            id="zip_code"
                                                            className="form-control"
                                                            placeholder="Zip code"
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                            
                                            <Row className="mb-4">
                                                <Col md={12}>
                                                    <h5 className="form-section-title mb-3 d-flex align-items-center">
                                                        <FontAwesomeIcon icon={faClipboardList} className="text-primary me-2" />
                                                        Medical Information
                                                    </h5>
                                                    <p className="text-muted small mb-4">
                                                        Please provide any relevant medical information to help us better understand your health status.
                                                        This information will help our AI provide more accurate consultations.
                                                    </p>
                                                </Col>
                                                
                                                <Col md={6} className="mb-4">
                                                    <FieldArray name="allergies">
                                                        {arrayHelpers => renderArrayFields(
                                                            arrayHelpers, 
                                                            values, 
                                                            'allergies', 
                                                            'Allergies', 
                                                            faAllergies
                                                        )}
                                                    </FieldArray>
                                                </Col>
                                                
                                                <Col md={6} className="mb-4">
                                                    <FieldArray name="current_medications">
                                                        {arrayHelpers => renderArrayFields(
                                                            arrayHelpers, 
                                                            values, 
                                                            'current_medications', 
                                                            'Current Medications', 
                                                            faPills
                                                        )}
                                                    </FieldArray>
                                                </Col>
                                                
                                                <Col md={6} className="mb-4">
                                                    <FieldArray name="medical_conditions">
                                                        {arrayHelpers => renderArrayFields(
                                                            arrayHelpers, 
                                                            values, 
                                                            'medical_conditions', 
                                                            'Medical Conditions', 
                                                            faHeartbeat
                                                        )}
                                                    </FieldArray>
                                                </Col>
                                                
                                                <Col md={6} className="mb-4">
                                                    <FieldArray name="surgical_history">
                                                        {arrayHelpers => renderArrayFields(
                                                            arrayHelpers, 
                                                            values, 
                                                            'surgical_history', 
                                                            'Surgical History', 
                                                            faHistory
                                                        )}
                                                    </FieldArray>
                                                </Col>
                                                
                                                <Col md={12} className="mb-4">
                                                    <FieldArray name="family_medical_history">
                                                        {arrayHelpers => renderArrayFields(
                                                            arrayHelpers, 
                                                            values, 
                                                            'family_medical_history', 
                                                            'Family Medical History', 
                                                            faUserFriends
                                                        )}
                                                    </FieldArray>
                                                </Col>
                                            </Row>
                                            
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="form-check">
                                                    <input
                                                        type="checkbox"
                                                        className="form-check-input"
                                                        id="terms"
                                                        required
                                                    />
                                                    <label className="form-check-label small" htmlFor="terms">
                                                        I agree to the <a href="/terms" className="text-primary">Terms of Service</a> and <a href="/privacy" className="text-primary">Privacy Policy</a>
                                                    </label>
                                                </div>
                                                
                                                <Button
                                                    type="submit"
                                                    variant="primary"
                                                    className="px-4 py-2 d-flex align-items-center"
                                                    disabled={isSubmitting || loading}
                                                >
                                                    {isSubmitting || loading ? (
                                                        <>
                                                            <Spinner
                                                                as="span"
                                                                animation="border"
                                                                size="sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                                className="me-2"
                                                            />
                                                            Processing...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Start Consultation
                                                            <FontAwesomeIcon icon={faCheck} className="ms-2" />
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PatientIntakeForm;