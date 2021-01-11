import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

  const notification = useSelector(state => {
    return state.notification
  })
  
  if (!notification.notify) {
    return null
  }

  const style = {
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    color: notification.type === 'success' ? 'green' : 'red',
    background: 'lightgrey'
  }

  return <div style={style}>
    {notification.content.message}
  </div>
}

export default Notification