import Link from "next/link";

import AdminLayout from "./../../components/admin/adminLayout";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const AdminPanel = ({ products, orders }) => {
  return (
    <AdminLayout>
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
    </AdminLayout>
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
