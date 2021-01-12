import React, { useEffect, useState } from "react";

import Parameters from "./parameters";
import Prices from "./prices";
import Summary from "./summary";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { connect } from "react-redux";
import { updateOrder } from "../redux/actions/orderActions";

function ProductColumns({ product, order, updateOrder }) {
  useEffect(() => {
    updateOrder({
      name: product.name,
      amount: product.prices.length > 0 ? product.prices[0].amount : 0,
      duration: product.prices.length > 0 ? product.duration : 0,
      price: product.prices.length > 0 ? product.prices[0].price : 0,
    });
  }, [product]);

  const sendToStore = (params) => {
    updateOrder(params);
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
  order: { ...state.order },
});

const mapDispatchToProps = {
  updateOrder: (order) => updateOrder(order),
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductColumns);
