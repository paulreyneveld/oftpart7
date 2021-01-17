import React from 'react'
import { useSelector } from 'react-redux'

const BlogBeta = ({blogs, updateBlogLikes, handleLogout}) => {

    console.log('hello')
    const loggedIn = useSelector(state => state.login.user.name)
    console.log(loggedIn)

    return (
        <>
        <h2>blogs</h2>
        <p>{loggedIn} logged in </p>
        <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default BlogBeta