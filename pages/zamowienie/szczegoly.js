import { connect } from "react-redux";
import { updateClient, submitClient } from "../../redux/actions/clientActions";

import { useRouter } from "next/router";
import React, { useState } from "react";

import Link from "next/link";

import utils from "../../utils/utils";

import Layout from "../../components/layout";
import ClientDetails from "../../components/ClientDetails";
import OrderDetails from "../../components/OrderDetails";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import NoOrder from "../../components/noOrder";

const Szczegoly = ({ order }) => {
  const router = useRouter();

  if (!order._id) {
    return <NoOrder />;
  }

  return (
    <Layout title="Wyszukaj zamowienie">
      <Container>
        <div className="content-box">
          <h4>Numer Twojego zamówienia </h4>
          <div className="order-number">{order._id}</div>
        </div>
        <OrderDetails order={order} />
        <ClientDetails client={order.client} />
      </Container>
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

export default connect(mapStateToProps, mapDispatchToProps)(Szczegoly);
