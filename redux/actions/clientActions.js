import * as t from "../types";

export const updateClient = (order) => {
  return (dispatch) => {
    console.log("z akcji", order);
    dispatch({
      type: t.UPDATE_CLIENT_ORDER,
      payload: order,
    });
  };
};

export const clearClient = () => {
  return (dispatch) => {
    dispatch({
      type: t.CLEAR_STORE,
    });
  };
};

export const submitClient = (order) => {
  return (dispatch) => {
    dispatch({
      type: t.SUBMITTING,
    });

    fetch("http://api.piotrmedynski.pl/order/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: t.SUBMIT_CLIENT_ORDER,
          payload: res,
        });
      });
  };

  // type: t.SUBMIT_CLIENT_ORDER,
  // payload: order,
};
