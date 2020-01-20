import React, { Component } from 'react';
import { ExtGrid, ExtGridcolumn } from "@sencha/ext-react-classic";

class GridReact extends Component {

  render() {
    return (
      <ExtGrid
        title = "The Grid React"
        store = {{
          data: [
            { name: 'Marc', email: 'marc@gmail.com',priceChangePct: .25 },
            { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
            { name: 'Andy', email: 'andy@gmail.com',priceChangePct: 1.45 }
          ]
        }}
        hideHeaders = {false}
      >
        <ExtGridcolumn
          dataIndex = 'name'
          text = 'name'
          width = '190'
        />
        <ExtGridcolumn
          dataIndex = 'email'
          text = 'email'
          width = '190'
        />
        <ExtGridcolumn
          dataIndex = 'priceChangePct'
          text = 'priceChangePct'
          width = '190'
        />
      </ExtGrid>
    )
  }

  componentDidMount = () => {
    console.log('GridReact componentDidMount')
    //console.log(this.grid.cmp)
  }

}
export default GridReact;