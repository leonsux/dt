import React, { Component } from 'react'
import axios from 'axios'

import AppPullItem from './AppPullItem'

import { connect } from 'react-redux'

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
    let url = '/ky/napi/index/hot/'
    let cate_key = ''
    let include_fields = 'sender,album'
    console.log("props是:", this.props)
    if (this.props.outParams) {
      url = this.props.outParams.url
      include_fields = this.props.outParams.include_fields
    }
    if (this.props.cate_key) {
      console.log(this.props.cate_key)
      cate_key = this.props.cate_key
    }
    // 
    axios.get(url, {
      params: {
        start: start,
        include_fields: include_fields,
        limit: limit,
        cate_key: cate_key,
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
  componentWillUpdate () {
    console.log("刚刚")
  }
  changeTag () {
    alert("被调用了")
  }
}

let mapStateToProps = (store) => {
  return store
}

let mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppPullContent)


// https://www.duitang.com/napi/blog/list/by_category/?start=0&include_fields=sender%2Calbum%2Clike_count%2Cmsg&limit=24&cate_key=5017d172705cbe10c0000003&path=&_=1517035030220

