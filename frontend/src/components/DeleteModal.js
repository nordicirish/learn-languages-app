import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import React from "react";
import { useState } from "react";
// pass translation object and deleteTranslation function as props
export default function DeleteModal({ translation, deleteTranslation }) {
  const [show, setShow] = useState(false);
  // functions handle state change
  const handleClose = () => setShow(false);
  // modalbecomes visible
  const handleShow = () => setShow(true);
  return (
    <>
      <a className="red-bin mr-2" onClick={handleShow}>
        <i
          className="far fa-trash-alt"
          style={{ fontSize: "18px", marginRight: "5px" }}
        ></i>
      </a>
      {/* use show state to show or hide the modal */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want to delete this item?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel delete
          </Button>
          <Button
            variant="primary"
            onClick={async (e) => {
              // calls the delete function passed as a prop from Translations.js
              //  via AdminTable.js to the modal
              await deleteTranslation(translation.id);
              //close the modal to prevent a loop
              handleClose();
            }}
          >
            Confirm delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
