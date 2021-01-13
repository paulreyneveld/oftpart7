import React from 'react'
import { useSelector } from 'react-redux'

const User = (props) => {
    console.log(props.match.params.userId)
    const user = useSelector(state => state.users)
    console.log(user)
    return <h1>Hello world</h1>
}

export default User