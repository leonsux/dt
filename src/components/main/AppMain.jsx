import React, { Component } from 'react'

import AppBanner from './AppBanner'
import AppNav from './AppNav'
import AppPullContent from '../common/AppPull/AppPullContent'

import axios from 'axios'

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
  componentDidMount () {
    axios.get('./data.json')
      .then(res => {
        console.log("请求测试：", res)
      })
  }
}

export default AppMain
