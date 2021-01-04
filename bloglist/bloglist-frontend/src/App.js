import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  // const [notification, setNotification] = useState(null)
  
  const blogFormRef = useRef()

  const dbHook = () => { blogService.getAll().then(blogs =>
    setBlogs(blogs.sort((a, b) => a.likes > b.likes ? -1 : 1))
  ) }

  useEffect(
    dbHook
  , [])  // Using blogs's state to rerender leads to an infinite xhr request?

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) { 
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // const notifyWith = (message, type = 'success') => {
  //   setNotification({
  //     message, type
  //   })
  //   setTimeout(() => {
  //     setNotification(null)
  //   }, 5000)
  // }

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
      setUser(user)
      setUsername('')
      setPassword('')
      // notifyWith(`${user.name} welcome back`)
    } catch (exception) {
      console.log(exception)
      // notifyWith(`wrong username/password`, `error`)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const createBlog = async ( newBlog ) => {
    blogFormRef.current.toggleVisibility()
    let response = await blogService.create(newBlog)
    newBlog.id = response.id
    setBlogs(blogs.concat(newBlog))
    // notifyWith(`a new blog '${newBlog.title}' by ${newBlog.author} added!`)
    dispatch(setNotification({
        message: `a new blog '${newBlog.title}' by ${newBlog.author} added!`,
        type: 'success'
      },
       3))
  }

  const deleteBlog = async ( id ) => {
    setBlogs(blogs.filter(blog => blog.id !== id))
    await blogService.removeBlog(id)
  }

  const updateBlogLikes = async ( newBlog ) => {
    await blogService.updateLikes(newBlog)
    // Line 74 kind of melts my brain. 
    setBlogs(blogs.map(blog => 
      blog.id === newBlog.id  
      ? {...blog, likes : newBlog.likes} 
      : blog 
    ))
  }

  // <Notification notification={notification} />


  if (user === null) {
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

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} is logged in</p>
      <Notification />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlogLikes={updateBlogLikes} deleteBlog={deleteBlog} />
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

export default App