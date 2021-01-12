import React from 'react'

const User = (props) => {
    console.log(props.match.params.userId)
    return <h1>Hello world</h1>
}

export default User