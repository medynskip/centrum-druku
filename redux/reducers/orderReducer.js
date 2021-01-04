// import { GET_SINGLE_PRODUCT, GET_ALL_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from '../actions/types';

const initialState = {
    orders: [],
    order: {
        product: '',
        parameters: [],
        multiplier: 1,
        price: 0
    },
    isUpdating: true,
    isFresh: false
}

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATING':
            return ({
                ...state,
                isUpdating: true,
            })
        case 'UPDATE_NEW_ORDER':
            return ({
                ...state,
                order: {
                    ...state.order,
                    ...action.data
                },
                isUpdating: false,
            })

        case 'PLACE_ORDER':
            return ({
                ...state,
                isUpdating: false,
            })
        case 'UPDATE_ORDER':
            return ({
                ...state,
                isUpdating: false,
                isFresh: false
            })

        case 'GET_ALL_ORDERS':
            return ({
                ...state,
                orders: [...action.data],
                isUpdating: false,
                isFresh: true
            })
        case 'DELETE_ORDER':
            return ({
                ...state,
                isUpdating: false,
                isFresh: false
            });


        default:
            return state;
    }
}

export default orderReducer;