import React from 'react'
import { useSelector } from 'react-redux'

const User = (props) => {
    console.log(props.match.params.userId)
    const targetId = props.match.params.userId
    const users = useSelector(state => state.users)
    
    const user = users.filter(user => user.id === targetId)

    if (user.length === 0) {
        return null
    }
    
    return (
        <>
        <p> {user[0].name}</p>
        </>
    )    
}

export default User