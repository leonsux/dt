import React, { Component } from 'react'
import { hashHistory } from 'react-router'

import tools from '../../../utils/tools'


class AppPullItem extends Component {
  constructor (props) {
    super(props)
    this.state = {}
  }
  toDetail (id) {
    window.location.reload()
    hashHistory.push({
      pathname: '/blog/' + id
    })
  }
  render () {
    let {info} = this.props
    return (
      <div className="pull-item" onClick={this.toDetail.bind(this, info.id)}>
        <div className="pull-item-top">
          <img src={tools.steal(info.photo.path, 'thumb.400_0')} style={{height: info.photo.height*169.5/info.photo.width}} alt=""/>
          <h1>{info.msg}</h1>
          <p>
            {info.id}
            <span>★&nbsp;{info.favorite_count}</span>
          </p>
        </div>
        {
          this.props.easy?'':
          <div className="pull-item-bot">
            <img src={tools.steal(info.sender.avatar, 'thumb.100_100_c')} alt=""/>
            <p>
              <i>{info.sender.username}</i><br/>
              <span>收集到&nbsp;{info.album.name}</span>
            </p>
          </div>
        }
      </div>
    )
  }
}

export default AppPullItem
