import React from 'react'
import { useSelector } from 'react-redux'

const Users = ({ handleLogout }) => {

    const users = useSelector(state => state.users)
    const loggedIn = useSelector(state => state.login.user.name)
    console.log(loggedIn)

    return (
        <>
        <h2>blogs</h2>
        <p>{loggedIn} is logged in.</p>
        <button onClick={handleLogout}>Logout</button>
        <h2>users</h2>
        {users.map(user => 
            <p key={user.id}>User: {user.name} <br />Blogs Written: {user.blogs.length}</p>
            
        )}
        </>
    )
}

export default Users