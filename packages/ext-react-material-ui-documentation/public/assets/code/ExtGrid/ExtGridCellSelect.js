//import React from 'react';
//import { ExtGrid } from "@sencha/ext-react-material-ui";

class Rows extends React.Component {

  constructor() {
    super()
    this.store = {
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: datafolder + 'grid.json'
      }
    }
    this.selectable = {
      mode: 'single',
      deselectable: true,
      rows: false,
      columns: false
    }
  }

  //onChildTap(){
  onChildTap({sender, location}){
    if (location.cell.dataIndex == 'name') {
      new Ext.tip.ToolTip({
        target: location.cell,
        html: 'Here is some help text about this!'
      });
      sender.select(sender.getStore().getAt(location.recordIndex));
    }
  }

  render() {
    return (
      <ExtGrid
        fitToParent
        title='ExtGrid Overview'
        store={ this.store }
        selectable = { this.selectable }
        onChildtap={ this.onChildTap }
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
