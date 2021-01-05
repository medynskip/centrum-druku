import orderReducer from "./orderReducer";
import { combineReducers } from "redux";

const root = combineReducers({
  order: orderReducer,
});

export default root;
