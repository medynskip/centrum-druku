import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import root from "./reducers/root";

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count.count) nextState.count.count = state.count.count;
    return nextState;
  } else {
    return root(state, action);
  }
};

const middleware = [thunk];

const makeStore = (context) =>
  createStore(reducer, applyMiddleware(...middleware));

export const wrapper = createWrapper(makeStore, { debug: false });
