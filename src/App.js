import React, { Component } from 'react';
import Application from './routers/index'
import { Provider } from 'react-redux'
import configureStore from './store';

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <Application/>
      </Provider>  
    );
  }
}

export default App;
