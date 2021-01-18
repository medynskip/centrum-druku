import { combineReducers } from "redux";
import productReducer from "./productReducer";
import clientReducer from "./clientReducer";
import orderReducer from "./orderReducer";
import postReducer from "./postReducer";

const root = combineReducers({
  client: clientReducer,
  product: productReducer,
  order: orderReducer,
  post: postReducer,
});

export default root;
