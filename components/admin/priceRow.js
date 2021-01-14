import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faSave } from "@fortawesome/free-solid-svg-icons";

const PriceRow = ({ priceEntry, product, update }) => {
  const [editable, setEditable] = useState(false);

  const [value, setValue] = useState({
    amount: priceEntry.amount,
    price: priceEntry.price,
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const editThis = () => {
    setEditable((prev) => !prev);
    if (editable) {
      updatePrice();
    }
  };

  const updatePrice = () => {
    const i = product.prices.findIndex((x) => x._id == priceEntry._id);
    const newPrices = [...product.prices];
    newPrices[i] = { ...value };
    update(newPrices);
  };

  const deleteThis = () => {
    const newPrices = product.prices.filter(
      (each) => each._id != priceEntry._id
    );
    update(newPrices);
  };

  return (
    <tr className="row">
      <td>
        <Form.Control
          name="amount"
          value={value.amount}
          onChange={handleChange}
          disabled={!editable}
        />
      </td>
      <td>
        <Form.Control
          name="price"
          value={value.price}
          onChange={handleChange}
          disabled={!editable}
        />
      </td>
      <td>
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

export default PriceRow;
