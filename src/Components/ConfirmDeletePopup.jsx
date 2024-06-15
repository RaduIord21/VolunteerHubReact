import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDeletePopup = ({ title, instructions, show, handleClose, handleOk }) => {

  return (
    <Modal show={show} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="text-center" dangerouslySetInnerHTML={{ __html: instructions}}></p>
      </Modal.Body>
      <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Renunta
          </Button>
          <Button variant="primary" onClick={handleOk}>
            Confirma
          </Button>
        </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeletePopup;
