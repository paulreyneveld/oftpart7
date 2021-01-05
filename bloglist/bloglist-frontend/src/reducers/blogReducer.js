import blogService from '../services/blogs'

const blogReducer = (state = null, action) => {
    console.log('dummy')
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        default: 
            return state
    }
}

export const initializeBlogs = (blogs) => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

// I need action creators for blog retrieval and adding a new blog

export default blogReducer