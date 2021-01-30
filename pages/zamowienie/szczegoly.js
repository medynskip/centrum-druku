import { connect } from "react-redux";
import { updateClient, submitClient } from "../../redux/actions/clientActions";

import { useRouter } from "next/router";
import React, { useState } from "react";

import Link from "next/link";
import Image from "next/image";

import utils from "../../utils/utils";

import Layout from "../../components/layout";
import ClientDetails from "../../components/clientDetails";
import OrderDetails from "../../components/orderDetails";
import NoOrder from "../../components/noOrder";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Badge from "react-bootstrap/Badge";
import ContentBox from "../../components/contentBox";

const Szczegoly = ({ order, updateClient, products, pages }) => {
  const router = useRouter();

  const [key, setKey] = useState(router.query.tab);
  const [files, setFiles] = useState([]);
  const [unique, setUnique] = useState("");

  const handleChange = (e) => {
    setUnique(e.target.value);
  };

  const handleFile = (e) => {
    setFiles(e.target.files);
    console.log(files);
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
        <div className="content-box">
          <h4>Numer Twojego zamówienia </h4>
          <div className="order-number">{order._id}</div>
        </div>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="szczegoly" title="Szczegóły">
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
                      <span>{el.comment}</span>)
                    </li>
                  );
                })}
              </ul>
            </ContentBox>
          </Tab>
          <Tab eventKey="pliki" title="Pliki">
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
                <div>nie ma plikow</div>
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
          <Tab eventKey="platnosc" title="Płatność">
            <ContentBox title="Szczegóły płatności">
              Dane np data płatości, sposób płatności, kwoty
            </ContentBox>
            <ContentBox title="Opłać zamówienie">
              <input value={unique} onChange={handleChange}></input>
              <Button onClick={startPayment}>Opłać w systemie PayU</Button>
              Opcja płatnościi jeśli jeszcze nie opłacone
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
