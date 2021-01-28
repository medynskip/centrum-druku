import { combineReducers } from "redux";
import productReducer from "./productReducer";
import clientReducer from "./clientReducer";
import orderReducer from "./orderReducer";
import postReducer from "./postReducer";
import pageReducer from "./pageReducer";

const root = combineReducers({
  client: clientReducer,
  product: productReducer,
  order: orderReducer,
  post: postReducer,
  page: pageReducer,
});

export default root;
