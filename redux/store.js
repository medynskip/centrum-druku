//Redux
import {
    createStore,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers/index'

const initialState = {};

const middleware = [thunk];

export default createStore(allReducers, initialState, applyMiddleware(...middleware));