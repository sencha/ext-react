//import React from 'react';
//import { ExtGrid } from "@sencha/ext-react-material-ui";
//import data from './data';

class Rows extends React.Component {
  render() {
    return (
      <ExtGrid
        fitToParent
        title="ExtGrid Overview"
        store={
          {
            xtype: 'store',
            data: data
          }
        }
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
