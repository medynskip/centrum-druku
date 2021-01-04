import React, { useEffect, useState } from "react";

import Parameters from "./parameters";
import Prices from "./prices";
import Summary from "./summary";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import Link from "next/link";

function ProductColumns({ product }) {
  const [order, setOrder] = useState({
    name: product.name,
    parameters: [],
    amount: product.prices.length > 0 ? product.prices[0].amount : 0,
    multiplier: 1,
    price: product.prices.length > 0 ? product.prices[0].price : 0,
  });

  const sendToStore = (params) => {
    setOrder({
      ...order,
      ...params,
    });
  };
  const priceToStore = (params) => {
    setOrder({
      ...order,
      ...params,
    });
  };

  return (
    <Row noGutters xs={1} md={1} lg={3}>
      <Col>
        {product.parameters.length > 0 ? (
          <Parameters
            parameters={product.parameters}
            sendToStore={sendToStore}
          />
        ) : null}
      </Col>
      <Col>
        {product.prices.length > 0 ? (
          <Prices
            prices={product.prices}
            multiplier={order.multiplier}
            priceToStore={priceToStore}
          />
        ) : null}
      </Col>
      <Col>{product.prices.length > 0 ? <Summary order={order} /> : null}</Col>
    </Row>
  );
}

export default ProductColumns;
