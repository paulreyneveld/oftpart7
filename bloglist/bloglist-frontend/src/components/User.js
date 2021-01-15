import React from 'react'
import { useSelector } from 'react-redux'

const User = (props) => {
    const targetId = props.match.params.userId
    const users = useSelector(state => state.users)
    const user = users.filter(user => user.id === targetId)
    if (user.length === 0) {
        return null
    }
    
    return (
        <>
        <h2>blogs</h2>
        <p> {user[0].name} logged in</p>
        <button onClick={props.handleLogout}>Logout</button>
        </>
    )    
}

export default User