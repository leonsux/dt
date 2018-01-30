import React, { Component } from 'react'
import axios from 'axios'

import AppPullItem from './AppPullItem'

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
    this.getDate = this.getData.bind(this)
  }
  render () {
    let {leftList, rightList} = this.state
    return (
      <div ref="myPull" className="pull-content clear">
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
  getData (isChangeTag, path, key) {
    this.setState({
      isLoading: true
    })
    let outPath = ''
    let cate_key = ''
    let url = '/ky/napi/index/hot/'
    let include_fields = 'sender,album'
    let { start, limit, leftList, rightList } = this.state  

    if (this.props.outParams) {
      console.log("列表古来的")
      url = this.props.outParams.url
      include_fields = this.props.outParams.include_fields
      cate_key = this.props.outParams.cate_key
    }

    if (isChangeTag) {
      console.log("换换")
      this.setState({
        itemList: [],
        leftList: [],
        rightList: [],
        start: 0,
        limit: 24,
        isLoading: true
      })
      leftList = []
      rightList = []
      console.log("你们很皮啊：", this.state)
      outPath = path
      cate_key = key
    }

    // 
    console.log("请求参数：", start, include_fields, limit, cate_key, outPath)
    axios.get(url, {
      params: {
        start: start,
        include_fields: include_fields,
        limit: limit,
        cate_key: cate_key,
        path: outPath,
        _: new Date().getTime()
      }
    }).then(res => {
      console.log("请求原结果：", res.data)
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
      console.log("请求结果", this.state.leftList)
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
}

export default AppPullContent


// https://www.duitang.com/napi/blog/list/by_category/?start=0&include_fields=sender%2Calbum%2Clike_count%2Cmsg&limit=24&cate_key=5017d172705cbe10c0000003&path=&_=1517035030220

