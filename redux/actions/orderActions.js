// // import { GET_ONE_PRODUCT, GET_ALL_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from './types';

export const updateNewOrder = (order) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_NEW_ORDER',
            data: order
        })
    }
}

export const getAllOrders = () => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATING'
        })
        fetch('https://centrum-druku-api.herokuapp.com/api/order/get')
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type: 'GET_ALL_ORDERS',
                    data: res
                })
            })
    }
}

export const placeOrder = (order) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATING'
        })
        fetch('https://centrum-druku-api.herokuapp.com/api/order/add', {
                method: "POST",
                body: order
            }).then(res => {
                res.json()
            })
            .then(res => {
                dispatch({
                    type: 'PLACE_ORDER'
                })
            });
    }
}

export const placeOrderAtt = (order) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATING'
        })
        fetch('https://centrum-druku-api.herokuapp.com/api/order/add/files', {
                method: "POST",
                body: order
            }).then(res => {
                res.json()
            })
            .then(res => {
                dispatch({
                    type: 'PLACE_ORDER'
                })
            });
    }
}

// export const getActivePosts = () => {
//     return (dispatch) => {
//         dispatch({
//             type: 'UPDATING'
//         })
//         fetch('https://centrum-druku-api.herokuapp.com/api/blog/get/active')
//             .then(res => res.json())
//             .then(res => {
//                 dispatch({
//                     type: 'GET_ALL_POSTS',
//                     data: res
//                 })
//             })
//     }
// }

export const deleteOrder = (id) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATING'
        })
        fetch(`https://centrum-druku-api.herokuapp.com/api/order/delete/${id}`, {
                method: "DELETE"
            })
            .then((res) => {
                dispatch({
                    type: 'DELETE_ORDER'
                })
            }).catch((err) => {
                log(err)
            })
    }
}

export const updateOrder = (id, order) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATING'
        })
        fetch(`https://centrum-druku-api.herokuapp.com/api/order/update/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(order)
            })
            .then(res => res.json())
            .then(res => {
                dispatch({
                    type: 'UPDATE_ORDER',
                })
            })
            .catch(err => {
                console.log(err);
            });
    }
}