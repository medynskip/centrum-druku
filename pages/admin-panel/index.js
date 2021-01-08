import Link from "next/link";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AdminPanel = ({ products, orders }) => {
  return (
    <>
      <Navbar fixed="left" className="admin-nav">
        <Container>
          <Navbar.Brand href="/admin-panel/">
            CentrumDruku Admin Panel
          </Navbar.Brand>
          {/* <Nav className="mr-auto"> */}
          <Navbar.Collapse className="justify-content-end">
            <Link href="/admin-panel/produkty">
              <a>PRODUKTY</a>
            </Link>
            <Link href="/admin-panel/zamowienia">
              <a>ZAMÓWIENIA</a>
            </Link>
            <Link href="/admin-panel/blog">
              <a>BLOG</a>
            </Link>
          </Navbar.Collapse>
          {/* </Nav> */}
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col className="dash-products">
            <span>PRODUKTY</span>
            <span>{products.length}</span>
          </Col>
          <Col className="dash-orders">
            <span>ZAMÓWIENIA</span>
            <span>{orders.length}</span>
          </Col>
        </Row>
        <Row>
          <Col className="dash-history">
            Ilość zamówień w ciągu ostatnich 30 dni
          </Col>
        </Row>
      </Container>
    </>
  );
};

// export default AdminPanel;

export async function getServerSideProps() {
  const res = await fetch("http://api.piotrmedynski.pl/product/get");
  const products = await res.json();

  const res2 = await fetch("http://api.piotrmedynski.pl/order/get");
  const orders = await res2.json();

  return {
    props: {
      products,
      orders,
    },
  };
}

export default AdminPanel;
