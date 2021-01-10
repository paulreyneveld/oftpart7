import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {

    const loggedInUser = useSelector(state => state)
    console.log(loggedInUser)
    return (
        <h2>blogs</h2>

    )
}

export default Users