import React, { useEffect, useState } from "react";

import Parameters from "./parameters";
import Prices from "./prices";
import Summary from "./summary";

import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Col from "react-bootstrap/Col";

import { connect } from "react-redux";
import { updateClient, clearClient } from "../redux/actions/clientActions";

function ProductColumns({ product, order, updateClient, clearClient }) {
  useEffect(() => {
    const x = [];
    const y = [];
    product.parameters.map((el, i) => {
      x.push({
        name: el.fieldName,
        value: el.fieldValues[0].name,
      });
      y.push(el.fieldValues[0].multiplier);
    });

    console.log("to jest use effect");
    clearClient();
    updateClient({
      product: product.name,
      volume: product.prices[0].amount,
      duration: product.duration,
      price: product.prices[0].price,
      value: order.price * order.multiplier,
      parameters: [...x],
      multiplier: y.reduce((a, b) => a * b),
      // volume: product.prices.length > 0 ? product.volume : 0,
      // duration: product.prices.length > 0 ? product.duration : 0,
      // price: product.prices.length > 0 ? product.prices[0].price : 0,
      // value: product.prices.length > 0 ? product.prices[0].price : 0,
    });
  }, []);

  const sendToStore = (params) => {
    console.log("Params:", params);
    updateClient({
      ...params,
    });
  };

  if (product.parameters.length < 1) return <div>Produkt niedostępny</div>;

  return (
    <Row noGutters xs={1} md={1} lg={3}>
      {/* {console.log("columns", order)} */}
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
        <Summary order={order} sendToStore={sendToStore} />
      </Col>
    </Row>
  );
}

const mapStateToProps = (state) => ({
  order: { ...state.client },
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateClient: (order) => dispatch(updateClient(order)),
    clearClient: () => dispatch(clearClient()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductColumns);
