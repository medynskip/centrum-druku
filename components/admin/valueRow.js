import React, { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faSave } from "@fortawesome/free-solid-svg-icons";

const ValueRow = ({ el, deleteValue, updateValue }) => {
  const [values, setValues] = useState({
    name: el.name,
    multiplier: el.multiplier,
  });
  const [editable, setEditable] = useState(false);

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
          <FontAwesomeIcon icon={editable ? faSave : faEdit} />
        </Button>
        <Button onClick={deleteThis} variant="danger" size="sm">
          <FontAwesomeIcon icon={faTrashAlt} />
        </Button>
      </td>
    </tr>
  );
};

export default ValueRow;
