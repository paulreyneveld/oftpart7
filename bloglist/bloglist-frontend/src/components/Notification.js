import React from 'react'
import { useSelector } from 'react-redux'

const Notification = (/*{ notification }*/) => {
  
  // const notification = useSelector(state => {
  //   console.log(state.content)
  //   return state.content
  // })

  const notification = useSelector(state => console.log(state))
  
  if ( !notification ) {
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
    {notification}
  </div>
}

export default Notification