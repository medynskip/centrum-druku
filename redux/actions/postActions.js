import * as t from "../types";

export const initPost = (id) => {
  return (dispatch) => {
    dispatch({
      type: t.LOADING,
    });
    fetch(`http://api.piotrmedynski.pl/blog/get/${id}`)
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
    fetch(`http://api.piotrmedynski.pl/blog/update/${post._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    });
  };
};
