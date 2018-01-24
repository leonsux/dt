import React from 'react'

import logo from '../../static/imgs/logo.png'

const AppHeader = (props) => {
  return (
    <header className='app-header'>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <a className="download-btn app-open">App打开</a>
      <div className="download-btn js-download">下载
      </div>
    </header>
  )
}

export default AppHeader

// https://b-ssl.duitang.com/uploads/people/201607/11/20160711122245_BLSNT.png
