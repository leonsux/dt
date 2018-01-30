import React, { Component } from 'react'

import axios from 'axios'

class AppShopPro extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pro_list: []
    }
  }
  render () {
    return (
      <div className="app-shop-pro">
        <img src="https://b-ssl.duitang.com/uploads/item/201712/27/20171227135914_rXLdY.png" alt="" style={{position: 'absolute', width: '100%', zIndex: '100', marginTop: '15px'}} />
        <section className="pt-line-title-white clr"><div className="pt-line-title-white-ct"><div className="l pt-line-title-white-line"></div><div className="l pt-line-title-white-text">专题</div><div className="l pt-line-title-white-line"></div></div>
        </section>

        <div className="pg-youliao-group-item">
          <div className="swiper-banners"></div>
          <div className="swiper-freemode"></div>
        </div>
      </div>
    )
  }
  componentDidMount () {
    axios.get('ky/napi/buy/index/popular/list/', {
      params: {
        start: 0,
        limit: 5,
        timestamp: new Date().getTime()
      }
    }).then(res => {
      console.log(res)
      this.setState({
        pro_list: res.data.data.object_list
      })
    })
  }
}

export default AppShopPro
