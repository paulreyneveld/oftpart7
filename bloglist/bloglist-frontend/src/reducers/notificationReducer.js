const reducer = (state = {}, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return {
              ...state,
              content: action.content,
              notify: true,
              type: action.content.type
            }
        case 'CLEAR_NOTIFICATION':
            return {
              ...state,
              content: null,
              notify: false,
              type: null
            }
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