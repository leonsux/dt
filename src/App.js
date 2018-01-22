import React, { Component } from 'react';

import AppHeader from './components/common/AppHeader'
import AppFooter from './components/common/AppFooter'

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppHeader />
        {this.props.children}
        <AppFooter />
      </div>
    );
  }
}

export default App;
