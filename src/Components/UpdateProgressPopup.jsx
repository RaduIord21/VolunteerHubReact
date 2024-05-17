import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import api from '../Hooks/api';

const UpdateProgressPopup = ({ endpoint, title, instructions, label, show, handleClose }) => {
  const [value, setValue] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(endpoint, { 'progress': value }).then(
        e => setValue('')
      );
      handleClose();
    } catch (error) {
      console.error('Error sending value:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{instructions}</p>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formValue">
            <Form.Label>{label}</Form.Label>
            <Form.Control
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
    </Modal>
  );
};

export default UpdateProgressPopup;
