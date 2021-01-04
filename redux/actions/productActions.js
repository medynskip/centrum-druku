// import { GET_ONE_PRODUCT, GET_ALL_PRODUCTS, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from './types';

export const getAllProducts = () => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATING'
        })
        fetch('https://centrum-druku-api.herokuapp.com/api/product/get')
            .then(res => res.json())
            .then(allProducts => {
                dispatch({
                    type: 'GET_ALL_PRODUCTS',
                    data: allProducts
                })
            })
    }
}

export const getOneProduct = (id) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATING'
        })
        console.log('tutaj');
        fetch(`https://centrum-druku-api.herokuapp.com/api/product/get/${id}`)
            .then(res => res.json())
            .then(oneProduct => {
                dispatch({
                    type: 'GET_ONE_PRODUCT',
                    data: oneProduct
                })
            })
        console.log('tutaj 2');
    }
}

export const deleteProduct = (id) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATING'
        })
        fetch(`https://centrum-druku-api.herokuapp.com/api/product/delete/${id}`, {
                method: "DELETE"
            })
            .then((res) => {
                dispatch({
                    type: 'DELETE_PRODUCT',
                    _id: id
                })
            })
    }
}

export const addProduct = (newProduct) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATING'
        })
        fetch('https://centrum-druku-api.herokuapp.com/api/product/add', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newProduct)
            })
            .then(result => result.json())
            .then(jsonResult => {
                dispatch({
                    type: 'ADD_PRODUCT',
                    data: jsonResult
                })
            });
    }
}

export const updateProduct = (updatedProduct) => {
    return (dispatch) => {
        dispatch({
            type: 'UPDATING'
        })
        fetch(`https://centrum-druku-api.herokuapp.com/api/product/update/${updatedProduct._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(updatedProduct)
            })
            .then(res => res.json())
            .then(resJson => {
                dispatch({
                    type: 'UPDATE_PRODUCT',
                    data: resJson
                })
            });
    }
}