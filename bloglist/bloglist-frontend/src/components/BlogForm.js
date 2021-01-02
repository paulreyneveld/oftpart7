import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ 
     createBlog,
    }) => {

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title,
            author,
            url,
            likes: 0
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }
    
    return (
        <>
        <h2>create</h2>
        <form onSubmit={addBlog}>
        title:
        <input 
        id="title"
        type="text"
        value={title}
        name="Title"
        onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        author:
        <input 
        id="author"
        type="text"
        value={author}
        name="Author"
        onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        url:
        <input 
        id="url"
        type="text"
        value={url}
        name="URL"
        onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <button type="submit" id="submit-new-blog">Create Blog</button>
        </form>
        </>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm