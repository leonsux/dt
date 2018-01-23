import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import axios from 'axios'

class AppPullItem extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    let {info} = this.props
    return (
      <div className="pull-item">
        <div className="pull-item-top">
          <img src={steal(info.photo.path, 'thumb.400_0.')} alt=""/>
          <h1>{info.msg}</h1>
          <p>
            <span>★&nbsp;{info.like_count}</span>
          </p>
        </div>

        <div className="pull-item-bot">
          <img src={steal(info.sender.avatar, 'thumb.100_100_c.')} alt=""/>
          <p>{}</p>
        </div>
      </div>
    )
  }
}

// 转换图片路径
function steal (url, tag) {
  let hz = /[^\.]\w*$/.exec(url)[0]
  let newUrl = url.replace(/[^\.]\w*$/, tag) + hz
  return newUrl
}


export default AppPullItem

// https://b-ssl.duitang.com/uploads/item/201801/16/20180116192228_kskwb.thumb.400_0.JPG
// https://b-ssl.duitang.com/uploads/item/201801/16/20180116192228_kskwb.JPG

// https://b-ssl.duitang.com/uploads/people/201706/26/20170626210743_sPf2c.thumb.100_100_c.jpeg);

// https://b-ssl.duitang.com/uploads/people/201702/15/20170215094159_tukKj.thumb.100_100_c.jpeg
