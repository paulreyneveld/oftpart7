import React, { useEffect } from 'react'
import blogService from './services/blogs'
import userService from './services/users'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/userReducer'
import {
  BrowserRouter as Router, 
  Route,
  Switch 
} from 'react-router-dom'
import Users from './components/Users'
import Home from './components/Home'
import Nav from './components/Nav'
import { clearUser } from './reducers/loginReducer'
import { incrementLike } from './reducers/blogReducer'
import User from './components/User'
import BlogBeta from './components/Blog'


const App = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    const checkLoggedIn = () => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) { 
        const user = JSON.parse(loggedUserJSON)
        dispatch(initializeUser(user))
        blogService.setToken(user.token)
        dispatch(initializeBlogs())
      }
    }
    checkLoggedIn()
  }, [dispatch])

  useEffect(() => {
      const getUsers = async () => {
      const users = await userService.getAll()
      dispatch(initializeUsers(users))
    }
    getUsers()
  }, [dispatch])

  const userInfo = useSelector(state => {
    return state.login
  })
  
  const blogs = useSelector(state => state.blogs)

  const updateBlogLikes = async ( newBlog ) => {
    dispatch(incrementLike(newBlog))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(clearUser(null))
}

  if (!userInfo.loggedIn) {
    return <Login />
  }

  if (!blogs) {
    return null
  }

  return (
    <Router>
    <Nav handleLogout={handleLogout} />
    <Switch>
      <Route path="/users">
        <Users 
          handleLogout={handleLogout}
        />
      </Route>
      <Route path={`/user/:userId`} render={(props) => <User {...props} handleLogout={handleLogout} /> } />
      <Route path={`/blogs/:blogId`} render={(props) => <BlogBeta {...props} updateBlogLikes={updateBlogLikes} handleLogout={handleLogout} />} />
      <Route path="/">
        <Home 
          userInfo={userInfo}
          blogs={blogs}
          handleLogout={handleLogout}
        />
      </Route>
    </Switch>
    </Router>
  )
}

export default App