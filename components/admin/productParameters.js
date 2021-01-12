import React, { useState, useEffect } from "react";

import Table from "react-bootstrap/Table";

import ParametersGenerator from "./parametersGenerator";
import ParameterNew from "./parameterNew";

const ProductParameters = ({ product, update }) => {
  //   useEffect(() => {
  //     props.getOneProduct(props.activeId);
  //   }, []);

  const addParameter = (newItem) => {
    // const updatedProduct = {
    //   name: product.name,
    //   parameters: [...product.parameters, newItem],
    //   _id: product._id,
    // };
    update({
      parameters: [...product.parameters, newItem],
    });
    // props.updateProduct(updatedProduct);
    // props.getOneProduct(props.activeId);
  };

  return (
    <>
      <Table striped hover>
        <tbody>
          <ParametersGenerator />
        </tbody>
      </Table>
      <ParameterNew update={addParameter} />
    </>
  );
};

export default ProductParameters;
