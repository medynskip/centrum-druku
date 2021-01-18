import * as t from "../types";

export const initOrder = (id) => {
  return (dispatch) => {
    dispatch({
      type: t.LOADING,
    });
    fetch(`http://api.piotrmedynski.pl/order/get/${id}`)
      .then((res) => res.json())
      .then((order) => {
        dispatch({
          type: t.UPDATE_ORDER,
          payload: order,
        });
      });
  };
};

export const updateOrder = (order) => {
  return (dispatch) => {
    fetch(`http://api.piotrmedynski.pl/order/update/${order._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
  };
  //   return (dispatch) => {
  //     dispatch({
  //       type: t.LOADING,
  //     });
  //     fetch(`http://api.piotrmedynski.pl/product/update/${updatedProduct._id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(updatedProduct),
  //     })
  //       .then((res) => res.json())
  //       .then((resJson) => {
  //         dispatch({
  //           type: t.UPDATE_PRODUCT,
  //           payload: resJson,
  //         });
  //       });
  //   };
};
