import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { applyMiddleware, createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import loginReducer from './reducers/loginReducer'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    notification: notificationReducer,
    blogs: blogReducer,
    login: loginReducer
})

const store = createStore(
    reducer,
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
console.log(store.getState(reducer))
