import React from 'react'
import { useSelector } from 'react-redux'

const User = (props, { handleLogout }) => {
    console.log(props.match.params.userId)
    const targetId = props.match.params.userId
    const users = useSelector(state => state.users)
    const user = users.filter(user => user.id === targetId)
    console.log(handleLogout)
    if (user.length === 0) {
        return null
    }
    
    return (
        <>
        <h2>blogs</h2>
        <p> {user[0].name} logged in</p>
        <button onClick={handleLogout}>Logout</button>
        </>
    )    
}

export default User