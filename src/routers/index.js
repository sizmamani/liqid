import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from '../routers/home'

const Application = () => (
  <Router>
    <Route exact path="/:step?" component={Home} />
  </Router>
)

export default Application