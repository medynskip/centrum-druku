import * as t from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  name: "",
  parameters: [],
  amount: 0,
  multiplier: 1,
  duration: 0,
  price: 0,
};

const orderReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case t.UPDATE_ORDER:
      return { ...state, ...action.payload };
    default:
      return { ...state };
  }
};

export default orderReducer;
