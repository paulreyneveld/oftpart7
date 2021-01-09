import React from 'react'
import Home from './components/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import Users from './components/Users'

const App = () => {

  return (
    <Router> 
    <Switch>
      <Route exact path="/users">
        <Users />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
    </Router>
  )
}

export default App