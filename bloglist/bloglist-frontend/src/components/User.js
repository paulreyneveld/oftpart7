import React from 'react'
import { useSelector } from 'react-redux'

const User = (props) => {
    console.log(props.match.params.userId)
    const targetId = props.match.params.userId
    const users = useSelector(state => state.users)
    
    const user = users.filter(user => user.id === targetId )
    console.log(user)
    return (
        <>
        <h2>blogs</h2>
        <p>is logged in.</p>
        </>
    )
    
    
}

export default User