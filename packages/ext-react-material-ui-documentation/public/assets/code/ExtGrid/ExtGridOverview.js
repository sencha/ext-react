//import React from 'react';
//import { ExtGrid } from "@sencha/ext-react-material-ui";

class Rows extends React.Component {

  constructor() {
    super()
    this.store = {
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: codefolder + 'ExtGrid/Overview.json'
      }
    }
  }

  render() {
    return (
      <ExtGrid
        fitToParent
        title='ExtGrid Overview'
        store={ this.store }
        columns={
          [
            {
              text: "name",
              dataIndex: "name",
              cell: { encodeHtml: false, xtype: 'reactcell' },
              renderer: v => <strong>{v}</strong>
            },
            {text: "email", dataIndex: "email", flex: "1"},
            {
              text: "% Change",
              dataIndex: "priceChangePct",
              align: "right",
            }
          ]
        }
      />
    )
  }

}
