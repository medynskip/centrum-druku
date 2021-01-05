import React, { useEffect, useState } from "react";

import Head from "next/head";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

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
  // const [selected, setSelected] = useState({})
  return (
    <>
      <Head>
        <title>{product.name} - Twoja drukarnia internetowa</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <Navbar />

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
      <Footer />
    </>
  );
}

export async function getStaticPaths() {
  const res = await fetch("http://api.piotrmedynski.pl/product/get");
  const products = await res.json();
  const paths = products.map((product) => {
    if (product.active) {
      const nameSlug = utils.slugify(product.name);
      return `/produkty/${nameSlug}`;
    }
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const res = await fetch(`http://api.piotrmedynski.pl/product/get`);
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
