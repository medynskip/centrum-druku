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
    <Row>
      <div className="product-badges content-box">
        <h4>Pozostałe produkty</h4>
        <div>
          {products.map((product, i) => {
            const nameSlug = utils.slugify(product.name);
            return (
              <Link key={i} href={`/produkty/${nameSlug}`}>
                <a>
                  {/* <Badge pill variant="secondary">
                    {product.name}
                  </Badge> */}
                  <Button variant="outline-dark">
                    <img
                      src={product.icon}
                      height="30"
                      alt={`${product.name} ikona`}
                    />{" "}
                    {product.name}
                  </Button>
                </a>
              </Link>
            );
          })}
        </div>
      </div>
    </Row>
  );
}

export default ProductOther;
