import { connect } from "react-redux";
import { updateClient, submitClient } from "../../redux/actions/clientActions";

import { useRouter } from "next/router";
import React, { useState } from "react";

import Image from "next/image";

import utils from "../../utils/utils";

import Layout from "../../components/layout";
import NoOrder from "../../components/noOrder";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

import ContentBox from "../../components/contentBox";
import TabDetails from "../../components/tabDetails";
import TabPayment from "../../components/tabPayment";
import TabFiles from "../../components/tabFiles";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faFileInvoice,
  faMoneyBillAlt,
} from "@fortawesome/free-solid-svg-icons";

const Szczegoly = ({ order, updateClient, products, pages }) => {
  const router = useRouter();
  const [key, setKey] = useState(router.query.tab);

  const getOrderdata = (id, email) => {
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/order/get/${id}/${email}`)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson._id) {
          console.log("zaktualizowano");
          updateClient(resJson);
        } else {
          console.log("email i numer id niezgodne");
        }
      });
  };

  const refresh = () => {
    getOrderdata(order._id, order.client.email);
  };

  const cancel = () => {
    console.log("canceled");
  };

  if (!order._id) {
    if (router.query.id && router.query.email) {
      getOrderdata(router.query.id, router.query.email);
    } else {
      return <NoOrder products={products} pages={pages} />;
    }
  }

  return (
    <Layout title="Szczegóły zamówienia" products={products} pages={pages}>
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
                Odśwież
              </Button>
              <Button onClick={cancel} variant="danger">
                Anuluj zamówienie
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
          >
            <TabPayment order={order} />
          </Tab>
        </Tabs>
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

export async function getStaticProps() {
  const productsQuery = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/product/get/active`
  );
  const products = await productsQuery.json();

  const pagesQuery = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/page/get/active`
  );
  const pages = await pagesQuery.json();

  return {
    props: {
      products,
      pages,
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Szczegoly);
