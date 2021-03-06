import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { newComment } from '../reducers/blogReducer'
import Comments from '../components/Comments'


const Blog = (props, { updateBlogLikes, handleLogout }) => {

    const [comment, setComment] = useState('')
    const dispatch = useDispatch()

    const targetId = props.match.params.blogId
    const loggedIn = useSelector(state => state.login.user.name)
    const blog = useSelector(state => state.blogs.filter(blog =>    
        blog.id === targetId
    ))

    const individualBlog = blog[0]

    const addLikes = (event) => {
        event.preventDefault()
        props.updateBlogLikes({
          user: blog[0].user,
          title: blog[0].title,
          author: blog[0].author,
          url: blog[0].url,
          likes: blog[0].likes + 1,
          id: blog[0].id
        })
    }
    
    const addComment = (event) => {
        event.preventDefault()
        dispatch(newComment(blog, comment))
        setComment('')
    }

    if (!individualBlog) {
        return null
    }

    return (
        <>
        <h2>blogs</h2>
        <h2>{blog[0].title}</h2>
        <p><a href={`http://${blog[0].url}`}>{blog[0].url}</a></p>
        <p>{blog[0].likes} likes <button onClick={addLikes}>like</button></p>
        <p>added by {blog[0].author}</p>
        <h3>Comments</h3>
        <form onSubmit={addComment}>
        <input 
            id="comment"
            type="text"
            value={comment}
            name="Title"
            onChange={({ target }) => setComment(target.value)}
        />
        <button type="submit" id="new-comment">Comment</button>
        </form>
        {individualBlog.comments && <Comments blog={individualBlog} />}
        </>
    )
}

export default Blog