import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {

    const users = useSelector(state => state.users)
    const loggedIn = useSelector(state => state.loggedIn)
    console.log(users)

    console.log(loggedIn)
    users.map(user => console.log(user))
    return (
        <>
        <h2>blogs</h2>
        <h2>users</h2>
        {users.map(user => 
            <p key={user.id}>User: {user.name} <br />Blogs Written: {user.blogs.length}</p>
            
        )}
        </>
    )
}

export default Users