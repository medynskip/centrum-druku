import { useRouter } from "next/router";
import { useState } from "react";

import AdminLayout from "./../../../components/admin/adminLayout";
import OrderRow from "./../../../components/admin/orderRow";
import BottomBar from "./../../../components/admin/bottomBar";

import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

const Configuration = ({ initialConfiguration }) => {
  // const router = useRouter();
  console.log(initialConfiguration);
  const [config, setConfig] = useState({
    _id: "",
    companyName: "",
    street: "",
    city: "",
    postal: "",
    email: "",
    phone: "",
    mobile: "",
    lastInvoice: {
      id: 1,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
    lastTempInvoice: {
      id: 1,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
    },
    modified: false,
    ...initialConfiguration[0],
  });

  const handleChange = (e) => {
    setConfig({
      ...config,
      modified: true,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/configuration/set`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(config),
    })
      .then((res) => res.json())
      .then((data) => {
        setConfig({
          ...data,
          modified: false,
        });
      });
  };

  return (
    <AdminLayout>
      <Container>
        <h3>Konfiguracja globalna</h3>
        <InputGroup className="my-2">
          <InputGroup.Prepend>
            <InputGroup.Text>Identyfikator</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl value={config._id} disabled />
        </InputGroup>
        <InputGroup className="my-2">
          <InputGroup.Prepend>
            <InputGroup.Text>Nazwa firmy</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="companyName"
            value={config.companyName}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="my-2">
          <InputGroup.Prepend>
            <InputGroup.Text>Ulica</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="street"
            value={config.street}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text>Miasto / kod </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="city"
            value={config.city}
            placeholder="Miasto"
            onChange={handleChange}
          />
          <FormControl
            name="postal"
            value={config.postal}
            placeholder="Kod"
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="my-2">
          <InputGroup.Prepend>
            <InputGroup.Text>Email</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="email"
            value={config.email}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="my-2">
          <InputGroup.Prepend>
            <InputGroup.Text>Telefon 1</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="phone"
            value={config.phone}
            onChange={handleChange}
          />
        </InputGroup>
        <InputGroup className="my-2">
          <InputGroup.Prepend>
            <InputGroup.Text>Telefon 2</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="mobile"
            value={config.mobile}
            onChange={handleChange}
          />
        </InputGroup>
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Ostatnia faktura VAT </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl value={config.lastInvoice.id} disabled />
              <FormControl value={config.lastInvoice.month} disabled />
              <FormControl value={config.lastInvoice.year} disabled />
            </InputGroup>
          </Col>
          <Col>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Ostatnia faktura PRO-FORMA </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl value={config.lastTempInvoice.id} disabled />
              <FormControl value={config.lastTempInvoice.month} disabled />
              <FormControl value={config.lastTempInvoice.year} disabled />
            </InputGroup>
          </Col>
        </Row>
        <BottomBar
          exit="/admin-panel/konfiguracja"
          handleSubmit={handleSubmit}
          modified={config.modified}
        />
      </Container>
    </AdminLayout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/configuration/get`
  );
  const initialConfiguration = await res.json();

  return { props: { initialConfiguration } };
}

export default Configuration;
