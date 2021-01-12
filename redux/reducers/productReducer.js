import * as t from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  //   product: null,
  loading: true,
};

const productReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case t.LOADING:
      return { ...state, loading: true };
    case t.UPDATE_PRODUCT:
      return { ...state, ...action.payload, loading: false };
    case t.INIT_PRODUCT:
      return { ...state, ...action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default productReducer;
