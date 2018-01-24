import React from 'react'

import logo from '../../static/imgs/logo.png'

const AppFooter = (props) => {
  let { isHidden } = props
  return (
    <footer className="app-footer slide" style={{bottom: isHidden ? '-100px' : '0'}}>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className="foot-btn app-open">App打开</div>
      <div className="foot-btn js-download">下载</div>
    </footer>
  )
}

export default AppFooter
