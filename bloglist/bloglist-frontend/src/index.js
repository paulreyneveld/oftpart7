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
import Users from './components/Users'
import {
    BrowserRouter as Router,
    Link,
    Switch,
    Route
} from 'react-router-dom'
import { useSelector } from 'react-redux'

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
