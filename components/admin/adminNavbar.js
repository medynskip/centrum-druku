import { signOut, useSession } from "next-auth/client";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const AdminNavbar = () => {
  const [session, loading] = useSession();
  return (
    <Navbar fixed="left" className="admin-nav">
      <Container>
        <Navbar.Brand href="/admin-panel/">
          CentrumDruku Admin Panel
        </Navbar.Brand>
        {session && (
          <Navbar.Collapse className="justify-content-end">
            Witaj {session.user.name}
            <button onClick={signOut}>Sign out</button>
          </Navbar.Collapse>
        )}
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
