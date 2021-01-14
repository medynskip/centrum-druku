import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { updateProduct } from "./../../redux/actions/productActions";

// import { connect } from "react-redux";
// import {
//   getOneProduct,
//   updateProduct,
// } from "../../../store/actions/productActions";

import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

import PriceRow from "./priceRow";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PricesGenerator = ({ product, updateProduct }) => {
  const update = (newPrices) => {
    updateProduct({
      ...product,
      prices: [...newPrices],
    });
  };

  if (product.loading) {
    return (
      <tr>
        <td className="spinner-td">
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </td>
      </tr>
    );
  } else if (product.prices.length < 1) {
    return (
      <tr>
        <td>
          <Alert variant="warning">Ten produkt nie posiada żadnych cen!</Alert>
        </td>
      </tr>
    );
  } else {
    return product.prices.map((el, i) => {
      return (
        <PriceRow
          key={i}
          priceEntry={el}
          product={product}
          update={update}
          //   deletePrice={props.deletePrice}
          //   updatePrice={props.updatePrice}
        />
      );
    });
  }
};

const mapStateToProps = (state) => ({
  product: { ...state.product },
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateProduct: (product) => dispatch(updateProduct(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PricesGenerator);

// export default PricesGenerator;
