import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
// Need to import a reducer here. 
import notificationReducer from './reducers/notificationReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
    notificationReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root')
)