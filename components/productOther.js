import React, { useEffect, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";

import Link from "next/link";

import utils from "../utils/utils";

function ProductOther({ products }) {
  return (
    <Row className="product-badges">
      <h4>Pozostałe produkty</h4>
      <p>
        {products.map((product, i) => {
          const nameSlug = utils.slugify(product.name);
          return (
            <Link key={i} href={`/produkty/${nameSlug}`}>
              <a>
                <Badge pill variant="dark">
                  {product.name}
                </Badge>
              </a>
            </Link>
          );
        })}
      </p>
    </Row>
  );
}

export default ProductOther;
