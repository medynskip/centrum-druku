import LinkItem from "./link";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const NavbarHeader = () => {
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
            <LinkItem href="/zamowienie/wyszukaj">
              <a className="nav-link" alt="wyszukaj zamowienie">
                <FontAwesomeIcon icon={faSearch} />
              </a>
            </LinkItem>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarHeader;
