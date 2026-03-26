// components/CustomModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";

const CustomModal = ({ show, onHide, title, children, footer }) => {
  return (
    <Modal
      show={show}
      size="lg"
      className="document-modal"
      onHide={onHide}
      centered
    >
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>{children}</Modal.Body>

      {footer && <Modal.Footer>{footer}</Modal.Footer>}
    </Modal>
  );
};

export default CustomModal;
