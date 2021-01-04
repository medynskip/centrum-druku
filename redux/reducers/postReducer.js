// import { GET_SINGLE_PRODUCT, GET_ALL_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../actions/types';

const initialState = {
    posts: [],
    isUpdating: false,
    isFresh: true
}

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATING':
            return ({
                ...state,
                isUpdating: true
            })
        case 'UPDATE_POST':
            return ({
                ...state,
                isUpdating: false,
                isFresh: false
            });
        case 'ADD_POST':
            return ({
                ...state,
                isUpdating: false,
                isFresh: false
            });
        case 'DELETE_POST':
            return ({
                ...state,
                isUpdating: false,
                isFresh: false
            });
        case 'GET_ALL_POSTS':
            return ({
                ...state,
                posts: [...action.data],
                isUpdating: false,
                isFresh: true
            })

        // case 'GET_ONE_PRODUCT':
        //     const newStateGetOne = {
        //         ...state,
        //         product: action.data,
        //         isUpdating: false
        //     }
        //     return newStateGetOne;
        default:
            return state;
    }
}

export default postReducer;