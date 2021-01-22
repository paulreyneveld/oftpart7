import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'


const Nav = ({ handleLogout }) => {

    const loggedIn = useSelector(state => state.login.user.name)

    const style = {
        background: 'lightgrey'
    }

    const linkStyle = {
        paddingRight: 5
        // textDecoration: 'none',
        // color: 'green'
    }

    return (
        <div style={style}>
            <Link style={linkStyle} to='/blogs'>Blogs</Link>
            <Link style={linkStyle} to='/users'>Users</Link>
            <span>{loggedIn} logged in <button onClick={handleLogout}>Logout</button></span>
        </div>
    )
}

export default Nav