import React, {Component} from 'react';
import { Grid, Column, } from '@sencha/ext-react-modern';
import model from '../../CompanyModel';

export default class RowBodyGridExample extends Component {

  store = Ext.create('Ext.data.Store', {
    model,
    autoLoad: true,
      pageSize: 0,
      proxy: {
          type: 'ajax',
          url: 'resources/data/CompanyData.json'
      }
  });

  tpl = data => (
    <div>
      <div>Industry: {data.industry}</div>
      <div>Last Updated: {Ext.util.Format.date(data.lastChange, "Y-m-d g:ia")}</div>
      <div style={{marginTop:'1em'}}>{data.desc}</div>
    </div>
  );

render() {
    return (
      <Grid
          title="Row Body Grid"
          store={this.store}
          shadow
          itemConfig={{
              body:{
                  tpl: this.tpl
              }
          }}
      >
        <Column text="Company" dataIndex="name" width="150"/>
        <Column text="Price" dataIndex="price" width="75" formatter="usMoney"/>
        <Column text="Change" width="100" dataIndex="priceChange" renderer={this.renderSign.bind(this, '0.00')}/>
        <Column text="% Change" dataIndex="priceChangePct" renderer={this.renderSign.bind(this, '0.00')}/>
        <Column text="Last Updated" dataIndex="priceLastChange" width="125" formatter="date('m/d/Y')" />
      </Grid>
    )
  }

 renderSign = (format, value) => (
        <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
            {Ext.util.Format.number(value, format)}
        </span>
  )

}