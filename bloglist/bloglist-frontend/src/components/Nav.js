import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
    const style = {
        background: 'lightgrey'
    }
    return (
        <div style={style}>
            <Link to='/blogs'>Blogs</Link>
            <Link to='/users'>Users</Link>
        </div>
    )
}

export default Nav