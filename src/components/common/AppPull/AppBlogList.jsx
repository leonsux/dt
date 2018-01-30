
import React, { Component } from 'react'
import { hashHistory } from 'react-router'

// import axios from 'axios'

// import tools from '../../../utils/tools'


class AppBlogList extends Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }
  render () {
    return (
      <div>
         {this.props.params.id}
      </div>
    )
  }
}
export default AppBlogList


// https://www.duitang.com/napi/blog/detail/?include_fields=top_like_users,top_forward_users,top_like_users,tags,top_comments,related_albums,extra_links,related_albums.covers,root_album,share_links,share_info,atest_events,extra_html&blog_id=874609838

// http://localhost:3000/ky/napi/blog/detail/
