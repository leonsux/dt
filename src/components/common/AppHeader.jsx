import React from 'react'

const AppHeader = (props) => {
  return (
    <header className='app-header'>
      <div className="logo">
        <img src="https://b-ssl.duitang.com/uploads/people/201607/11/20160711122245_BLSNT.png" alt="" />
      </div>
      <a className="download-btn app-open">App打开</a>
      <div className="download-btn js-download">下载
      </div>
    </header>
  )
}

export default AppHeader
