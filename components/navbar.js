import React, { useState, useEffect } from "react";
// import Link from "next/link";
import LinkItem from "./link";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";

const NavbarHeader = () => {
  // const [scroll, setScroll] = useState(true);

  // useEffect(() => {
  //   document.addEventListener("scroll", () => {
  //     const scrollCheck = window.scrollY < 100;
  //     if (scrollCheck !== scroll) {
  //       setScroll(scrollCheck);
  //     }
  //   });
  // });

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      fixed="top"
      className="top-nav scrolled"
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
            {/* <Link href="/">
              <a className="nav-link">START</a>
            </Link> */}
            <LinkItem href="/produkty">
              <a className="nav-link">PRODUKTY</a>
            </LinkItem>
            <LinkItem href="/uslugi">
              <a className="nav-link">USŁUGI</a>
            </LinkItem>
            <LinkItem href="/blog">
              <a className="nav-link">BLOG</a>
            </LinkItem>
            <LinkItem href="/kontakt">
              <a className="nav-link">KONTAKT</a>
            </LinkItem>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarHeader;
