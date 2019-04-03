import React, { Component } from 'react';
import { Grid, Column } from '@sencha/ext-modern';

Ext.require('widget.renderercell')

export default class AppRender extends Component {

  cell = {encodeHtml:false}
  store = Ext.create('Ext.data.Store', {
      fields: ['firstname', 'lastname', 'dept', 'dob'],
      data: [
          {id: 111, active: true,  "fName":"Benjamin","lName":"Banks",     "dept":"Services",     dob: new Date("1/1/1960") },
          {id: 222, active: false, "fName":"Donald",  "lName":"Rodriguez", "dept":"Marketing",    dob: new Date("1/1/1960")},
          {id: 333, active: true,  "fName":"Tom",     "lName":"Thumb",     "dept": "Development", dob: new Date("1/1/1960")}
      ]
  });

  render() {

    return (

      <Grid store={this.store}>
      <Column text="First" dataIndex="fName" flex={1} />
      <Column text="Last" dataIndex="lName" flex={1} />
      <Column text="Department" dataIndex="dept" flex={1}
      
      
            cell={this.cell}
      
      
              renderer={ (v, r) => {
                  return(<span style={{ color: 'pink' }}>{v}</span>);
              }}
      />
  </Grid>

    )
  }

}