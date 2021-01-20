import * as t from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  product: "",
  parameters: [],
  volume: 0,
  multiplier: 1,
  duration: 0,
  price: 0,
  value: 0,
  submitting: false,
};

const clientReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case t.SUBMITTING:
      return { ...state, ...action.payload, submitting: true };
    case t.UPDATE_CLIENT_ORDER:
      console.log("z reducera", state);
      return {
        ...state,
        ...action.payload,
        submitting: false,
      };
    case t.SUBMIT_CLIENT_ORDER:
      return { ...state, ...action.payload, submitting: false };
    case t.CLEAR_STORE:
      return { ...initialState };
    default:
      return { ...state };
  }
};

export default clientReducer;
