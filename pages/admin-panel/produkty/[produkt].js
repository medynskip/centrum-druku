import React, { useEffect } from "react";

import { connect } from "react-redux";
import {
  initProduct,
  updateProduct,
} from "./../../../redux/actions/productActions";

import Link from "next/link";

import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";

import AdminLayout from "./../../../components/admin/adminLayout";
import ProductHeader from "./../../../components/admin/productHeader";
import ProductParameters from "./../../../components/admin/productParameters";
import ProductPrices from "./../../../components/admin/productPrices";

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

        {/* <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Click me!
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Click me!
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion> */}

        <Tabs>
          <Tab eventKey="parametry" title="Parametry">
            <ProductParameters product={product} update={update} />
          </Tab>
          <Tab eventKey="ceny" title="Ceny">
            <ProductPrices product={product} update={update} />
          </Tab>
        </Tabs>
        {/* <Tabs defaultActiveKey="parametry">
          <Tab eventKey="parametry" title="Parametry">
            <ProductParameters product={product} update={update} />
          </Tab>
          <Tab eventKey="ceny" title="Ceny">
            <ProductPrices product={product} update={update} />
          </Tab>
        </Tabs> */}
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
