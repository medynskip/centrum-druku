// import { GET_SINGLE_PRODUCT, GET_ALL_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../actions/types';

const initialState = {
    products: [],
    product: null,
    isUpdating: true,
    isFresh: false
}

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATING':
            const updatingState = {
                ...state,
                isUpdating: true,
                isFresh: false
            }
            return updatingState;
        case 'UPDATE_PRODUCT':
            const newStateUpdate = Object.assign({}, state);
            const updatedIndex = state.products.findIndex(prod => {
                return prod._id == action.data._id
            })
            newStateUpdate.products[updatedIndex] = {
                ...action.data
            };
            newStateUpdate.isUpdating = false;
            return newStateUpdate;
        case 'ADD_PRODUCT':
            const newStateAdd = {
                ...state,
                products: [...state.products, action.data]
            }
            newStateAdd.isUpdating = false;
            return newStateAdd;
        case 'DELETE_PRODUCT':
            const newStateDelete = Object.assign({}, state);
            const deletedIndex = state.products.findIndex(prod => {
                return prod._id == action._id
            })
            newStateDelete.products.splice(deletedIndex, 1);
            newStateDelete.isUpdating = false;
            return newStateDelete;

        case 'GET_ALL_PRODUCTS':
            const newStateGet = {
                ...state,
                products: [...action.data],
                isUpdating: false,
                isFresh: true
            }
            return newStateGet;

        case 'GET_ONE_PRODUCT':
            const newStateGetOne = {
                ...state,
                product: action.data,
                isUpdating: false
            }
            return newStateGetOne;
        default:
            return state;
    }
}

export default productReducer;