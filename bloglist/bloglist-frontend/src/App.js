import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import Login from './components/Login'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, newBlog, incrementLike } from './reducers/blogReducer'
import { initializeUser, clearUser } from './reducers/loginReducer'

const App = () => {

  const dispatch = useDispatch()

  const userInfo = useSelector(state => {
    console.log(state.login)
    return state.login
  })
  console.log(userInfo)
  
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

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser(null))
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

  // if (!userInfo.loggedIn) {
  //   return (
  //     <div>
  //       <h2>Log in to application</h2>
  //       <Notification />
  //       <form onSubmit={handleLogin}>
  //         <div>
  //           username 
  //             <input
  //             type="text"
  //             id="username"
  //             value={username}
  //             name="Username"
  //             onChange={({ target }) => setUsername(target.value)}
  //             />
  //         </div>
  //         <div>
  //           password 
  //           <input
  //           type="password"
  //           id="password"
  //           value={password}
  //           name="Password"
  //           onChange={({ target }) => setPassword(target.value)}
  //           />
  //         </div>
  //         <button type="submit" id="login-button">login</button>
  //       </form>
  //     </div>
  //   )
  // }

  if (!userInfo.loggedIn) {
    return <Login />
  }
  if (!blogs) {
    return null
  }

  return (
    <div>
      <h2>blogs</h2>
      {/* <p>{userInfo.user.name} is logged in</p> */}
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

export default App