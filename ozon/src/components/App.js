import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { Container } from 'react-bootstrap'

import Nav from './Nav'
import Homepage from './Homepage'
import Login from './Login'
import Register from './Register'

const App = () => {
  return (
    <Container>
      <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </Router>
    </Container>
  )
}

export default App
