import React, { Component } from 'react'
import { hashHistory } from 'react-router'

import axios from 'axios'

import tools from '../../../utils/tools'

import AppPullItem from './AppPullItem'

class AppBlogDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      blogInfo: {},
      leftList: [],
      rightList: [],
      relatedBlogs: [],
      isHiddenBg: true
    }
    this.scrollEvent = this.scrollEvent.bind(this)
  }
  render () {
    let { blogInfo, leftList, rightList, relatedBlogs } = this.state
    return (
      <div>
        {blogInfo.photo?
        <div className="blog-info">
          <img src={tools.steal(blogInfo.photo.path, 'thumb.400_0.')} style={{height: blogInfo.photo.height*350/blogInfo.photo.width}} alt="" />
          <div className="blog-intro">
            <h1>{blogInfo.msg}</h1>
            <div className="sender">
              <img src={tools.steal(blogInfo.sender.avatar, 'thumb.100_100_c.')} alt=""/>
              <p>
                <i className="name">{blogInfo.sender.username}</i><br/>
                <span className="album">收集到&nbsp;&nbsp;{blogInfo.album.name}</span>
              </p>
              <div className="pub-time">{blogInfo.add_datetime_pretty}</div>
            </div>

          </div>
        </div>:''}

        <div className="pull-content clear">
          <div className="pull-left clear">
            {
              leftList.map(item => {
                return <AppPullItem easy={true} key={item.id} info={item} />
              })
            }
          </div>
          <div className="pull-right clear">
            {
              rightList.map(item => {
                return <AppPullItem easy={true} key={item.id} info={item} />
              })
            }
          </div>
          {this.state.isHiddenBg?'':<div className="bg"></div>}
        </div>

        {/**/}
        <div className="recommend">
          <div className="rec-box">
          {
            relatedBlogs.map((item, index) => (
              <div key={item.id}>
                <div className="clear">
                  <span className="l title">{item.name}</span>
                  <span className="r">{item.like_count}人喜欢</span>
                </div>
                <div className="imgs">
                {
                  item.covers.map(imgUrl => (
                    <img key={imgUrl} src={tools.steal(imgUrl, 'thumb.200_200_c.')} alt=""/>
                  ))
                }
                </div>
                {!index?<div className="v-l"></div>:''}
              </div>
            ))
            
          }
          </div>
          <div className="more">点击查看更多</div>
        </div>
      </div>
    )
  }
  getData () {
    let {id} = this.props.params
    let that = this
    // 获取该页详情
    axios.get('/ky/napi/blog/detail/', {
      params: {
        blog_id: id
      }
    }).then(res => {
      this.setState({
        blogInfo: res.data.data
      })
      // 根据该页详情中的album信息获取额外信息
      axios.get('/ky/napi/blog/list/by_root_album/', {
        params: {
          start: 0,
          include_fields: 'sender,album',
          limit: 4,
          album_id: res.data.data.album.id,
          blog_id: id,
          _: new Date().getTime()
        }
      }).then(res => {
        let list = res.data.data.object_list
        that.setState({
          leftList: [list[0], list[2]],
          rightList: [list[1], list[3]]
        })
      })
    })
    // 获取推广信息
    axios.get('/ky/napi/album/list/by_related_blog/', {
      params: {
        blog_id: id
      }
    }).then(res => {
      that.setState({
        relatedBlogs: res.data.data.object_list
      })
    })

  }
  componentWillMount () {
    this.getData()
    window.addEventListener('scroll', this.scrollEvent)
  }
  scrollEvent () {
    let scrollTop = document.documentElement.scrollTop
      let clientHeight = document.body.clientHeight
      let scrollHeight = document.documentElement.scrollHeight
      if (scrollTop >= scrollHeight - clientHeight - 100) {
        this.setState({
          isHiddenBg: false
        })
      } else {
        this.setState({
          isHiddenBg: true
        })
      }
  }
  componentWillUnmount () {
    window.removeEventListener('scroll', this.scrollEvent)
  }
}

export default AppBlogDetail


// https://www.duitang.com/napi/blog/detail/?include_fields=top_like_users,top_forward_users,top_like_users,tags,top_comments,related_albums,extra_links,related_albums.covers,root_album,share_links,share_info,atest_events,extra_html&blog_id=874609838

// http://localhost:3000/ky/napi/blog/detail/
