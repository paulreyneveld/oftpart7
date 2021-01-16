import React, { useRef } from 'react'
import Blog from '../components/Blog'
import Notification from '../components/Notification'
import Togglable from '../components/Togglable'
import BlogForm from '../components/BlogForm'
import BlogBeta from '../components/BlogBeta'
import { useDispatch } from 'react-redux'
import { newBlog, incrementLike } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Home = ({ userInfo, blogs, handleLogout }) => {

    const dispatch = useDispatch()

    const blogFormRef = useRef()

    const createBlog = async ( blog ) => {
        blogFormRef.current.toggleVisibility()
        dispatch(newBlog(blog))
        dispatch(setNotification({
            message: `a new blog '${blog.title}' by ${blog.author} added!`,
            type: 'success'
          }, 3))
      }
    
      const updateBlogLikes = async ( newBlog ) => {
        dispatch(incrementLike(newBlog))
      }

    return (
        <div>
        <Notification />
        <h2>blogs</h2>
        <p>{userInfo.user.name} is logged in</p>
        <button onClick={handleLogout}>Logout</button>
        <Togglable showLabel="Create Blog" hideLabel="cancel" ref={blogFormRef}>
            <BlogForm 
              createBlog={createBlog}
            />
        </Togglable>


        {blogs.map(blog =>
          <BlogBeta key={blog.id} blog={blog} updateBlogLikes={updateBlogLikes} />
        )}
      </div>
    )
}

export default Home