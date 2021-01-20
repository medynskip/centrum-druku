import { connect } from "react-redux";
import { updateClient, submitClient } from "../../redux/actions/clientActions";

import { useRouter } from "next/router";
import React, { useState } from "react";

import Link from "next/link";

import utils from "../../utils/utils";

import Layout from "../../components/layout";
import OrderDetails from "../../components/orderDetails";

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
        <Spinner animation="border" />
      </Layout>
    );
  }

  return (
    <Layout title="Przyjęcie nowego zamówienia">
      <Container>
        <h3>Gratulacje! Zamówienie zostało przyjęte.</h3>
        <div className="content-box">
          <h4>Numer Twojego zamówienia to {order._id}</h4>
          <OrderDetails order={order} />
        </div>
        <h3>Co dalej?</h3>
        <Row noGutters xs={1} md={2} lg={3}>
          <Col>
            <Link href="/">
              <a>
                <div className="service-card">
                  <img src="/images/payment.svg" /> <br />
                  <h4>Opłać zamówienie</h4>
                  <p>
                    Ipsum consectetur irure eiusmod velit deserunt eiusmod enim
                    nisi.
                  </p>
                </div>
              </a>
            </Link>
          </Col>

          <Col>
            <Link href="/">
              <a>
                <div className="service-card">
                  <img src="/images/upload.svg" /> <br />
                  <h4>Wgraj pliki do wydruku</h4>
                  <p>
                    Id nostrud commodo voluptate incididunt ex elit tempor
                    deserunt nostrud.
                  </p>
                </div>
              </a>
            </Link>
          </Col>
          <Col>
            <Link href="/">
              <a>
                <div className="service-card">
                  <img src="/images/configure.svg" /> <br />
                  <h4>Sprawdź szczegóły zamówienia</h4>
                  <p>
                    Exercitation ex anim sint mollit proident consequat
                    consequat ex.
                  </p>
                </div>
              </a>
            </Link>
          </Col>
        </Row>
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

export default connect(mapStateToProps, mapDispatchToProps)(Zamowienie);
