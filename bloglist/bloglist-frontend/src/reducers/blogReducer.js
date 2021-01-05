import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'CREATE_BLOG':
            const content = action.data.blog
            return state.concat(content)
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

export const newBlog = (blog) => {
    return async dispatch => {
        const response = await blogService.create(blog)
        blog.id = response.id
        dispatch({
            type: 'CREATE_BLOG',
            data: { blog }
        })

    }
}

// I need action creators for blog retrieval and adding a new blog

export default blogReducer