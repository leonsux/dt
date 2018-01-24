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
      rightList: [],
      start: 0,
      limit: 24,
      isLoading: true
    }
    this.scrollEvent = this.scrollEvent.bind(this)
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
  getData () {
    this.setState({
      isLoading: true
    })
    let { start, limit, leftList, rightList } = this.state
    axios.get('/ky/napi/index/hot/', {
      params: {
        start: start,
        include_fields:'sender,album',
        limit: limit,
        _: new Date().getTime()
      }
    }).then(res => {
      let list = res.data.data.object_list
      let leftArr = leftList
      let rightArr = rightList
      list.forEach((item, index) => {
        if (index % 2 === 0) {
          leftArr.push(item)
        } else {
          rightArr.push(item)
        }
      })
      this.setState(state => {
        return {
          leftList: leftArr,
          rightList: rightArr,
          isLoading: !state.isLoading
        }
      })
    }).catch(res => {
      alert(res)
    })
  }
  componentWillMount () {
    this.getData()
    // 滚动事件
    window.addEventListener('scroll', this.scrollEvent)
  }
  scrollEvent () {
    console.log("别这样", this)
    if (this.state.isLoading) { return }
    let scrollTop = document.documentElement.scrollTop
    let clientHeight = document.body.clientHeight
    let scrollHeight = document.documentElement.scrollHeight
    if (scrollTop >= scrollHeight - clientHeight - 1000) {
      this.setState(state => {
        return {
          start: state.start + 24
        }
      })
      this.getData()
    }
  }
  componentWillUnmount () {
    // 切换到其他组件的时候把滚动监听取消掉，不然后果很可怕
    window.removeEventListener('scroll', this.scrollEvent)
    // console.log("我要死了")
  }
}


export default AppPullContent
