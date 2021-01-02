import Link from "next/link";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

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

const PageMap = () => {
  return (
    <>
      <h4>Mapa strony:</h4>
      <ul>
        <li>
          <Link href="/">START</Link>
        </li>
        <li>
          <Link href="/">USUGI</Link>
        </li>
        <li>
          <Link href="/">DRUK</Link>
        </li>
        <li>
          <Link href="/">BLOG</Link>
        </li>
        <li>
          <Link href="/">KONTAKT</Link>
        </li>
      </ul>
    </>
  );
};

const ProductsList = () => {
  return (
    <>
      <h4>Produkty:</h4>
      <ul>
        <li>
          <Link href="/">WIZYTÓWKI</Link>
        </li>
        <li>
          <Link href="/">ULOTKI</Link>
        </li>
        <li>
          <Link href="/">KATALOGI</Link>
        </li>
        <li>
          <Link href="/">PLAKATY</Link>
        </li>
        <li>
          <Link href="/">BANERY</Link>
        </li>
        <li>
          <Link href="/">ROLL-UP</Link>
        </li>
      </ul>
    </>
  );
};

const Footer = () => {
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
            <PageMap />
          </Col>
          <Col>
            <ProductsList />
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
