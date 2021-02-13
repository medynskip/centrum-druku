import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

const ValueNew = ({ addValue }) => {
  const [values, setValues] = useState({
    name: "",
    multiplier: 1,
  });

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addValue(values);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="row">
        <Form.Control
          name="name"
          placeholder="Podaj nową wartość"
          aria-label="Podaj nową wartość"
          aria-describedby="basic-addon2"
          onChange={handleChange}
          value={values.name}
          className="col-8"
        />
        <Form.Control
          name="multiplier"
          placeholder="Modyfikator"
          aria-label="Modyfikator"
          aria-describedby="basic-addon2"
          onChange={handleChange}
          value={values.multiplier}
          className="col-2"
        />
        <InputGroup.Append className="col-2">
          <Button type="submit" variant="outline-success">
            Dodaj
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default ValueNew;
