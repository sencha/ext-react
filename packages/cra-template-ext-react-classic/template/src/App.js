import React, { Component } from 'react';
import { ExtGrid } from "@sencha/ext-react-classic";

class App extends Component {

  constructor() {
    super()
    var data=[
      { name: 'Marc', email: 'marc@gmail.com',priceChangePct: .25 },
      { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
      { name: 'Andy', email: 'andy@gmail.com',priceChangePct: 1.45 }
    ]
    this.store = { xtype: 'store', data: data }
  }

  extReactDidMount = ({cmp, cmpObj}) => {
    for (var prop in cmpObj) {this[prop] = cmpObj[prop]}
    console.log(this['gridExt'])
  }

  renderSign = (value, context) => {
    var iValue = parseInt(value);
    var color;
    if (iValue > 0)
      { color = 'green'; }
    else
      { color = 'red'; }
    return `<span style="color:${color};">
    ${value}
    <i class="fa fa-percentage fa-lg"></i>
    </span>`
  }

  render() {
    return (
      <ExtGrid
        extname="gridExt"
        viewport={ true }
        ref={ gridReact => this.gridReact = gridReact }
        title="The Grid"
        store={ this.store }
        onReady={ this.extReactDidMount }
        columns={[
          {text: "name", dataIndex: "name"},
          {text: "email", dataIndex: "email", flex: "1"},
          {
            text: "% Change",
            dataIndex: "priceChangePct",
            align: "right",
            producesHTML: false,
            renderer: this.renderSign
          }
        ]}
      >
      </ExtGrid>
    )
  }

}
export default App;