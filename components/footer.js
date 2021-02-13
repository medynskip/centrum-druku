import Link from "next/link";

import React, { useEffect } from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import utils from "../utils/utils";

const CompanyDetails = () => {
  return (
    <>
      <p>
        ul. Krótka 1<br />
        26-110 Skarżysko-Kam.
      </p>
      <p>tel.: 00 1232 456 23</p>
      <ul>
        <li>biuro: biuro@druk.pl</li>
        <li>zamówienia: zamowienia@druk.pl</li>
      </ul>
    </>
  );
};

const PageMap = ({ pages }) => {
  return (
    <>
      <h4>Ważne informacje:</h4>
      <ul>
        {pages.map((el, i) => {
          const nameSlug = utils.slugify(el.title);
          return (
            <li key={i}>
              <Link href={`/strony/${nameSlug}`}>{el.linkName}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const ProductsList = ({ products }) => {
  return (
    <>
      <h4>Produkty:</h4>
      <ul>
        {products.map((el, i) => {
          const nameSlug = utils.slugify(el.name);
          return (
            <li key={i}>
              <Link href={`/produkty/${nameSlug}`}>{el.name}</Link>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const Footer = ({ pages, products }) => {
  return (
    <footer>
      <Container>
        <h2>
          <img src="/images/logo_white.png" />
        </h2>
        <Row noGutters xs={1} md={1} lg={3}>
          <Col>
            <CompanyDetails />
          </Col>
          <Col>
            <PageMap pages={pages} />
          </Col>
          <Col>
            <ProductsList products={products} />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
