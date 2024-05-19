import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

const AssignUserToOrgPopup = ({show, organizations,  handleClose, onOrganizationSelect}) => {
    const [selectedOrganization, setSelectedOrganization] = useState('');

    const handleChange = (event) => {
        const selectedId = event.target.value;
        setSelectedOrganization(selectedId);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        onOrganizationSelect(selectedOrganization);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Selectare organizatie</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Utilizatorul va fi adaugat organizatiei selectate, ca voluntar</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="userSelect">
                        <Form.Label>Organizatii</Form.Label>
                        <Form.Control as="select" value={selectedOrganization} onChange={handleChange}>
                            <option value="" disabled>Selecteaza..</option>
                            {organizations.map((organization) => (
                                <option key={organization.id} value={organization.id}>
                                    {organization.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Renunta
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Salveaza
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AssignUserToOrgPopup;
