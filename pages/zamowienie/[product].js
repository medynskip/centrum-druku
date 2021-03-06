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

function Product({ product, allProducts, pages }) {
  const htmlContent = () => {
    return { __html: product.descriptionShort };
  };

  return (
    <>
      <Layout
        title={`${product.name} - najlepsza cena i bogate opcje wydruku`}
        products={allProducts}
        pages={pages}
      >
        <section className="print">
          <Container>
            <Row className="shop-item-header">
              <div>
                <h2>
                  <img src={product.icon} />
                  {product.name}
                </h2>
                <Link href="/produkty">
                  <a>
                    <Button variant="outline-primary">Powrót do listy</Button>
                  </a>
                </Link>
              </div>
              <div dangerouslySetInnerHTML={htmlContent()} />
              {/* {product.descriptionShort}
              </p> */}
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/product/get/active`
  );
  const products = await res.json();
  const paths = products.map((product) => {
    const nameSlug = utils.slugify(product.name);
    return `/zamowienie/${nameSlug}`;
  });
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const pagesQuery = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/page/get/active`
  );
  const pages = await pagesQuery.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_LINK}/product/get/active`
  );
  const allProducts = await res.json();
  let product;
  allProducts.map((single) => {
    const nameSlug = utils.slugify(single.name);
    if (nameSlug == params.product) {
      product = { ...single };
    }
  });
  return { props: { product, allProducts, pages } };
}

export default Product;
