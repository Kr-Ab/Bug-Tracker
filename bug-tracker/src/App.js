import React, { Component } from 'react'
import { Provider } from 'react-redux'

import store from './redux/store'

import './App.css'

import Home from './pages/home'

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <div className="App">
          <Home />
        </div>
      </Provider>
    )
  }
}

export default App
