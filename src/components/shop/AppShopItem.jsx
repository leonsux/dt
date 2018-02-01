import React, { Component } from 'react'

import tools from '../../utils/tools'

class AppShopItem extends Component {
  render () {
    let {info} = this.props
    return (
      <div className="cp-shop-item">
        {/*{info.pictures[0]}       */}
        <img src={tools.steal(info.pictures[0], 'thumb.400_400_c.')} alt=""/>
        <div>
          <h5 className="sale-title">{info.inventory_caption}</h5>
          <p className="sale-intro">{info.inventory_name}</p>
          <p className="sale-count">已售&nbsp;{info.sold_quantity}</p>
          <div className="sale-price">￥{info.sale_price}</div>
        </div>
      </div>
    )
  }
  componentWillMount () {
    console.log(this.props.info)
  }
}

export default AppShopItem
