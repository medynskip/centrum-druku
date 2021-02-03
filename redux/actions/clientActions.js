import * as t from "../types";

export const updateClient = (order) => {
  return (dispatch) => {
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

    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/order/add`, {
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
};

export const getClient = (order, email) => {
  return (dispatch) => {
    dispatch({
      type: t.SUBMITTING,
    });

    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/order/get/${order}/${email}`)
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson._id) {
          dispatch({
            type: t.UPDATE_CLIENT_ORDER,
            payload: resJson,
          });
          // updateClient(resJson);
        } else {
          console.log("email i numer id niezgodne");
        }
      });
  };
};

export const cancelClient = (order) => {
  return (dispatch) => {
    dispatch({
      type: t.SUBMITTING,
    });
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/order/update/${order._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...order, status: "Anulowane" }),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: t.UPDATE_CLIENT_ORDER,
          payload: res,
        });
      });
  };
};
