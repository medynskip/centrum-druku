import { useRouter } from "next/router";

import AdminLayout from "./../../../components/admin/adminLayout";
import OrderRow from "./../../../components/admin/orderRow";

import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";
import ListGroup from "react-bootstrap/ListGroup";

const OrdersList = ({ orders }) => {
  const router = useRouter();

  const deleteOrder = (orderID) => {
    fetch(`http://api.piotrmedynski.pl/order/delete/${orderID}`, {
      method: "DELETE",
    }).then(() => {
      router.replace(router.asPath);
    });
  };

  return (
    <AdminLayout>
      <Container>
        <h3>Zamówienia</h3>
        <ListGroup>
          {!orders ? (
            <Alert variant="warning">Nie ma żadnych zamówień!</Alert>
          ) : (
            orders.map((order) => {
              return (
                <OrderRow
                  key={order._id}
                  order={order}
                  deleteOrder={deleteOrder}
                />
              );
            })
          )}
        </ListGroup>
      </Container>
    </AdminLayout>
  );
};

export async function getServerSideProps() {
  const res = await fetch(`http://api.piotrmedynski.pl/order/get`);
  const orders = await res.json();

  return { props: { orders } };
}

export default OrdersList;
