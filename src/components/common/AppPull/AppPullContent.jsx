import React, { Component } from 'react'
import ReactDOM from 'react-dom'

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
              return <AppPullItem info={item} />
            })
          }
        </div>
        <div ref="rightList" className="pull-right clear">
          {
            rightList.map(item => {
              return <AppPullItem info={item} />
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
    
  }
}


export default AppPullContent

// {
//           itemList.length?itemList.map(item => {
//             return <AppPullItem info={item} />
//           }):''
//         }
