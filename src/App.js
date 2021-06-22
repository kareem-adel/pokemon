import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from './overmind'
import Home from './components/Home'
import Detail from './components/Detail'

const overmind = createOvermind(config)

function App () {
  return (
    <Provider value={overmind}>
      <Router className="App">
        <Route exact path="/" component={Home} />
        <Route path="/:id" component={Detail} />
      </Router>
    </Provider>
  )
}

export default App
