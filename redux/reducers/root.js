import orderReducer from "./orderReducer";
import productReducer from "./productReducer";
import { combineReducers } from "redux";

const root = combineReducers({
  order: orderReducer,
  product: productReducer,
});

export default root;
