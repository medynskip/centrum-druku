import React, { useState, useEffect } from "react";
import Link from "next/link";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const NavbarHeader = () => {
  const [scroll, setScroll] = useState(true);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      const scrollCheck = window.scrollY < 100;
      if (scrollCheck !== scroll) {
        setScroll(scrollCheck);
      }
    });
  });

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      className={scroll ? "top-nav" : "top-nav scrolled"}
    >
      <Container>
        <Navbar.Brand href="/">
          <img src="../../../../images/logo.png" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="justify-content-end"
        >
          <Nav>
            <Link href="/">
              <a className="nav-link">START</a>
            </Link>
            <Link href="/uslugi">
              <a className="nav-link">USŁUGI</a>
            </Link>
            <Link href="/druk">
              <a className="nav-link">DRUK</a>
            </Link>
            <Link href="/blog">
              <a className="nav-link">BLOG</a>
            </Link>
            <Link href="/kontakt">
              <a className="nav-link">KONTAKT</a>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarHeader;
