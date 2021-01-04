// import { GET_ONE_PRODUCT, GET_ALL_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from './types';

export const getAllPosts = () => {
  return (dispatch) => {
    dispatch({
      type: "UPDATING",
    });
    fetch("/api/blog/get")
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "GET_ALL_POSTS",
          data: res,
        });
      });
  };
};

export const getActivePosts = () => {
  return (dispatch) => {
    dispatch({
      type: "UPDATING",
    });
    fetch("/api/blog/get/active")
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "GET_ALL_POSTS",
          data: res,
        });
      });
  };
};

// export const getOneProduct = (id) => {
//     return (dispatch) => {
//         dispatch({
//             type: 'UPDATING'
//         })
//         fetch(`/api/product/get/${id}`)
//             .then(res => res.json())
//             .then(oneProduct => {
//                 dispatch({
//                     type: 'GET_ONE_PRODUCT',
//                     data: oneProduct
//                 })
//             })
//     }
// }

export const deletePost = (id) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATING",
    });
    fetch(`/api/blog/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        log(err);
      });
  };
};

export const addPost = (post) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATING",
    });
    console.log("adding", post);

    fetch("/api/blog/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "ADD_POST",
        });
      });
  };
};

export const updatePost = (id, post) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATING",
    });
    fetch(`/api/blog/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((res) => res.json())
      .then((res) => {
        dispatch({
          type: "UPDATE_POST",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};
