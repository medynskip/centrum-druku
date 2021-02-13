import React from "react";

import Table from "react-bootstrap/Table";

import ParametersGenerator from "./parametersGenerator";
import ParameterNew from "./parameterNew";

const ProductParameters = ({ product, update }) => {
  const addParameter = (newItem) => {
    update({
      parameters: [...product.parameters, newItem],
    });
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
