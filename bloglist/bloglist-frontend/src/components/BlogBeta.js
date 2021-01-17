import React from 'react'
import { useSelector } from 'react-redux'

const BlogBeta = (props, { updateBlogLikes, handleLogout }) => {
    const targetId = props.match.params.blogId
    const loggedIn = useSelector(state => state.login.user.name)
    const blog = useSelector(state => state.blogs.filter(blog =>    
        blog.id === targetId
    ))

    console.log(blog)
    const addLikes = (event) => {
        event.preventDefault()
        updateBlogLikes({
          user: blog.user,
          title: blog.title,
          author: blog.author,
          url: blog.url,
          likes: blog.likes + 1,
          id: blog.id
        })
      }

    if (blog.length < 1) {
        return null
    }

    return (
        <>
        <h2>blogs</h2>
        <p>{loggedIn} logged in </p>
        <button onClick={handleLogout}>Logout</button>
        <h2>{blog[0].title}</h2>
        <p><a href={`http://${blog[0].url}`}>{blog[0].url}</a></p>
        <p>added by {blog[0].author}</p>
        </>
    )
}

export default BlogBeta