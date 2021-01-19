import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = ({ handleLogout }) => {

    const users = useSelector(state => state.users)

    return (
        <>
        <h2>users</h2>
        {users.map(user => 
            <p key={user.id}>User: <Link to={`/user/${user.id}`}>{user.name}</Link> <br />Blogs Written: {user.blogs.length}</p>
            
        )}
        </>
    )
}

export default Users