import React, { useState, useEffect } from "react";

import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";

const ValueRow = ({ el, deleteValue, updateValue }) => {
  const [values, setValues] = useState({
    name: el.name,
    multiplier: el.multiplier,
  });
  const [editable, setEditable] = useState(false);
  const [icon, setIcon] = useState("edit");

  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const editThis = () => {
    setEditable((prev) => !prev);
    if (editable) {
      updateValue(values, el._id);
      //   Send changes
    }
  };

  const deleteThis = () => {
    deleteValue(el._id);
  };

  return (
    <tr className="row">
      <td className="col-8">
        <Form.Control
          name="name"
          value={values.name}
          onChange={handleChange}
          disabled={!editable}
        />
      </td>
      <td className="col-2">
        <Form.Control
          name="multiplier"
          value={values.multiplier}
          onChange={handleChange}
          disabled={!editable}
        />
      </td>
      <td className="col-2">
        <Button
          onClick={editThis}
          variant={editable ? "success" : "primary"}
          size="sm"
        >
          {/* <FontAwesomeIcon icon={icon} /> */}
        </Button>
        <Button onClick={deleteThis} variant="danger" size="sm">
          {/* <FontAwesomeIcon icon="trash-alt" /> */}
        </Button>
      </td>
    </tr>
  );
};

export default ValueRow;
