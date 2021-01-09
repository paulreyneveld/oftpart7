import React from 'react'
import { useSelector } from 'react-redux'

const Users = () => {

    const loggedInUser = useSelector(state => console.log(state))
    return (
        <h2>blogs</h2>

    )
}

export default Users