import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { connect } from "react-redux";
import { updateProduct } from "./../../redux/actions/productActions";

import Link from "next/link";

import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Navbar from "react-bootstrap/Navbar";
import Alert from "react-bootstrap/Alert";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FormControl from "react-bootstrap/FormControl";

import ParameterRow from "./parameterRow";

const ParametersGenerator = ({ product, updateProduct }) => {
  const update = (newParams) => {
    updateProduct({
      ...product,
      parameters: [...newParams],
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
  } else if (product.parameters.length < 1) {
    return (
      <tr>
        <td>
          <Alert variant="warning">
            Ten produkt nie posiada żadnych parametrów!
          </Alert>
        </td>
      </tr>
    );
  } else {
    return product.parameters.map((el, i) => {
      return (
        <ParameterRow
          key={i}
          product={product}
          parameter={el}
          update={update}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParametersGenerator);

// export default ParametersGenerator;
