import Link from "next/link";

import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

const ProductRow = ({ product, deleteProduct }) => {
  const deletePasser = () => {
    const approve = confirm("Potwierdź usunięcie produktu");
    if (approve) {
      deleteProduct(product._id);
    }
  };

  return (
    <ListGroup.Item>
      <div className="space-between">
        <div>
          <h4>{product.name}</h4>
          <Badge variant={product.active ? "success" : "warning"}>
            {product.active ? "AKTYWNY" : "NIEAKTYWNY"}
          </Badge>
          <span> | </span>
          <Badge
            variant={product.parameters.length > 0 ? "success" : "secondary"}
          >
            Parametry: {product.parameters.length}
          </Badge>
          <Badge
            variant={product.parameters.length > 0 ? "success" : "secondary"}
          >
            Ceny: {product.prices.length}
          </Badge>
        </div>
        <div>
          <Link href={`/admin-panel/produkty/${product._id}`}>
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

export default ProductRow;
