import React, { Component } from 'react'

import axios from 'axios'

import tools from '../../utils/tools'

import AppShopBlock from './AppShopBlock'

class AppShopPro extends Component {
  constructor (props) {
    super(props)
    this.state = {
      pro_list: [],
      second: '',
      start: 0,
      isLoading: true,
      block_list: []
    }
    this.scrollEvent = this.scrollEvent.bind(this)
  }
  render () {
    let that = this
    let {pro_list, block_list} = this.state
    return (
      <div className="app-shop-pro">
        <img src="https://b-ssl.duitang.com/uploads/item/201712/27/20171227135914_rXLdY.png" alt="" style={{position: 'absolute', width: '100%', zIndex: '100', marginTop: '15px'}} />
        <section className="pt-line-title-white clr"><div className="pt-line-title-white-ct"><div className="l pt-line-title-white-line"></div><div className="l pt-line-title-white-text">专题</div><div className="l pt-line-title-white-line"></div></div>
        </section>
        {
          pro_list.map((item, index) => {
            switch(item.display_type) {
              case 1:
                return (
                  <div key={index} className="pg-youliao-group-item">
                    <div className="swiper-banners">
                      {item.stitle?<div className="backend"></div>:''}
                      <img src={tools.steal(item.image_url?item.image_url:'','thumb.750_0_c.')} alt=""/>
                      <div className="pro-intro">
                        <h3>{item.stitle}</h3>
                        <h2>{item.description}</h2>
                        {item.stitle?<div>查看详情</div>:''}
                      </div>
                    </div>
                    <div className="swiper-freemode">
                      <div style={{width: item.inventory_list.length*100+'px'}}>
                      {                        
                        item.inventory_list.map((value, i) => (
                          <div key={i} className="swiper-item-foreshow">
                            {/*{console.log("恩恩", value)}*/}
                            <img src={tools.steal(value.carousel_pictures[0].picture, 'thumb.200_200_c.')} alt=""/>
                            <p>{value.inventory_caption}</p>
                            <span>￥{value.sale_price}</span>
                          </div>
                        ))

                      }
                      </div>
                    </div>
                  </div>
                )
              case 2: 
                let second = item.disabled_at-new Date().getTime()/1000
                return (
                  <div key={index} className="pg-youliao-group-item">
                    <div className="swiper-banners">
                      <div className="backend"></div>
                      <img src={tools.steal(item.image_url?item.image_url:'','thumb.750_0_c.')} alt=""/>
                      <div className="swiper-container-text">
                        <div className="pg-vipsale-txt-cont">
                          <h2 className="pg-vipsale-title">{item.description}</h2>
                          <div className="pg-title-time">
                            <span>{Math.floor(second/3600)}</span>:
                            <span>{Math.floor((second/3600-Math.floor(second/3600))*60)}</span>:
                            <span>{Math.floor(second%60)}</span>
                          </div>
                          <div>查看详情 ></div>

                        </div>
                      </div>
                    </div>
                    <div className="swiper-freemode">
                      <div style={{width: item.inventory_list.length*100+'px'}}>
                      {
                        item.inventory_list.map((value, i) => (
                          <div key={i} className="swiper-item-foreshow">
                            {/*{console.log("恩恩", value)}*/}
                            <img src={tools.steal(value.carousel_pictures[0].picture, 'thumb.200_200_c.')} alt=""/>
                            <p>{value.inventory_caption}</p>
                            <span>￥{value.sale_price}</span>
                          </div>
                        ))

                      }
                      </div>
                    </div>
                  </div>
                )
            }
          })
        }
        {/**/}
        {
          block_list.map((item, index) => (
            <AppShopBlock key={index} info={item} />
          ))
        }
      </div>
    )
  }
  scrollEvent () {
    if (this.state.isLoading) { return }
    let scrollTop = document.documentElement.scrollTop
    let clientHeight = document.body.clientHeight
    let scrollHeight = document.documentElement.scrollHeight
    if (scrollTop >= scrollHeight - clientHeight - 1000) {
      if (this.state.start + 5 >= 15) {
        window.removeEventListener('scroll', this.scrollEvent)
        axios.get('ky/napi/buy/inventory/list/by_cat/recommend/', {
          params: {
            timestamp: new Date().getTime()
          }
        }).then(res => {
          // 获取完pro后获取
          // console.log(res.data.data.object_list)
          this.setState({
            block_list: res.data.data.object_list
          })
        })
      }
      this.setState(state => {
        return {
          start: state.start + 5
        }
      })
      this.getData()
    }
  }
  getData () {
    this.setState({
      isLoading: true
    })
    axios.get('ky/napi/buy/index/popular/list/', {
      params: {
        start: this.state.start,
        limit: 5,
        timestamp: new Date().getTime()
      }
    }).then(res => {
      let arr = this.state.pro_list.concat(res.data.data.object_list)
      this.setState({
        pro_list: arr,
        isLoading: false
      })
      // console.log(this.state.pro_list)

    }) 
  }
  componentWillMount () {
    this.getData()
    window.addEventListener('scroll', this.scrollEvent)
  }
  componentWillUnmount () {
    // 切换到其他组件的时候把滚动监听取消掉，不然后果很可怕
    window.removeEventListener('scroll', this.scrollEvent)
    // console.log("我要死了")
  }
}

export default AppShopPro

// https://b-ssl.duitang.com/uploads/people/201801/23/20180123180940_UHZrj.thumb.750_0_c.jpeg
// https://b-ssl.duitang.com/uploads/people/201801/23/20180123180940_UHZrj.jpeg

// https://b-ssl.duitang.com/uploads/item/201801/30/20180130233425_iXHmR.thumb.600_0_c.jpeg
// https://b-ssl.duitang.com/uploads/item/201801/30/20180130233425_iXHmR.jpeg

// 1517360402

// 1517360402000

// napi/buy/inventory/list/by_cat/recommend/
