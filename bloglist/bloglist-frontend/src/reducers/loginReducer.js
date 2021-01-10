const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'INIT_USER':
            return {
                ...state,
                user: action.data,
                loggedIn: true
            }
        case 'CLEAR_USER':
            return {
                ...state,
                user: null,
                loggedIn: false
            }
        default:
            return state
    }
}

export const initializeUser = (user) => {
    return dispatch => {
        dispatch({
            type: 'INIT_USER',
            data: user
        })
    }
}

export const clearUser = (user) => {
    return dispatch => {
        dispatch({
            type: 'CLEAR_USER',
        })
    }
}

export default reducer