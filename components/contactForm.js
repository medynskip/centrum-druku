//React
import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const ContactForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="exampleForm.ControlInput1">
        <Form.Label>Adres email</Form.Label>
        <Form.Control type="email" placeholder="twoj@email.pl" />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Temat zapytania</Form.Label>
        <Form.Control as="select">
          <option>Wycena realizacji</option>
          <option>Stała współpraca</option>
          <option>Analiza marki</option>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea1">
        <Form.Label>Twoja wiadomość</Form.Label>
        <Form.Control as="textarea" rows="3" />
      </Form.Group>
      <Button>Wyślij</Button>
    </Form>
  );
};

export default ContactForm;
