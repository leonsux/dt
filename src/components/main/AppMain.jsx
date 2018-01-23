import React, { Component } from 'react'

import AppBanner from './AppBanner'
import AppNav from './AppNav'
import AppPullContent from '../common/AppPull/AppPullContent'

class AppMain extends Component {
  render () {
    return (
      <div>
        <AppBanner></AppBanner>
        <AppNav></AppNav>
        <AppPullContent></AppPullContent>
      </div>
    )
  }
}

export default AppMain
