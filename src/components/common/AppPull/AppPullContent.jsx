import React, { Component } from 'react'
import axios from 'axios'

import AppPullItem from './AppPullItem'

// import AppBanner from './AppBanner'

class AppPullContent extends Component {
  constructor (props) {
    super(props)
    this.state = {
      itemList: [],
      leftList: [],
      rightList: []
    }
  }
  render () {
    let {leftList, rightList} = this.state
    return (
      <div className="pull-content clear">
        <div ref="leftList" className="pull-left clear">
          {
            leftList.map(item => {
              return <AppPullItem key={item.id} info={item} />
            })
          }
        </div>
        <div ref="rightList" className="pull-right clear">
          {
            rightList.map(item => {
              return <AppPullItem key={item.id} info={item} />
            })
          }
        </div>
      </div>
    )
  }
  componentWillMount () {
    axios.get('/ky/napi/index/hot/', {
      params: {
        start: 0,
        include_fields:'sender, album',
        limit: 24,
        _: new Date().getTime()
      }
    }).then(res => {
      let list = res.data.data.object_list
      let leftArr = []
      let rightArr = []
      list.forEach((item, index) => {
        if (index % 2 === 0) {
          leftArr.push(item)
        } else {
          rightArr.push(item)
        }
      })
      this.setState({
        leftList: leftArr,
        rightList: rightArr
      })
    }).catch(res => {
      alert(res)
    })
    // 滚动事件
    window.onscroll = (e) => {
      let scrollTop = document.documentElement.scrollTop
      let clientHeight = document.body.clientHeight
      let scrollHeight = document.documentElement.scrollHeight
      if (scrollTop >= scrollHeight - clientHeight - 400) {
        console.log("底部~")
      }
    }
  }
}


export default AppPullContent
// 3925
// {
//           itemList.length?itemList.map(item => {
//             return <AppPullItem info={item} />
//           }):''
//         }
