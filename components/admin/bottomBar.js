import React, { useEffect, useState } from "react";

import Link from "next/link";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";

const BottomBar = ({ exit, handleSubmit, modified }) => {
  return (
    <Navbar fixed="bottom" bg="dark" expand="lg">
      <Container>
        <Link href={exit}>
          <a>
            <Button variant="warning">Wyjdz</Button>
          </a>
        </Link>
        <Button
          variant={modified ? "success" : "primary"}
          onClick={handleSubmit}
          disabled={modified ? false : true}
        >
          {modified ? "Zapisz" : "Aktualne"}
        </Button>
      </Container>
    </Navbar>
  );
};

export default BottomBar;
