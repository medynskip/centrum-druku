import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ManagerController from "./managerController";

const ImageSelector = ({ show, setShow, setFilePath }) => {
  const handleClose = () => setShow(false);
  const [selected, setSelected] = useState("none");

  const handleSelected = (item) => {
    setSelected(item);
  };

  const handleSubmit = (e) => {
    setFilePath(selected);
    handleClose();
  };

  return (
    <>
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Wybierz obraz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ManagerController handleSelected={handleSelected} />
        </Modal.Body>
        <Modal.Footer>
          <h5>Selected: {selected}</h5>
          <Button variant="secondary" onClick={handleClose}>
            Anuluj
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Potwierdz
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ImageSelector;
