import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = ({ handleLogout }) => {

    const users = useSelector(state => state.users)
    const loggedIn = useSelector(state => state.login.user.name)
    console.log(loggedIn)
    console.log(users)
    return (
        <>
        <h2>blogs</h2>
        <p>{loggedIn} is logged in.</p>
        <button onClick={handleLogout}>Logout</button>
        <h2>users</h2>
        {users.map(user => 
            <p key={user.id}>User: <Link to={`/user/${user.id}`}>{user.name}</Link> <br />Blogs Written: {user.blogs.length}</p>
            
        )}
        </>
    )
}

export default Users