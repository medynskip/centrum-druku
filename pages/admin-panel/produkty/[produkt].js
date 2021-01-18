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
import ProductParameters from "./../../../components/admin/productParameters";
import ProductPrices from "./../../../components/admin/productPrices";
import ProductDescription from "./../../../components/admin/productDescription";

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
        <Tabs>
          <Tab eventKey="opis" title="Opis">
            <ProductDescription product={product} update={update} />
          </Tab>
          <Tab eventKey="parametry" title="Parametry">
            <ProductParameters product={product} update={update} />
          </Tab>
          <Tab eventKey="ceny" title="Ceny">
            <ProductPrices product={product} update={update} />
          </Tab>
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
