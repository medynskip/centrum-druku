import React, { useState, useEffect } from "react";

import Spinner from "react-bootstrap/Spinner";

import Layout from "./layout";

const Loading = ({ products, pages }) => {
  return (
    <Layout title="Wczytuję" products={products} pages={pages}>
      <div className="spinner-fullscreen">
        <Spinner animation="border" role="status">
          <span className="sr-only">Wczytuję...</span>
        </Spinner>
      </div>
    </Layout>
  );
};

export default Loading;
