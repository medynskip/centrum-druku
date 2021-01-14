import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import { updateProduct } from "./../../redux/actions/productActions";

import Spinner from "react-bootstrap/Spinner";

import Alert from "react-bootstrap/Alert";

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
