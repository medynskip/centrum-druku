import { createStore } from "redux";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import root from "./reducers/root";

// const store = createStore(root);

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

const makeStore = (context) => createStore(reducer);

export const wrapper = createWrapper(makeStore, { debug: true });
// export default store;
