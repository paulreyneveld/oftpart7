import blogService from '../services/blogs'

const reducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'CREATE_BLOG':
            const content = action.data.blog
            return state.concat(content)
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data)
        case 'INCREMENT_LIKE':
            return state.map(blog => 
                blog.id === action.data.blog.id 
                ? { ...blog, likes: action.data.blog.likes}
                : blog)
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

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.removeBlog(id)
        dispatch({
            type: 'REMOVE_BLOG',
            data: id
        })
    }
}

export const incrementLike = (blog) => {
    return async dispatch => {
        await blogService.updateLikes(blog)
        dispatch({
            type: 'INCREMENT_LIKE',
            data: { blog }
        })
    }
}

export const newComment = (blog, comment) => {
    return async dispatch => {
        console.log(blog)
        const newComment = {
            id: blog[0].id,
            body: comment
        }
        console.log(newComment.id)
        const updatedBlog = await blogService.updateComments(newComment)
        console.log(updatedBlog)
        dispatch({
            type: 'ADD_COMMENT',
            data: comment
        })
    }
}

export default reducer