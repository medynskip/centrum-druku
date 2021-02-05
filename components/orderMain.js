import { connect } from "react-redux";
import {
  updateClient,
  submitClient,
  cancelClient,
  getClient,
} from "./../redux/actions/clientActions";

import { useRouter } from "next/router";
import React, { useState } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

import ContentBox from "./contentBox";
import TabDetails from "./tabDetails";
import TabPayment from "./tabPayment";
import TabFiles from "./tabFiles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faFileInvoice,
  faMoneyBillAlt,
  faSyncAlt,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const OrderMain = ({ order, cancel, refresh, updateClient }) => {
  const router = useRouter();
  const [key, setKey] = useState(router.query.tab);
  return (
    <Container>
      <Row>
        <Col md={12} lg={6}>
          <ContentBox title="Numer zamówienia">
            <div className="order-number">{order._id}</div>
          </ContentBox>
        </Col>
        <Col md={12} lg={6}>
          <ContentBox title="Dostępne akcje">
            <Button onClick={refresh} variant="primary">
              <FontAwesomeIcon icon={faSyncAlt} />
              Odśwież
            </Button>
            <Button
              onClick={cancel}
              variant="danger"
              disabled={order.status == "Anulowane" ? true : false}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
              {order.status == "Anulowane"
                ? "Zamówienie anulowane"
                : "Anuluj zamówienie"}
            </Button>
          </ContentBox>
        </Col>
      </Row>
      <Tabs id="order-tabs" activeKey={key} onSelect={(k) => setKey(k)}>
        <Tab
          eventKey="szczegoly"
          title={
            <span>
              <FontAwesomeIcon icon={faFileInvoice} />
              Szczegóły
            </span>
          }
        >
          <TabDetails order={order} />
        </Tab>
        <Tab
          eventKey="pliki"
          title={
            <span>
              <FontAwesomeIcon icon={faFileImage} />
              Pliki
            </span>
          }
          disabled={order.status == "Anulowane" ? true : false}
        >
          <TabFiles order={order} updateClient={updateClient} />
        </Tab>
        <Tab
          eventKey="platnosc"
          title={
            <span>
              <FontAwesomeIcon icon={faMoneyBillAlt} />
              Płatność
            </span>
          }
          disabled={order.status == "Anulowane" ? true : false}
        >
          <TabPayment order={order} updateClient={updateClient} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default OrderMain;
