import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {

    const users = useSelector(state => state.users)
    console.log(users)
    return (
        <h2>blogs</h2>

    )
}

export default Users