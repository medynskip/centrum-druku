import React, { useState, useEffect } from "react";

import Button from "react-bootstrap/Button";

const ParameterHeader = ({ name, deleteParameter }) => {
  return (
    <>
      <h3>{name}</h3>
      <Button variant="primary" size="sm">
        {/* <FontAwesomeIcon icon="edit" /> */}
      </Button>
      <Button onClick={deleteParameter} variant="danger" size="sm">
        {/* <FontAwesomeIcon icon="trash-alt" /> */}
      </Button>
    </>
  );
};

export default ParameterHeader;
