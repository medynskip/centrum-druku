import React from "react";
import { csrfToken } from "next-auth/client";
import AdminLayout from "./../../components/admin/adminLayout";
import AdminNavbar from "./../../components/admin/adminNavbar";

export default function SignIn({ csrfToken }) {
  return (
    <>
      <AdminNavbar />
      <div className="signin">
        <form method="post" action="/api/auth/callback/credentials">
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <label>
            Użytkownik
            <br />
            <input name="username" type="text" />
          </label>
          <label>
            Hasło
            <br />
            <input name="password" type="password" />
          </label>
          <button type="submit">Sign in</button>
        </form>
      </div>
    </>
  );
}

SignIn.getInitialProps = async (context) => {
  return {
    csrfToken: await csrfToken(context),
  };
};
