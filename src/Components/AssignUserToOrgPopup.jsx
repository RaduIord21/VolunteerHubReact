import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

const AssignUserToOrgPopup = ({currentUser, users, show, handleClose, onUserSelect}) => {
    const [selectedUser, setSelectedUser] = useState('');

    const handleChange = (event) => {
        const selectedUserId = event.target.value;
        setSelectedUser(selectedUserId);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        onUserSelect(selectedUser);
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Selectare coordonator nou</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Voluntarul selectat din lista va deveni noul coordonator al organizatiei</p>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="userSelect">
                        <Form.Label>Membri</Form.Label>
                        <Form.Control as="select" value={selectedUser} onChange={handleChange}>
                            <option value="" disabled>Selecteaza..</option>
                            {users.filter((user) => user.userName !== currentUser).map((user) => (
                                <option key={user.userName} value={user.userName}>
                                    {user.userName}
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
