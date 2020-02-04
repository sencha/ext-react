import React, { Component } from 'react';
import { ExtGrid } from "@sencha/ext-react-classic";

class Grid extends Component {

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
    return `<span data-qtip = "Hola" style="color:${color};">
    ${value}
    <i class="fa fa-camera-retro fa-lg"></i>
    </span>`
  }

  render() {
    return (
      <ExtGrid
        xtype = 'custom-grid-xtype'
        ref = { grid => this.grid = grid }
        title = "The Grid"
        store = { this.store }
        onReady = { this.extReactDidMount }
        plugins = {[
          {
            ptype: 'cellediting',
            clicksToEdit: 1
          },
          {
            ptype: 'gridfilters'
          },
          {
            ptype: 'rowexpander',
            rowBodyTpl:[
              '<p><b>Company:</b> {name}</p>'
            ]
          }
        ]}
        viewConfig = {{
          plugins: [
            {
              ptype: 'gridviewdragdrop',
              dragGroup: 'test',
              dropGroup: 'test'
            }
          ]
        }}
        selModel = {{
          type: 'checkboxmodel',
          checkOnly: true,
          showHeaderCheckbox: false,
        }}
        columns={[
          {
            xtype: 'rownumberer'
          },
          {
            text: "name",
            dataIndex: "name",
            locked: true,
            filter: true,
            editor: {
              xtype: 'textfield',
              allowBlank: false,
            }
          },
          {text: "email", dataIndex: "email", width: 200},
          {text: "email", dataIndex: "email", width: 200},
          {text: "email", dataIndex: "email", width: 200},
          {text: "email", dataIndex: "email", width: 200},
          {text: "email", dataIndex: "email", width: 200},
          {text: "email", dataIndex: "email", width: 200},
          {text: "email", dataIndex: "email", width: 200},
          {text: "email", dataIndex: "email", width: 200},
          {text: "email", dataIndex: "email", width: 200},
          {text: "email", dataIndex: "email", width: 200},
          {text: "email", dataIndex: "email", width: 200},
          {text: "email", dataIndex: "email", width: 200},
          {text: "email", dataIndex: "email", width: 200},
          {text: "email", dataIndex: "email", width: 200},
          {text: "% Change", dataIndex: "priceChangePct", align: "right", producesHTML: false, renderer: this.renderSign}
        ]}
        bbar = {{
          xtype: 'toolbar',
          items: [
            {
              xtype: 'pagingtoolbar',
              displayInfo: true,
              displayMsg: 'Displaying records {0} - {1} of {2}',
              emptyMsg: 'There are no records yet on this grid.',
              store: this.store,
              padding: 0
            }
          ]
        }}
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
export default Grid;