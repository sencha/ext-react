import React, { Component } from 'react';
import { Grid, Column } from '@sencha/ext-modern';

export default class AppGrid extends Component {

  store = {
    autoLoad: true,
    fields: ['name', 'email', 'phone'],
    data: [
      { name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
      { name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
      { name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
      { name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
    ]
  }

  render() {
    const cols = ['name','email','phone'];

    return (
      <Grid store={this.store} title="Grid with dynamic columns">
        { Object.keys(cols).map((col, i) => (
          <Column
            key={i}
            text={cols[col]}
            dataIndex={cols[col]}
          />
        ))}
      </Grid> 
    )
  }

}