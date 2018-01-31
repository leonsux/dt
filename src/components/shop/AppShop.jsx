import React, { Component } from 'react'

import AppShopNav from './AppShopNav'
import AppBanner from '../main/AppBanner'

import AppShopPro from './AppShopPro'

import axios from 'axios'

class AppShop extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sales: []
    }
  }
  render () {
    let {sales} = this.state
    return (
      <div>
        <AppBanner />
        <AppShopNav />
        <div className="sale-entry">
          <img src="https://b-ssl.duitang.com/uploads/item/201712/27/20171227135914_ixjCd.png" alt="" style={{position: 'absolute', width: '100%'}} />
          <img src="https://b-ssl.duitang.com/uploads/item/201712/27/20171227135913_caC4Y.png" alt="" style={{position: 'absolute', width: '55px', left: '25.8%', top: '96px', zIndex: '100'}} />
          <ul className="clear">
          {
          sales.length?(sales.map((item, index) => (
            <li key={index} className="l cp-youliao-sale-entry-item">
              <a href="/buy/newSingleGoods/?__urlopentype=pageweb" className="cp-youliao-sale-entry-link">
                <div className="blackTop"></div>
                <div className="cp-youliao-sale-entry-title">{item.enter_main_title}</div>
                <div className="cp-youliao-sale-entry-subtitle">{item.enter_sub_title}</div>
                <div className="cp-youliao-sale-entry-img-box">
                  <img src={item.enter_image_url} className="cp-youliao-sale-entry-img" />
                </div>
                <div className="blackRight"></div>
              </a>
              <div className="blackBottom"></div>
            </li>))):''
          }
          </ul>
        </div>
        <AppShopPro />
      </div>
    )
  }
  componentDidMount () {
    axios.get('ky/napi/buy/index/module/info/', {
      params: {
        type: '3,4,7',
        timestamp: new Date().getTime()
      }
    }).then(res => {
      this.setState({
        sales: res.data.data.object_list
      })
    })
  }
}

export default AppShop
