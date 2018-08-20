import React, { Component } from 'react';
import { Grid, Column } from '@sencha/ext-modern';
import model from '../CompanyModel';
import './data';

export default class BasicGridExample extends Component {

  store = Ext.create('Ext.data.Store', {
//    model,
    autoLoad: true,
    pageSize: 0,
    proxy: {
      type: 'ajax',

      url: 'resources/data/CompanyData.json'
    } 

  //   data: [{
  //     "id": 1,
  //     "company": "abc",
  //     "name": "Roodel",
  //     "phone": "602-736-2835",
  //     "price": 59.47,
  //     "priceChange": 1.23,
  //     "priceLastChange": "10/8",
  //     "industry": "Manufacturing",
  //     "desc": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
  //     "priceChangePct": 2.11
  // }]



  });

  render() {
    return (
      <Grid title="Stock Prices" store={this.store} shadow grouped>
        <Column text="Company" dataIndex="name" width="150"/>
        <Column text="Price" width="85" dataIndex="price" formatter='usMoney'/>
        <Column 
          text="Change" 
          width="100" 
          dataIndex="priceChange" 
          renderer={this.renderSign.bind(this, '0.00')}
        />
        <Column 
          text="% Change" 
          dataIndex="priceChangePct" 
          renderer={this.renderSign.bind(this, '0.00')}
        />
        <Column text="Last Updated" width="125" dataIndex="lastChange" formatter='date("m/d/Y")'/>
    </Grid>
    )
  }

 renderSign = (format, value) => (
      <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
          {Ext.util.Format.number(value, format)}
      </span>
  ) 

}