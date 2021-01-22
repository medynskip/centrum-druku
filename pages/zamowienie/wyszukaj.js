import { connect } from "react-redux";
import { updateClient, submitClient } from "../../redux/actions/clientActions";

import { useRouter } from "next/router";
import React, { useState } from "react";

import Link from "next/link";

import utils from "../../utils/utils";

import Layout from "../../components/layout";
import OrderDetails from "../../components/orderDetails";
import ClientDetails from "../../components/ClientDetails";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";

const FindOrder = () => {
  const [value, setValue] = useState({
    id: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = (e) => {
    console.log(value.id);
  };

  return (
    <Layout title="Wyszukaj zamowienie">
      <Container>
        <div className="find-order">
          <Form>
            <FormControl
              onChange={handleChange}
              name="id"
              value={value.id}
              placeholder="Numer zamówienia"
              required
            />
            <Button onClick={handleClick}>Szukaj</Button>
          </Form>
        </div>
      </Container>
    </Layout>
  );
};

export default FindOrder;

// const mapStateToProps = (state) => ({
//   order: { ...state.client },
// });

// const mapDispatchToProps = {
//   updateClient: (order) => updateClient(order),
//   submitClient: (order) => submitClient(order),
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Zamowienie);
