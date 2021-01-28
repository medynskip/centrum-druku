import * as t from "../types";

export const initPage = (id) => {
  return (dispatch) => {
    dispatch({
      type: t.LOADING,
    });
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/page/get/${id}`)
      .then((res) => res.json())
      .then((page) => {
        dispatch({
          type: t.UPDATE_PAGE,
          payload: page,
        });
      });
  };
};

export const updatePage = (page) => {
  return (dispatch) => {
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/page/update/${page._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(page),
    });
  };
};
