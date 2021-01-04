export const loginUser = (user) => {
    return (dispatch) => {
        dispatch({
            type: 'LOADING'
        })
        fetch('https://centrum-druku-api.herokuapp.com/api/user/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            })
            .then(res => res.json())
            .then(res => {
                console.log(res);

                dispatch({
                    type: 'LOGIN_SUCCESS',
                    payload: res
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
}