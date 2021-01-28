import * as t from "../types";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
  loading: true,
};

const pageReducer = (state = { ...initialState }, action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload };
    case t.LOADING:
      return { ...state, loading: true };
    case t.UPDATE_PAGE:
      return { ...state, ...action.payload, loading: false };
    default:
      return { ...state };
  }
};

export default pageReducer;
