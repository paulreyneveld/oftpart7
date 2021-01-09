import React, { useState, useEffect, useRef } from 'react'
import Blog from '../components/Blog'
import blogService from '../services/blogs'
import loginService from '../services/login'
import BlogForm from '../components/BlogForm'
import Togglable from '../components/Togglable'
import Notification from '../components/Notification'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, newBlog, incrementLike } from '../reducers/blogReducer'
import { initializeUser } from '../reducers/loginReducer'

const Home = () => {

  const dispatch = useDispatch()

  const userInfo = useSelector(state => {
    return state.login
  })

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const blogFormRef = useRef()

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) { 
      const user = JSON.parse(loggedUserJSON)
      dispatch(initializeUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      dispatch(initializeUser(user))
      setUsername('')
      setPassword('')
      dispatch(setNotification({
        message: `${user.name} welcome back`,
        type: 'success'
      }, 3))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification({
        message: `wrong username/password`,
        type: 'error'
      }, 3))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(initializeUser(null))
  }

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

  if (userInfo === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username 
              <input
              type="text"
              id="username"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
              />
          </div>
          <div>
            password 
            <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">login</button>
        </form>
      </div>
    )
  }

  if (!blogs) {
    return null
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{userInfo.name} is logged in</p>
      <Notification />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlogLikes={updateBlogLikes} />
      )}
      <Togglable showLabel="Create Blog" hideLabel="cancel" ref={blogFormRef}>
          <BlogForm 
            createBlog={createBlog}
          />
      </Togglable>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Home