import React from 'react'

const Comments = ({ blog }) => {
    return (
        blog.comments.map(comment => {
            return <li key={comment._id}>{comment.body}</li>
        })
    )
}

export default Comments