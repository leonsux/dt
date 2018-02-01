import React, {Component} from 'react'

import AppShopList from './AppShopList'

class AppShopBlock extends Component {
  render () {
    return (
      <div className="clear pt-title-white">
        <div className="pt-line-title-white-cts clear">
          <div className="l pt-line-title-white-line"></div>
          <div className="l pt-line-title-white-text">{this.props.info.inventory_cat_name}精选</div>
          <div className="l pt-line-title-white-line"></div>
        </div>
        <AppShopList info={this.props.info} />
      </div>
    )
  }
  componentWillMount () {
    // console.log("我是block：", this.props)
  }
}

export default AppShopBlock
