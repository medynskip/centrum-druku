import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const PriceNew = ({ update }) => {
  const [value, setValue] = useState({
    amount: 0,
    price: 0,
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    update(value);
    setValue({
      amount: 0,
      price: 0,
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="row">
        <Form.Control
          name="amount"
          placeholder="Wprowadź ilość"
          aria-label="Wprowadź ilość"
          aria-describedby="basic-addon2"
          onChange={handleChange}
          value={value.amount}
        />
        <Form.Control
          name="price"
          placeholder="Wprowadź cenę"
          aria-label="Wprowadź cenę"
          aria-describedby="basic-addon2"
          onChange={handleChange}
          value={value.price}
        />
        <InputGroup.Append>
          <Button type="submit" variant="outline-success">
            Dodaj
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  );
};

export default PriceNew;
