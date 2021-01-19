import { connect } from "react-redux";
import { updateClient, submitClient } from "../../redux/actions/clientActions";

import { useRouter } from "next/router";
import React, { useState } from "react";

import utils from "../../utils/utils";

import Layout from "../../components/layout";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";

const Zamowienie = ({ order }) => {
  if (order.submitting) {
    console.log(order);
    return (
      <Layout title="Przyjęcie nowego zamówienia">
        <Spinner> Loading</Spinner>
      </Layout>
    );
  }

  console.log(order);
  return (
    <Layout title="Przyjęcie nowego zamówienia">
      <h3>Zamówienie przyjęte na {order.product}</h3>
      <h3>Numer zamówienia to {order._id}</h3>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  order: { ...state.client },
});

const mapDispatchToProps = {
  updateClient: (order) => updateClient(order),
  submitClient: (order) => submitClient(order),
};

export default connect(mapStateToProps, mapDispatchToProps)(Zamowienie);
