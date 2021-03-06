import Head from "next/head";

import { signIn, signOut, useSession } from "next-auth/client";

import AdminNavbar from "./adminNavbar";
import AdminSidebar from "./adminSidebar";

const Layout = ({ children }) => {
  const [session, loading] = useSession();
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap"
          rel="stylesheet"
        ></link>
        <title>Panel Administracyjny - Centrum Druku Online</title>
      </Head>
      <AdminNavbar />
      {!session && (
        <div className="signin-link">
          Not signed in <br />
          <button onClick={signIn}>Sign in</button>
        </div>
      )}
      {session && (
        <>
          <AdminSidebar />
          <div className="admin-content">{children}</div>
          {/* Signed in as {session.user.name} <br />
          <button onClick={signOut}>Sign out</button> */}
        </>
      )}
    </>
  );
};

export default Layout;
