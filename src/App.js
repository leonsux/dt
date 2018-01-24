import React, { Component } from 'react';

import AppHeader from './components/common/AppHeader'
import AppFooter from './components/common/AppFooter'

class App extends Component {
  constructor () {
    super()
    this.state = {
      isHidden: true
    }
  }
  render() {
    return (
      <div className="App">
        <AppHeader />
        {this.props.children}
        <AppFooter isHidden={this.state.isHidden} />
      </div>
    );
  }
  componentWillMount () {
    window.addEventListener('scroll', () => {
      let scrollTop = document.documentElement.scrollTop
      if (scrollTop >= 100) {
        this.setState({
          isHidden: false
        })
      } else {
        this.setState({
          isHidden: true
        })
      }
    });
  }
}

export default App;
