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
        <Carousel
          autoplay={false}
          infinite
          selectedIndex={0}
          beforeChange={(from, to) => {}}
          afterChange={index => {}}
        >
          {
            this.state.banners.map(val => (
              <a
                key={val.album_id}
                href="http://leonsux.top"
                style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight, position: 'relative' }}
              >
                <span style={{ position: 'absolute', display: 'block', width: '100%', height: '100%', background: '#000', opacity: '0.2'}}></span>
                <img
                  src={val.image.slice(0, 70)+'thumb.600_0_c.'+val.image.slice(70)}
                  alt=""
                  style={{ width: '100%', verticalAlign: 'top', height: '100%' }}
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    {/*this.setState({ imgHeight: 'auto' });*/}
                  }}
                  onerror="this.src=''https://upload.jianshu.io/users/upload_avatars/3629578/d80d6cf5-d91b-4409-8561-f1dd2b95f1ec.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/120/h/120"
                />
                <span style={{ position: 'absolute', zIndex: '999', left: '12',bottom: '25',color: '#fff' }}>
                  <span style={{ display: 'block', fontSize: '12'}}>{val.timestamp}</span>
                  <span style={{ display: 'block', fontSize: '20'}}>{val.title}</span>
                </span>
              </a>
            ))
          }
        </Carousel>
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


