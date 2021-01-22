import React from 'react'

const Comments = ({ blog }) => {
    const style = {
        listStyleType: 'none'
    }

    const ulpadding = {
        paddingLeft: '1em'
    }
    return (
        <ul style={ulpadding}>
        {blog.comments.map(comment => {
            return <li style={style} key={comment._id}>{comment.body}</li>
        })}
        </ul>
    )
}

export default Comments