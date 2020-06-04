import React, { Component } from 'react';
import { ExtGrid } from "@sencha/ext-react-classic";

class App extends Component {

  extReactDidMount = ({cmp, cmpObj}) => {
    for (var prop in cmpObj) {this[prop] = cmpObj[prop]}
  }

  renderSign = (value, context) => {
    var iValue = parseInt(value);
    var color;
    if (iValue > 0)
      { color = 'green'; }
    else
      { color = 'red'; }
    return `<span style="color:${color};">${value}%</span>`
  }

  render() {
    return (
      <ExtGrid
        viewport={ true }
        extname="gridExt"
        ref={ gridReact => this.gridReact = gridReact }
        onReady={ this.extReactDidMount }
        title="The Grid"
        store={
          {
            xtype: 'store',
            data: [
              { name: 'Marc', email: 'marc@gmail.com',priceChangePct: .25 },
              { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
              { name: 'Andy', email: 'andy@gmail.com',priceChangePct: 1.45 }
            ]
          }
        }
        columns={[
          {text: "name", dataIndex: "name"},
          {text: "email", dataIndex: "email", flex: "1"},
          {text: "% Change", dataIndex: "priceChangePct", align: "right", renderer: this.renderSign}
        ]}
      >
      </ExtGrid>
    )
  }

}
export default App;