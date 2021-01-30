import { connect } from "react-redux";
import { updateClient, submitClient } from "../../redux/actions/clientActions";

import { useRouter } from "next/router";
import React, { useState } from "react";

import Image from "next/image";

import utils from "../../utils/utils";

import Layout from "../../components/layout";
import ClientDetails from "../../components/clientDetails";
import OrderDetails from "../../components/orderDetails";
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

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faFileInvoice,
  faMoneyBillAlt,
} from "@fortawesome/free-solid-svg-icons";

const Szczegoly = ({ order, updateClient, products, pages }) => {
  const router = useRouter();

  const [key, setKey] = useState(router.query.tab);
  const [files, setFiles] = useState([]);

  const handleFile = (e) => {
    setFiles(e.target.files);
    console.log(files);
  };

  const paymentTranslate = () => {
    switch (order.payment) {
      case "NEW":
        return "Niezdefiniowana";
      case "PENDING":
        return "Oczekująca";
      case "CANCELED":
        return "Anulowana";
      case "COMPLETED":
        return "Opłacone";
    }
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("order", order._id);
    for (var x = 0; x < files.length; x++) {
      formData.append("file", files[x]);
    }
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/order/update/files`, {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((res) => {
        updateClient(res);
      });
  };

  const startPayment = () => {
    const query = {
      notifyUrl: `${process.env.NEXT_PUBLIC_API_LINK}/payment/test`,
      customerIp: "127.0.0.1",
      merchantPosId: "402972",
      description: "Centrum Druku",
      currencyCode: "PLN",
      totalAmount: `${order.value * 123}`,
      extOrderId: order._id,
      continueUrl: `${process.env.NEXT_PUBLIC_SELF}/zamowienie/szczegoly?id=${order._id}&email=${order.client.email}`,
      buyer: {
        email: order.client.email,
        phone: order.client.phone,
        firstName: order.client.firstName,
        lastName: order.client.lastName,
        language: "pl",
      },
      products: [
        {
          name: `${order.product} - ${order.volume} sztuk`,
          unitPrice: `${order.value * 123}`,
          quantity: "1",
        },
      ],
    };

    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/payment/create`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(query),
    })
      .then((res) => res.json())
      .then((data) => {
        router.push(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (!order._id) {
    if (router.query.id && router.query.email) {
      fetch(
        `${process.env.NEXT_PUBLIC_API_LINK}/order/get/${router.query.id}/${router.query.email}`
      )
        .then((res) => res.json())
        .then((resJson) => {
          if (resJson._id) {
            updateClient(resJson);
          } else {
            console.log("email i numer id niezgodne");
          }
        });
    }

    return <NoOrder products={products} pages={pages} />;
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
              <Button variant="primary">Odśwież</Button>
              <Button variant="danger">Anuluj zamówienie</Button>
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
            <Row>
              <Col md={12} lg={4}>
                <ContentBox title="Status zamówienia">
                  <div className="main-order-details">
                    <strong>Zamówienie:</strong>
                    {order.status}
                  </div>
                  <div className="main-order-details">
                    <strong>Płatność:</strong>
                    {paymentTranslate(order.payment)}
                  </div>
                </ContentBox>
              </Col>
              <Col md={12} lg={8}>
                <ContentBox title="Terminy">
                  <div className="main-order-details">
                    <strong>Zamówione złożone:</strong>{" "}
                    {utils.dateNormalize(order.placed)}
                  </div>
                  <div className="main-order-details">
                    <strong>Przewidywany termin realizacji:</strong>{" "}
                    {order.duration} dni robocze
                  </div>
                </ContentBox>
              </Col>
            </Row>
            <OrderDetails order={order} />
            <ClientDetails client={order.client} />
            <ContentBox title="Komentarze i historia">
              <ul>
                {order.history.map((el, i) => {
                  return (
                    <li key={i}>
                      <Badge variant="primary">
                        {utils.dateNormalize(el.date)}
                      </Badge>{" "}
                      <span>{el.comment}</span>
                    </li>
                  );
                })}
              </ul>
            </ContentBox>
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
            <ContentBox title="Pliki do zamówienia">
              {order.files.length > 0 ? (
                order.files.map((el, i) => {
                  return (
                    <div key={i} className="image-miniature">
                      <Image
                        // layout="fill"
                        width={150}
                        height={100}
                        key={i}
                        src={`${process.env.NEXT_PUBLIC_API_LINK}/public/orders${el}`}
                      />
                    </div>
                  );
                })
              ) : (
                <div>
                  Brak plików. Wgraj pliki do wydruku korzystając z poniższego
                  formularza.
                </div>
              )}
            </ContentBox>
            <ContentBox title="Wgraj pliki">
              <Form>
                <Form.Group className="form-group files">
                  <Form.Control
                    type="file"
                    onChange={handleFile}
                    className="form-control"
                    multiple
                  />
                </Form.Group>
                <Button
                  onClick={handleSubmit}
                  disabled={files.length > 0 ? false : true}
                >
                  Wyślij pliki
                </Button>
              </Form>
            </ContentBox>
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
            <ContentBox title="Szczegóły płatności">
              Dane np data płatości, sposób płatności, kwoty
            </ContentBox>
            <ContentBox title="Opłać zamówienie">
              <Button onClick={startPayment}>Opłać w systemie PayU</Button>
            </ContentBox>
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
