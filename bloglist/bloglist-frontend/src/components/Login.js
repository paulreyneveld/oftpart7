import React, { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from '../components/Notification'


const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const isLoggedIn = useSelector(state => state.login)
    const dispatch = useDispatch()

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

export default Login 