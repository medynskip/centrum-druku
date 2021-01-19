import React, { useEffect, useState } from "react";

import Parameters from "./parameters";
import Prices from "./prices";
import Summary from "./summary";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { connect } from "react-redux";
import { updateClient, clearClient } from "../redux/actions/clientActions";

function ProductColumns({ product, order, updateClient, clearClient }) {
  useEffect(() => {
    clearClient();
    updateClient({
      product: product.name,
      volume: product.prices.length > 0 ? product.prices[0].amount : 0,
      duration: product.prices.length > 0 ? product.duration : 0,
      price: product.prices.length > 0 ? product.prices[0].price : 0,
      value: product.prices.length > 0 ? product.prices[0].price : 0,
    });
  }, [product]);

  const sendToStore = (params) => {
    updateClient(params);
  };

  if (product.parameters.length < 1) return <div>Produkt niedostępny</div>;

  return (
    <Row noGutters xs={1} md={1} lg={3}>
      <Col>
        <Parameters parameters={product.parameters} sendToStore={sendToStore} />
      </Col>
      <Col>
        <Prices
          prices={product.prices}
          multiplier={order.multiplier}
          priceToStore={sendToStore}
        />
      </Col>
      <Col>
        <Summary order={order} />
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  order: { ...state.client },
});

const mapDispatchToProps = {
  updateClient: (order) => updateClient(order),
  clearClient: () => clearClient(),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductColumns);
