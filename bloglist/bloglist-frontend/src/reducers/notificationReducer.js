const reducer = (state = [], action) => {
// Okay, in here, I need to come up with a switch statement that allows for setting
// the notification, and another for clearing the notification
    console.log('dummy')
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'CLEAR_NOTIFICATION':
            return null
        default: 
            return state
    }
}

let timeoutId

export const setNotification = (content, time) => {
    return async dispatch => {
      dispatch({
        type: 'SET_NOTIFICATION',
        content
      })
  
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
  
      timeoutId = setTimeout(() => {
        dispatch({
          type: 'CLEAR_NOTIFICATION'
        })
      }, time * 1000)
    }
  }
  
  export const clearNotification = (id) => (
    { type: 'CLEAR_NOTIFICATION' }
  )

export default reducer