import React, { Component } from 'react';
import { ExtGrid } from "@sencha/ext-react-material-ui";

export default class AnotherCalendar extends Component {
  render() {
    return (
      <ExtGrid
        className="center"
        scrollable={true}
        title="ExtReact Grid"
        store={
          {
            xtype: 'store',
            data: [
              { name: 'Marc',email: 'marc@gmail.com',priceChangePct: -.25 },
              { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
              { name: 'Andy', email: 'andy@gmail.com',priceChangePct: 1.45 },
              { name: 'Marc',email: 'marc@gmail.com',priceChangePct: -.25 },
              { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
              { name: 'Andy', email: 'andy@gmail.com',priceChangePct: 1.45 },
              { name: 'Marc',email: 'marc@gmail.com',priceChangePct: -.25 },
              { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
              { name: 'Andy', email: 'andy@gmail.com',priceChangePct: 1.45 },
              { name: 'Marc',email: 'marc@gmail.com',priceChangePct: -.25 },
              { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
              { name: 'Andy', email: 'andy@gmail.com',priceChangePct: 1.45 },
              { name: 'Marc',email: 'marc@gmail.com',priceChangePct: -.25 },
              { name: 'Nick', email: 'nick@gmail.com',priceChangePct: .35 },
              { name: 'Andy', email: 'andy@gmail.com',priceChangePct: 1.45 },
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
