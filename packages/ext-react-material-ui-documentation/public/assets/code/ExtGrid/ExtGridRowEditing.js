//import React from 'react';
//import { ExtGrid } from "@sencha/ext-react-material-ui";

class RowEditing extends React.Component {
  constructor() {
    super()
    this.plugins = {
      rowedit: {
          // selectOnEdit: true
          autoConfirm: false
      }
    }
    this.store = {
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: datafolder + 'names.json'
      }
    }
  }

  render() {
    return (
      <ExtGrid
        fitToParent
        title="ExtGrid - Row Editing"
        plugins={this.plugins}
        store={this.store}
        columns={
          [
            {
              text: "name",
              dataIndex: "name",
              editable: true,
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
