const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'INIT_USERS':
            return {
                ...state,
                users: action.data
            }
        default: 
            return state
    }    
}

export const initializeUsers = (users) => {
    return dispatch => {
        dispatch({
            type: 'INIT_USERS',
            data: users
        })
    }
}
export default reducer