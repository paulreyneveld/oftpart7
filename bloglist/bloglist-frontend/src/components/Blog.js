import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, updateBlogLikes, deleteBlog }) => {
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

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

  return (
    <div className="blog" style={blogStyle}>
      <span className="title">Title: {blog.title}</span> <br />
      <span className="author">Author: {blog.author}</span> <br />
      <Togglable showLabel="view" hideLabel="hide">
        <span className="url">Url: {blog.url}</span> <br />
        <span className="likes"> Likes: {blog.likes} <button id="like" onClick={addLikes}>Like</button></span> <br />
      </Togglable>
      <button id="remove" onClick={() => deleteBlog(blog.id)}>Remove</button>
    </div>
  )
}

export default Blog
