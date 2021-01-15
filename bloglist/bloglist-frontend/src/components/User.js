import React from 'react'
import { useSelector } from 'react-redux'

const User = (props) => {
    const targetId = props.match.params.userId
    const users = useSelector(state => state.users)
    const user = users.filter(user => user.id === targetId)
    const loggedIn = useSelector(state => state.login.user.name)
    console.log(loggedIn)
    if (user.length === 0) {
        return null
    }
    
    return (
        <>
        <h2>blogs</h2>
        <p> {loggedIn} logged in</p>
        <button onClick={props.handleLogout}>Logout</button>
        <h2>{user[0].name}</h2>
        <h3>added blogs</h3>
        </>
    )    
}

export default User