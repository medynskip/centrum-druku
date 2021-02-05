import * as t from "../types";

export const initOrder = (id) => {
  return (dispatch) => {
    dispatch({
      type: t.LOADING,
    });
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/order/get/${id}`)
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
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/order/update/${order._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    });
  };
};
