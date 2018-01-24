import React from 'react'

import logo from '../../static/imgs/logo.png'

const AppFooter = (props) => {
  return (
    <footer className="app-footer">
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="foot-btn app-open">App打开</div>
      <div className="foot-btn js-download">下载</div>
    </footer>
  )
}

export default AppFooter
