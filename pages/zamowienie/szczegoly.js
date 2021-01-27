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
import ContentBox from "../../components/contentBox";

const Szczegoly = ({ order, updateClient }) => {
  const router = useRouter();

  const [key, setKey] = useState(router.query.tab);
  const [files, setFiles] = useState([]);

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

    console.log("kilko");
  };

  if (!order._id) {
    return <NoOrder />;
  }

  return (
    <Layout title="Szczegóły zamówienia">
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
          </Tab>
          <Tab eventKey="pliki" title="Pliki">
            <ContentBox title="Pliki do zamówienia">
              {order.files.length > 0 ? (
                order.files.map((el, i) => {
                  return (
                    <div className="image-miniature">
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

export default connect(mapStateToProps, mapDispatchToProps)(Szczegoly);
