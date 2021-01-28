import { connect } from "react-redux";
import { updateClient, submitClient } from "../../redux/actions/clientActions";

import { useRouter } from "next/router";
import React, { useState } from "react";

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

const ValidationErrors = (props) => {
  if (props.errors.length > 0) {
    const message = "Poniższe pola nie mogą być puste:";
    return (
      <Alert variant="warning">
        <p>{message}</p>
        <ul>
          {props.errors.map((el, i) => {
            return <li key={i}>{el}</li>;
          })}
        </ul>
      </Alert>
    );
  } else {
    return null;
  }
};

const Zamowienie = ({ order, updateClient, submitClient, products, pages }) => {
  const router = useRouter();

  const [errorEl, setErrorEl] = useState([]);
  const [company, setCompany] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [files, setFiles] = useState(null);
  const [comment, setComment] = useState("");

  const [fields, setFields] = useState({
    name: "",
    nip: "",
    street: "",
    city: "",
    postal: "",
    email: "",
  });

  const handleChange = (e) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };

  const handleFile = (e) => {
    setFiles(e.target.files);
  };

  const handleCheckbox = (e) => {
    setCompany(e.target.checked);
  };

  const handleAccepted = (e) => {
    setAccepted(e.target.checked);
  };

  const validation = () => {
    const err = [];
    fields.name != "" ? null : err.push("Nazwa");
    fields.street != "" ? null : err.push("Ulica");
    fields.city != "" ? null : err.push("Miasto");
    fields.postal != "" ? null : err.push("Kod pocztowy");
    fields.email != "" ? null : err.push("E-mail");
    accepted != false ? null : err.push("Zaakceptuj zamówienie");

    return [...err];
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    const err = validation();
    if (err.length < 1) {
      submitClient({
        ...order,
        client: { ...fields },
        comment: comment,
        payment: "Nowe",
        status: "Nowe",
        placed: Date.now(),
      });
      router.push("/zamowienie/przyjete");
    } else {
      setErrorEl(err);
      window.scrollTo(0, 100);
    }
  };

  return (
    <Layout
      title="Przyjęcie nowego zamówienia"
      products={products}
      pages={pages}
    >
      <Container className="new-order-form">
        <h3>Nowe zamówienie</h3>
        <ValidationErrors errors={errorEl} />
        <Row>
          <Col>
            <Form>
              <div className="client content-box">
                <h4>Dane nabywcy</h4>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                      Nabywca *
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    onChange={handleChange}
                    name="name"
                    value={fields.name}
                    placeholder="Nazwa nabywcy"
                    required
                  />
                </InputGroup>
                <Form.Text className="text-muted">
                  Zaznacz tylko jeśli zakup dokonywany jest na firmę, i chcesz
                  otrzymać fakturę VAT. W przeciwnym razie do zamówienia
                  wystawiony zostanie paragon fiskalny .
                </Form.Text>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Checkbox
                      onChange={handleCheckbox}
                      checked={company}
                    />
                    <InputGroup.Text id="basic-addon1">NIP</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    onChange={handleChange}
                    name="nip"
                    value={fields.nip}
                    placeholder="NIP nabywcy"
                    disabled={!company}
                    required={company}
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">Ulica *</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    onChange={handleChange}
                    name="street"
                    value={fields.street}
                    placeholder="Ulica"
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                      Miasto / kod *
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    onChange={handleChange}
                    name="city"
                    value={fields.city}
                    placeholder="Miasto"
                    required
                  />
                  <FormControl
                    onChange={handleChange}
                    name="postal"
                    value={fields.postal}
                    placeholder="Kod"
                    required
                  />
                </InputGroup>
                <InputGroup className="mb-3">
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">
                      Adres e-mail *
                    </InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    onChange={handleChange}
                    name="email"
                    value={fields.email}
                    placeholder="Twój adres e-mail"
                    required
                  />
                </InputGroup>
              </div>
              <OrderDetails order={order} />
              <div className="mb-3">
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Uwagi do realizacji</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    onChange={handleComment}
                    name="comment"
                    value={comment}
                    as="textarea"
                    placeholder="Jeśli masz specyficzne wymagania co do sposobu realizacji zamówienia, podaj je tu..."
                  />
                </InputGroup>
                <Form.Check type="checkbox" id="check-api-checkbox">
                  <Form.Check.Input
                    onChange={handleAccepted}
                    type="checkbox"
                    required
                  />
                  <Form.Check.Label>
                    Akceptuję zamówienie z obowiązkiem zapłaty
                  </Form.Check.Label>
                </Form.Check>
              </div>
            </Form>
          </Col>
        </Row>
        <div className="controls-spread">
          <Button onClick={() => router.back()} variant="secondary">
            Wstecz
          </Button>
          <Button onClick={handlePlaceOrder} variant="success">
            Wyślij do realizacji
          </Button>
        </div>
      </Container>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  order: { ...state.client },
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateClient: (order) => updateClient(order),
    submitClient: (order) => dispatch(submitClient(order)),
  };
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

export default connect(mapStateToProps, mapDispatchToProps)(Zamowienie);
