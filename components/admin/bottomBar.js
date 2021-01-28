import React, { useEffect, useState } from "react";

import Link from "next/link";

import { useRouter } from "next/router";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";

const BottomBar = ({ exit, handleSubmit, modified }) => {
  const router = useRouter();

  const handleClick = () => {
    if (modified) {
      confirm("Masz niezapisane zmiany. Czy chcesz je porzucić?")
        ? router.push(exit)
        : null;
    } else {
      router.push(exit);
    }
  };

  return (
    <Navbar fixed="bottom" bg="dark" expand="lg">
      <Container>
        {/* <Link href={exit}>
          <a> */}
        <Button onClick={handleClick} variant="warning">
          Wyjdz
        </Button>
        {/* </a>
        </Link> */}
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
