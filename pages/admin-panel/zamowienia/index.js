import Link from "next/link";

import AdminLayout from "./../../../components/adminLayout";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Navbar from "react-bootstrap/Navbar";

const EditBtn = (props) => {
  // const history = useHistory();
  const editOrder = () => {
    // const url = `/admin/zamowienia/edytuj/${props.id}`
    // history.push(url);
  };
  return (
    <Button variant="primary" size="sm" onClick={editOrder}>
      edit
    </Button>
  );
};

const DeleteBtn = (props) => {
  const deleteThis = () => {
    // const approve = confirm('Potwierdź usunięcie zamówienia');
    // if (approve) {
    //     props.deleteOrder()
    // }
  };
  return (
    <Button variant="danger" size="sm" onClick={deleteThis}>
      Delete
    </Button>
  );
};

const SingleOrder = ({ order }) => {
  // const history = useHistory();
  const date = new Date(order.placed);
  const displayDate = `${date.getDate()} / ${
    date.getMonth() + 1
  } / ${date.getFullYear()} g: ${date.getHours()}:${(
    "0" + date.getMinutes()
  ).slice(-2)}`;

  // const variant = (a) => {
  //     // return <Badge variant={variant(post.active)}></Badge>
  //     return <Badge variant={a ? "success" : "secondary"}> {a ? "aktywny" : "nieaktywny"}</Badge>
  // }

  const deletePasser = () => {
    // props.deleteOrder(props.order._id)
  };

  return (
    <ListGroup.Item>
      <div className="space-between">
        <div>
          <h5>{order.product}</h5>
          {/* {variant(post.active)} */}
          <Badge variant="warning">{order.status}</Badge>
          <Badge variant="primary">{displayDate}</Badge>
          <Badge variant="primary">{order.price},00 zł netto</Badge>
          <Badge variant="primary">{order.volume} szt.</Badge>
          <Badge variant="success">
            {order.files.length > 0 ? "PLIKI" : "BEZ PLIKÓW"}
          </Badge>
        </div>
        <div>
          <EditBtn id={order._id} />
          <DeleteBtn deleteOrder={deletePasser} />
        </div>
      </div>
    </ListGroup.Item>
  );
};

const OrdersList = ({ orders }) => {
  //   const history = useHistory();

  const deleteOrder = (id) => {
    // props.deleteOrder(id);
    // props.getAllOrders();
  };

  return (
    <AdminLayout>
      <Container>
        <h3>Zamówienia</h3>
        <ListGroup>
          {orders.length > 0 ? (
            orders.map((order) => {
              return (
                <SingleOrder
                  key={order._id}
                  order={order}
                  deleteOrder={deleteOrder}
                />
              );
            })
          ) : (
            <Alert variant="warning">Nie ma żadnych zamówień!</Alert>
          )}
        </ListGroup>
      </Container>
    </AdminLayout>
  );
};

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://api.piotrmedynski.pl/order/get`);
  const orders = await res.json();

  // Pass data to the page via props
  return { props: { orders } };
}

export default OrdersList;
