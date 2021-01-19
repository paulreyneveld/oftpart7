import React from 'react'
import { useSelector } from 'react-redux'

const Blog = (props, { updateBlogLikes, handleLogout }) => {
    const targetId = props.match.params.blogId
    const loggedIn = useSelector(state => state.login.user.name)
    const blog = useSelector(state => state.blogs.filter(blog =>    
        blog.id === targetId
    ))
    console.log(blog)
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

    if (blog.length < 1) {
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
        {blog[0].comments.map(comment => {
            return <li key={comment._id}>{comment.body}</li>})}
        </>
    )
}

export default Blog