import React, { Component } from 'react'
import axios from 'axios'

import { Carousel, WhiteSpace, WingBlank } from 'antd-mobile'

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
      <div>
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
                  src={val.image.slice(0, 70)+'thumb.600_0_c.'+val.image.slice(70)}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top', height: '100%' }}
                  onLoad={() => {
                    {/*// fire window resize event to change height*/}
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                  onError={() => { this.refs[val.album_id].src='https://b-ssl.duitang.com/uploads/item/201801/16/20180116180325_ZFa8c.jpeg' }}
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
    .then(res =>{
      this.setState({banners: res.data.data.object_list})
      console.log(res)
    })
  }
}

export default AppBanner


// https://b-ssl.duitang.com/uploads/item/201801/17/20180117122706_tVPXe.thumb.600_0_c.jpeg

// https://b-ssl.duitang.com/uploads/item/201801/17/20180117122706_tVPXe.jpeg

// https://b-ssl.duitang.com/uploads/item/201801/19/20180119185427_KMsne.thumb.600_0_c.jpeg

// https://b-ssl.duitang.com/uploads/item/201801/22/20180122145411_zSBWc.thumb.600_0_cpng
// https://b-ssl.duitang.com/uploads/item/201801/22/20180122145411_zSBWc.thumb.600_0_cng

// https://b-ssl.duitang.com/uploads/item/201801/22/20180122145411_zSBWc.thumb.600_0_c.png

// https://b-ssl.duitang.com/uploads/item/201801/22/20180122145411_zSBWc.png


