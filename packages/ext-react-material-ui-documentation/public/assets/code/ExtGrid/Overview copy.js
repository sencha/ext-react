//import React from 'react';
//import { ExtGrid } from "@sencha/ext-react-material-ui";

class Rows extends React.Component {
  render() {
    return (
      <ExtGrid
        className="center"
        fitToParent
        scrollable={true}
        title="ExtGrid Overview"
        store={
          {
            xtype: 'store',
            data: [
              { name: 'Marc',email: 'marc@gmail.com',priceChangePct: -.25 },
              { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
            ]
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
