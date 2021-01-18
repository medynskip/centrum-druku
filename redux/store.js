import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import root from "./reducers/root";

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    if (state.count.count) nextState.count.count = state.count.count; // preserve count value on client side navigation
    return nextState;
  } else {
    return root(state, action);
  }
};

const middleware = [thunk];

const makeStore = (context) =>
  createStore(reducer, applyMiddleware(...middleware));

export const wrapper = createWrapper(makeStore, { debug: true });
