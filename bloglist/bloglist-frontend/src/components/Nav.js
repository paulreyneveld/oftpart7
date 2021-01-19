import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    const style = {
        background: 'lightgrey'
    }

    const linkStyle = {
        paddingRight: 5
    }

    return (
        <div style={style}>
            <Link style={linkStyle} to='/'>Home</Link>
            <Link style={linkStyle} to='/blogs'>Blogs</Link>
            <Link style={linkStyle} to='/users'>Users</Link>
        </div>
    )
}

export default Nav