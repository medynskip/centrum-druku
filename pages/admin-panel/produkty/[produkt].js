import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import {
  initProduct,
  updateProduct,
} from "./../../../redux/actions/productActions";

import Link from "next/link";

// import { connect } from "react-redux";
// import {
//   getOneProduct,
//   updateProduct,
// } from "../../../store/actions/productActions";

import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";

import AdminLayout from "./../../../components/admin/adminLayout";
import ProductHeader from "./../../../components/admin/productHeader";
import ProductParameters from "./../../../components/admin/productParameters";

const ProductCard = ({ id, initProduct, updateProduct, product }) => {
  useEffect(() => {
    initProduct(id);
  }, []);

  const update = (params) => {
    updateProduct({
      ...product,
      ...params,
    });
  };

  if (product.loading)
    return (
      <AdminLayout>
        <Spinner />
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <Container className="product-card">
        <h3>Karta produktu</h3>
        <ProductHeader product={product} update={update} />
        <Tabs defaultActiveKey="parametry">
          <Tab eventKey="parametry" title="Parametry">
            <ProductParameters product={product} update={update} />
          </Tab>
          {/* <Tab eventKey="ceny" title="Ceny">
            <ProductPrices product={product} />
          </Tab> */}
        </Tabs>
      </Container>
      <Navbar fixed="bottom" bg="dark" expand="lg">
        <Container>
          <Link href="/admin-panel/produkty">
            <a>
              <Button variant="warning">Wyjdz</Button>
            </a>
          </Link>
        </Container>
      </Navbar>
    </AdminLayout>
  );
};

const mapStateToProps = (state) => ({
  product: { ...state.product },
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateProduct: (product) => dispatch(updateProduct(product)),
    initProduct: (product) => dispatch(initProduct(product)),
  };
};

export async function getServerSideProps({ params }) {
  const id = params.produkt;
  return { props: { id } };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductCard);
