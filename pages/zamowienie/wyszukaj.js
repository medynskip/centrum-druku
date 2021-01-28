import { connect } from "react-redux";
import {
  updateClient,
  submitClient,
  clearClient,
} from "../../redux/actions/clientActions";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import Link from "next/link";

import utils from "../../utils/utils";

import Layout from "../../components/layout";
import OrderDetails from "../../components/orderDetails";
import ClientDetails from "../../components/clientDetails";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Spinner from "react-bootstrap/Spinner";

const FindOrder = ({ order, updateClient, clearClient, products, pages }) => {
  const router = useRouter();
  const [searching, setSearching] = useState(null);
  const [value, setValue] = useState({
    id: null,
    email: null,
  });

  useEffect(() => {
    clearClient();
  }, []);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = (e) => {
    if (value.id && value.email) {
      setSearching("SZUKAM");
      fetch(
        `${process.env.NEXT_PUBLIC_API_LINK}/order/get/${value.id}/${value.email}`
      )
        .then((res) => res.json())
        .then((resJson) => {
          if (resJson._id) {
            updateClient(resJson);
            router.push("/zamowienie/szczegoly");
          } else {
            setSearching(resJson.msg);
          }
        });
    }
  };

  return (
    <Layout title="Wyszukaj zamowienie" products={products} pages={pages}>
      <Container>
        <div className="find-order">
          <Form>
            {searching ? <Alert variant="danger">{searching}</Alert> : null}
            <FormControl
              onChange={handleChange}
              name="id"
              value={value.id}
              placeholder="Numer zamówienia"
              required
            />
            <FormControl
              onChange={handleChange}
              name="email"
              value={value.email}
              placeholder="Email podany podczas zamówienia"
              required
            />
            <Button onClick={handleClick}>Szukaj</Button>
          </Form>
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
    updateClient: (order) => dispatch(updateClient(order)),
    submitClient: (order) => dispatch(submitClient(order)),
    clearClient: () => dispatch(clearClient()),
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

export default connect(mapStateToProps, mapDispatchToProps)(FindOrder);
