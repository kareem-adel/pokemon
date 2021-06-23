import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createOvermind } from 'overmind'
import { Provider } from 'overmind-react'
import { config } from './overmind'
import Home from './components/Home'
import Detail from './components/Detail'
import 'bootstrap/dist/css/bootstrap.min.css'

const overmind = createOvermind(config)

function App () {
  return (
    <Provider value={overmind}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/:id">
            <div style={{ flexDirection: 'row', display: 'flex' }}>
              <div
                style={{
                  width: '35%'
                }}
              >
                <Home></Home>
              </div>
              <div style={{ width: '65%' }}>
                <Detail></Detail>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
