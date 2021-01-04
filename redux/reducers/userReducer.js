const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isLoading: false,
    isAuthenticated: false
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return ({
                ...state,
                isLoading: true,
            })
        case 'LOGIN_SUCCESS':
            localStorage.setItem('token', action.payload.token)
            return ({
                ...state,
                ...action.payload,
                isLoading: false,
                isAuthenticated: true
            })
        case 'LOGOUT':
            localStorage.removeItem('token')
            return ({
                ...state,
                user: null,
                token: null,
                isLoading: false,
                isAuthenticated: false
            })
        default:
            return state;
    }
}

export default userReducer;