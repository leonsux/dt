import React, { Component } from 'react'

import AppShopItem from './AppShopItem'

class AppShopList extends Component {
  render () {
    return (
      <div className="pg-single-content clear">
        {
          this.props.info.rec_list.map((item, index) => (
            <AppShopItem key={item.id} info={item} />
          ))
        }
      </div>
    )
  }
  componentWillMount () {
    // console.log(this.props.info)
  }
}

export default AppShopList
