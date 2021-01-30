import Link from "next/link";

import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";

const OrderRow = ({ order, deleteOrder }) => {
  const date = new Date(order.placed);
  const displayDate = `${date.getDate()} / ${
    date.getMonth() + 1
  } / ${date.getFullYear()} g: ${date.getHours()}:${(
    "0" + date.getMinutes()
  ).slice(-2)}`;

  const deletePasser = () => {
    const approve = confirm("Potwierdź usunięcie produktu");
    if (approve) {
      deleteOrder(order._id);
    }
  };

  return (
    <ListGroup.Item>
      <div className="space-between">
        <div>
          <h5>
            {order._id} - {order.product}
          </h5>
          <Badge variant="warning">{order.status}</Badge>
          <Badge variant="primary">{displayDate}</Badge>
          <Badge variant="primary">{order.value},00 zł netto</Badge>
          <Badge variant="primary">{order.volume} szt.</Badge>
          <Badge variant="success">
            {order.files.length > 0 ? "PLIKI" : "BEZ PLIKÓW"}
          </Badge>
        </div>
        <div>
          <Link href={`/admin-panel/zamowienia/${order._id}`}>
            <a>
              <Button variant="primary" size="sm">
                edit
              </Button>
            </a>
          </Link>
          <Button variant="danger" size="sm" onClick={deletePasser}>
            Delete
          </Button>
        </div>
      </div>
    </ListGroup.Item>
  );
};

export default OrderRow;
