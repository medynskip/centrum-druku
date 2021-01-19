import React, { useEffect, useState } from "react";

import Layout from "../../components/layout";

import ProductColumns from "../../components/productColumns";
import ProductOther from "../../components/productOther";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import Link from "next/link";

import utils from "../../utils/utils";

function Product({ product, allProducts }) {
  return (
    <>
      <Layout title={`${product.name} - najlepsza cena i bogate opcje wydruku`}>
        <section className="print">
          <Container>
            <Row className="shop-item-header">
              <h2>
                <img src={product.icon} />
                {product.name}
              </h2>
              <Button variant="outline-primary">Powrót do listy</Button>
            </Row>

            <ProductColumns product={product} />

            <ProductOther products={allProducts} />
          </Container>
        </section>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://api.piotrmedynski.pl/product/get/active");
  const products = await res.json();
  const paths = products.map((product) => {
    // if (product.active) {
    const nameSlug = utils.slugify(product.name);
    return `/zamowienie/${nameSlug}`;
    // }
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://api.piotrmedynski.pl/product/get/active`);
  const allProducts = await res.json();
  let product;
  allProducts.map((single) => {
    const nameSlug = utils.slugify(single.name);
    if (nameSlug == params.product) {
      product = { ...single };
    }
  });
  return { props: { product, allProducts } };
}

export default Product;
