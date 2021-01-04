import Link from "next/link";
import Col from "react-bootstrap/Col";

import utils from "../utils/utils";

const ProductCard = (props) => {
  // const url = `/druk/${props.product.name}/${props.product._id}/`;
  const nameSlug = utils.slugify(props.product.name);
  const url = `/druk/${nameSlug}`;
  return (
    <Col>
      <Link href={url} className="product-card" role="button">
        <a className="product-card">
          {/* <div className="product-card" role="button" > */}
          {props.product.icon ? <img src={props.product.icon} /> : null}
          {props.product.name.toUpperCase()}
          {/* </div> */}
        </a>
      </Link>
    </Col>
  );
};

export default ProductCard;
