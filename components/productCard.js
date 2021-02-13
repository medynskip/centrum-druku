import Link from "next/link";
import Col from "react-bootstrap/Col";

import utils from "../utils/utils";

const ProductCard = (props) => {
  const nameSlug = utils.slugify(props.product.name);
  // const url = `/produkty/${nameSlug}`;
  return (
    <Col>
      <div className="product-card">
        {props.product.icon ? <img src={props.product.icon} /> : null}
        {props.product.name.toUpperCase()}

        <div className="reveal">
          <Link href={`/produkty/${nameSlug}`} className="product-card">
            <a>Szczegóły</a>
          </Link>
          <Link href={`/zamowienie/${nameSlug}`} className="product-card">
            <a>Zamów</a>
          </Link>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
