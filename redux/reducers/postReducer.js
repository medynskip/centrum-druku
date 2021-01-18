import * as t from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  loading: true,
};

const postReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case t.LOADING:
      return { ...state, loading: true };
    case t.UPDATE_POST:
      return { ...state, ...action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default postReducer;
