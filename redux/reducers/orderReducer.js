import * as t from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  product: "",
  parameters: [],
  multiplier: 1,
  price: 0,
  loading: true,
};

const orderReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case t.LOADING:
      return { ...state, loading: true };
    case t.UPDATE_ORDER:
      return { ...state, ...action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default orderReducer;
