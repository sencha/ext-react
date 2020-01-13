import React, { Component } from 'react';
import { ExtGrid } from "@sencha/ext-react-classic";
//const Ext = window['Ext'];

class App extends Component {

  constructor() {
    super()
    var data=[
      { name: 'Marc', v: true, email: 'marc@gmail.com',priceChangePct: .25 },
      { name: 'Nick', v: true, email: 'nick@gmail.com',priceChangePct: .35 },
      { name: 'Andy', v: true, email: 'andy@gmail.com',priceChangePct: 1.45 }
    ]
    this.store = { xtype: 'store', data: data }
  }

  renderSign = (value, context) => {
    var iValue = parseInt(value);
    var color;
    if (iValue > 0) { color = 'green'; }
    else { color = 'red'; }
    return `<span style="color:${color};">
    ${value}
    <i class="fa fa-camera-retro fa-lg"></i>
    </span>`
  }

  render() {
    return (
      <ExtGrid
        viewport={ true }
        ref={ grid => this.grid = grid }
        title="The Grid"
        store={ this.store }
        onReady={ this.extReactDidMount }
        columns={[
          {text: "name", dataIndex: "name"},
          {text: "email", dataIndex: "email", flex: "1"},
          {text: "% Change", dataIndex: "priceChangePct", align: "right", producesHTML: false, renderer: this.renderSign}
        ]}
      >
      </ExtGrid>
    )
  }

  componentDidMount = () => {
    console.log('componentDidMount')
    //console.log(this.grid.cmp)
  }

  extReactDidMount = detail => {
     console.log('extReactDidMount')
  }

}
export default App;