import * as t from "../types";

export const initPost = (id) => {
  return (dispatch) => {
    dispatch({
      type: t.LOADING,
    });
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/blog/get/${id}`)
      .then((res) => res.json())
      .then((post) => {
        dispatch({
          type: t.UPDATE_POST,
          payload: post,
        });
      });
  };
};

export const updatePost = (post) => {
  return (dispatch) => {
    fetch(`${process.env.NEXT_PUBLIC_API_LINK}/blog/update/${post._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  };
};
