import React, { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Navbar from "react-bootstrap/Navbar";

const OrderForm = ({ order, sendToStore }) => {
  const router = useRouter();

  const [status, setStatus] = useState({
    status: order.status,
    payment: order.payment,
    modified: false,
  });

  const handleDropdown = (e) => {
    setStatus({
      ...status,
      [e.target.name]: e.target.value,
      modified: true,
    });
  };

  const handleSubmit = () => {
    sendToStore(status);
    setStatus({
      ...status,
      modified: false,
    });
  };

  return (
    <>
      <Container>
        <h3>Zamówienie id: {order._id}</h3>
        <Row xs={2}>
          <Col>
            <Form.Group>
              <Form.Label>Status</Form.Label>
              <Form.Control
                name="status"
                onChange={handleDropdown}
                as="select"
                value={status.status}
              >
                <option>Nowe</option>
                <option>W realizacji</option>
                <option>Do odbioru</option>
                <option>Zamknięte</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col>
            {" "}
            <Form.Group>
              <Form.Label>Płatność</Form.Label>
              <Form.Control
                name="payment"
                onChange={handleDropdown}
                as="select"
                value={status.payment}
              >
                <option>Nowe</option>
                <option>Opłacone</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3>Zamawiający</h3>

            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Nabywca </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl value={order.client.name} disabled />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>NIP</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                value={order.client.nip ? order.client.nip : "osoba prywatna"}
                disabled
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Ulica</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl value={order.client.street} disabled />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Miasto / kod </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                value={order.client.city}
                placeholder="Miasto"
                disabled
              />
              <FormControl
                value={order.client.postal}
                placeholder="Kod"
                disabled
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>Adres e-mail </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl value={order.client.email} disabled />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>Zamówienie:</h4>

            <ul>
              <li>
                <span>Produkt:</span> <span>{order.product}</span>
              </li>
              <li>
                <span>Czas realizacji:</span>{" "}
                <span>{order.deadline} dni robocze</span>
              </li>
              <li>
                <span>Nakład:</span> <span>{order.volume} szt.</span>
              </li>
              <li>
                <span>Cena netto:</span>{" "}
                <span>
                  {(order.price * order.multiplier).toFixed(0)},00 zł{" "}
                </span>
              </li>
              <li>
                <span>Cena brutto:</span>{" "}
                <span>
                  {(order.price * order.multiplier * 1.23).toFixed(0)}
                  ,00 zł{" "}
                </span>
              </li>
            </ul>
          </Col>
          <Col>
            <h4>Cechy:</h4>
            <ul>
              {order.parameters.map((el, i) => {
                return (
                  <li key={i}>
                    <span>{el.name}</span>
                    <span>{el.value}</span>
                  </li>
                );
              })}
            </ul>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>{order.commment}</p>
          </Col>
        </Row>
        <Row>
          <Col className="uploaded-files">
            <h4>Dostarczone pliki w folderze:</h4>

            <ul>
              {order.files.length == 0 ? (
                <li>Brak plików</li>
              ) : (
                order.files.map((el, i) => {
                  return (
                    <li key={i}>
                      <img src={`http://api.piotrmedynski.pl/public${el}`} />
                    </li>
                  );
                })
              )}
            </ul>
          </Col>
        </Row>
      </Container>

      <Navbar fixed="bottom" bg="dark" expand="lg">
        <Container>
          <Link href="/admin-panel/zamowienia">
            <a>
              <Button variant="warning">Wyjdz</Button>
            </a>
          </Link>
          <Button
            variant={status.modified ? "success" : "primary"}
            onClick={handleSubmit}
            disabled={status.modified ? false : true}
          >
            {status.modified ? "Zapisz" : "Aktualne"}
          </Button>
        </Container>
      </Navbar>
    </>
  );
};

export default OrderForm;
