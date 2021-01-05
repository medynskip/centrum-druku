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
          <Link href={`/zamow/${nameSlug}`} className="product-card">
            <a>Zamów</a>
          </Link>
        </div>
      </div>
    </Col>
    // <Col>
    //   <Link href={url} className="product-card" role="button">
    //     <a className="product-card">
    //       {/* <div className="product-card" role="button" > */}
    //       {props.product.icon ? <img src={props.product.icon} /> : null}
    //       {props.product.name.toUpperCase()}
    //       {/* </div> */}
    //     </a>
    //   </Link>
    // </Col>
  );
};

export default ProductCard;
