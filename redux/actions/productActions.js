import * as t from "../types";

export const initProduct = (id) => {
  return (dispatch) => {
    dispatch({
      type: t.LOADING,
    });
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/product/get/${id}`)
      .then((res) => res.json())
      .then((oneProduct) => {
        dispatch({
          type: t.INIT_PRODUCT,
          payload: oneProduct,
        });
      });
  };
};

export const updateProduct = (updatedProduct) => {
  return (dispatch) => {
    // dispatch({
    //   type: t.LOADING,
    // });
    fetch(
      `${process.env.NEXT_PUBLIC_API_LINK}/product/update/${updatedProduct._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      }
    )
      .then((res) => res.json())
      .then((resJson) => {
        dispatch({
          type: t.UPDATE_PRODUCT,
          payload: resJson,
        });
      });
  };
};
