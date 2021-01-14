import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoffee,
  faEdit,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const ParameterHeader = ({ name, deleteParameter }) => {
  return (
    <>
      <h3>{name}</h3>
      <Button variant="primary" size="sm">
        <FontAwesomeIcon icon={faEdit} />
      </Button>
      <Button onClick={deleteParameter} variant="danger" size="sm">
        <FontAwesomeIcon icon={faTrashAlt} />
      </Button>
    </>
  );
};

export default ParameterHeader;
