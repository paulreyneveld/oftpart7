import blogService from '../services/blogs'

const reducer = (state = null, action) => {
    switch (action.type) {
        case 'INIT_USER':
            console.log(action.data);
            return action.data
        default:
            return state
    }
}

export const initializeUser = () => {
    console.log('testing')
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        let user = null;
        if (loggedUserJSON) { 
            user = JSON.parse(loggedUserJSON)
            blogService.setToken(user.token)
        }
        dispatch({
            type: 'INIT_USER',
            data: user
        })
    }
}

export default reducer