// import Link from "next/link";
import LinkItem from "./../link";

import { signIn, signOut, useSession } from "next-auth/client";

const AdminNavbar = () => {
  const [session, loading] = useSession();
  return (
    <div className="sidebar">
      <LinkItem href="/admin-panel">
        <a>START</a>
      </LinkItem>
      <LinkItem href="/admin-panel/produkty">
        <a>PRODUKTY</a>
      </LinkItem>
      <LinkItem href="/admin-panel/zamowienia">
        <a>ZAMÓWIENIA</a>
      </LinkItem>
      <LinkItem href="/admin-panel/blog">
        <a>BLOG</a>
      </LinkItem>
    </div>
  );
};

export default AdminNavbar;
