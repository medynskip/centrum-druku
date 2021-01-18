import { connect } from "react-redux";
import { updateOrder } from "../../redux/actions/clientActions";

import { useRouter } from "next/router";
import React, { useState } from "react";

import utils from "../../utils/utils";

import Layout from "../../components/layout";

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

const Zamowienie = (props) => {
  const history = useRouter();

  const handleClick = () => {
    history.push(`/produkty/${utils.slugify(props.order.name)}`);
  };
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

  const handleSubmit = (e) => {
    e.preventDefault();
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
    // if (err.length < 1) {
    //     const fullOrder = {
    //         ...props.order,
    //         client: { ...fields },
    //         comment: comment,
    //         payment: 'Nowe'
    //     }
    //     const data1 = new FormData();
    //     data1.append('order_id', Date.now())
    //     data1.append('order', JSON.stringify(fullOrder))
    //     if (files) {
    //         for (var x = 0; x < files.length; x++) {
    //             data1.append('file', files[x])
    //         }
    //         props.placeOrderAtt(data1);
    //     } else {
    //         props.placeOrder(data1);
    //     }
    //     history.push('/zamowienie/zlozone/');
    // } else {
    setErrorEl(err);
    // props.errorHandle(err);
    window.scrollTo(0, 100);
    // }
  };
  return (
    <Layout title="Przyjęcie nowego zamówienia">
      <Container className="new-order-form">
        <h3>Nowe zamówienie</h3>
        <ValidationErrors errors={errorEl} />
        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <div className="client">
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
              <div className="parameters">
                <h4>Wybrane parametry zamówienia</h4>
                <Row>
                  <Col>
                    <p>Zamówienie:</p>

                    <ul>
                      <li>
                        <span>Produkt:</span> <span>{props.order.name}</span>
                      </li>
                      <li>
                        <span>Czas realizacji:</span>{" "}
                        <span>{props.order.duration} dni robocze</span>
                      </li>
                      <li>
                        <span>Nakład:</span>{" "}
                        <span>{props.order.amount} szt.</span>
                      </li>
                      <li>
                        <span>Cena:</span>{" "}
                        <span>
                          {(props.order.price * props.order.multiplier).toFixed(
                            0
                          )}
                          ,00 zł netto
                        </span>
                      </li>
                    </ul>
                  </Col>
                  <Col>
                    <p>Cechy:</p>
                    <ul>
                      {props.order.parameters.map((el, i) => {
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
                <Form.Group className="form-group files">
                  <Form.Label>Wgraj pliki projektu</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleFile}
                    className="form-control"
                    multiple
                  />
                </Form.Group>

                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text>Uwagi do realizacji</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl
                    onChange={handleComment}
                    name="comment"
                    value={comment}
                    as="textarea"
                    placeholder="Jeśli masz specyficzne wymagania co d osposobu realizacji zamóienia, podaj je tu..."
                  />
                </InputGroup>
              </div>
              <div className="mb-3">
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
              <Button type="submit" onClick={handlePlaceOrder}>
                Wyślij do realizacji
              </Button>
            </Form>
          </Col>
        </Row>
        <Button onClick={handleClick}>Wstecz</Button>
      </Container>
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  order: { ...state.client },
});

const mapDispatchToProps = {
  updateOrder: (order) => updateOrder(order),
};

export default connect(mapStateToProps, mapDispatchToProps)(Zamowienie);
