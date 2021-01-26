import { useRouter } from "next/router";
import React, { useState } from "react";

import Link from "next/link";

import Layout from "./layout";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const NoOrder = () => {
  return (
    <Layout title="Wyszukaj zamówienie">
      <div className="find-order">
        <Alert variant="danger">
          Brak zamówienia
          <hr />
          <div className="d-flex justify-content-end">
            <Link href="/zamowienie/wyszukaj/">
              <a>
                <Button variant="success">Wyszukaj zamówienie ponownie</Button>
              </a>
            </Link>
          </div>
        </Alert>
      </div>
    </Layout>
  );
};

export default NoOrder;
