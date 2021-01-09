const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_USER':
            return action.data
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

export default reducer