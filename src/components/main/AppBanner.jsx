import React, { Component } from 'react'
import axios from 'axios'

import { Carousel } from 'antd-mobile'

import tools from '../../utils/tools'

class AppBanner extends Component {
  constructor () {
    super()
    this.state = {
      banners: [],
      data: ['1', '2', '3'],
      imgHeight: 232,
      slideIndex: 0,
    }
  }
  render () {
    return (
      <div className="app-banner" style={{height: '232px'}}>
        {this.state.banners.length?
        <Carousel
          autoplay={true}
          infinite
          beforeChange={(from, to) => {}}
          afterChange={index => {}}
        >
          {
            this.state.banners.map(val => (
              <a
                key={val.album_id}
                href="http://leonsux.top"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight}}
              >
                <span style={{ position: 'absolute', display: 'block', width: '100%', height: '100%', background: '#000', opacity: '0.2', zIndex: '1'}}></span>
                <img
                  ref={val.album_id}
                  src={tools.steal(val.image, 'thumb.600_0_c.')}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top', height: '100%' }}
                  onLoad={() => {
                    window.dispatchEvent(new Event('resize'));
                  }}
                  onError={() => { this.refs[val.album_id].src='https://file.digitaling.com/eImg/uimages/20150907/1441607540794971.gif' }}
                />
                <span style={{ position: 'absolute', zIndex: '2', left: '12px',bottom: '25px',color: '#fff' }}>
                  <span style={{ display: 'block', fontSize: '12px'}}>{val.timestamp}</span>
                  <span style={{ display: 'block', fontSize: '20px'}}>{val.title}</span>
                </span>
              </a>
            ))
          }
        </Carousel>:''}
      </div>
    )
  }
  componentWillMount () {
    axios.get('/ky/napi/mbanner/', {
      params: {
        app_code: 'mdt'
      }
    })
    .then(res => {
      this.setState({banners: res.data.data.object_list})
    })
  }
}

export default AppBanner

// val.image.slice(0, 70)+'thumb.600_0_c.'+val.image.slice(70)
