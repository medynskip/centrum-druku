import {
    combineReducers
} from 'redux';
import productReducer from './productReducer';
import postReducer from './postReducer';
import orderReducer from './orderReducer';
import userReducer from './userReducer';

export default combineReducers({
    productReducer,
    postReducer,
    orderReducer,
    userReducer
});