import React, { Component } from 'react'

import AppPullContent from './AppPull/AppPullContent'

import axios from 'axios'

class AppList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listInfo: [],
      cate_key: this.props.params.id,
      path: ''
    }
  }
  render () {
    let {listInfo} = this.state
    return (
      <div>
        <section className="list-category-1">
          <div className="backend"></div> 
          <div className="content">
          {
            listInfo.sub_cates?listInfo.sub_cates.map((item,index) => (
              <a onClick={() => { this.setState({path: item.path, cate_key: item.id}); console.log(this.refs.myPull) }} key={index} href="javascript:;">#{item.name}</a> 
            )):''
          }
          </div> 
        </section>
        <AppPullContent changeTag={} ref="myPull" outParams={{url: '/ky/napi/blog/list/by_category/', include_fields: 'sender,album,like_count,msg'}} outPath={this.state.path}  cate_key={this.state.cate_key}></AppPullContent>
      </div>
    )
  }
  getData () {

  }
  componentWillMount () {
    axios.get('/ky/napi/category/detail/', {
      params: {
        app_version: 14,
        app_code: 'mdt',
        category_id: this.props.params.id
      }
    }).then(res => {
      this.setState({listInfo: res.data.data})
    })
  }
}

export default AppList
