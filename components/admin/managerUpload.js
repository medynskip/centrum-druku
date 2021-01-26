import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ManagerUpload = ({ show, setShow, path, uploadFiles }) => {
  const [files, setFiles] = useState(null);
  const handleClose = () => setShow(false);

  const handleFile = (e) => {
    setFiles(e.target.files);
    console.log(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files) {
      const fullOrder = {
        destination: path,
      };
      const formData = new FormData();
      formData.append("order", JSON.stringify(fullOrder));
      for (var x = 0; x < files.length; x++) {
        formData.append("file", files[x]);
      }
      uploadFiles(formData);
      setShow(false);
    } else {
      console.log("Brak plikow");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dodaj pliki do bierzącego folderu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.File id="formcheck-api-regular">
              <Form.File.Label>Dodaj pliki</Form.File.Label>
              <Form.File.Input onChange={handleFile} multiple />
            </Form.File>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Anuluj
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Dodaj pliki
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManagerUpload;
