import { connect } from "react-redux";
import { updateProduct } from "./../../redux/actions/productActions";

import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

import PriceRow from "./priceRow";

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
        <PriceRow key={i} priceEntry={el} product={product} update={update} />
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
