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

// action creators 

export default reducer