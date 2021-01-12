import Link from "next/link";

import { signIn, signOut, useSession } from "next-auth/client";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AdminNavbar = () => {
  const [session, loading] = useSession();
  return (
    <Navbar fixed="left" className="admin-nav">
      <Container>
        <Navbar.Brand href="/admin-panel/">
          CentrumDruku Admin Panel
        </Navbar.Brand>
        {/* <Nav className="mr-auto"> */}
        {session && (
          <Navbar.Collapse className="justify-content-end">
            <Link href="/admin-panel/produkty">
              <a>PRODUKTY</a>
            </Link>
            <Link href="/admin-panel/zamowienia">
              <a>ZAMÓWIENIA</a>
            </Link>
            <Link href="/admin-panel/blog">
              <a>BLOG</a>
            </Link>
            Witaj {session.user.name}
            <button onClick={signOut}>Sign out</button>
          </Navbar.Collapse>
        )}

        {/* </Nav> */}
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
