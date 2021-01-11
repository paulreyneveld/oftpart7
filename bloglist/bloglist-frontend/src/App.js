import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs} from './reducers/blogReducer'
import { initializeUser } from './reducers/loginReducer'
import {
  BrowserRouter as Router, 
  Route,
  Switch 
} from 'react-router-dom'
import Users from './components/Users'
import Home from './components/Home'

const App = () => {

  const dispatch = useDispatch()

  const userInfo = useSelector(state => {
    console.log(state.login)
    return state.login
  })
  
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) { 
      const user = JSON.parse(loggedUserJSON)
      dispatch(initializeUser(user))
      blogService.setToken(user.token)
      dispatch(initializeBlogs())

    }
  }, [dispatch])

  if (!userInfo.loggedIn) {
    return <Login />
  }

  if (!blogs) {
    return null
  }

  return (
    <Router>
    <Switch>
      <Route path="/users">
        <Users />
      </Route>
      <Route path="/">
        <Home 
          userInfo={userInfo}
          blogs={blogs}
        />
      </Route>
    </Switch>
    </Router>
  )
}

export default App