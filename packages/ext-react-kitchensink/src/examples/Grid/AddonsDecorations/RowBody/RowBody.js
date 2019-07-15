import React, {Component} from 'react';
import { Grid, Column, } from '@sencha/ext-modern';
import model from '../../CompanyModel';

export default class RowBodyGridExample extends Component {
  componentDidMount() {
    const pctChangeColumn = this.refs.pctChangeColumn.cmp;
    pctChangeColumn.setRenderer(this.renderSign.bind(this, '0.00%'));

    const changeColumn = this.refs.changeColumn.cmp;
    changeColumn.setRenderer(this.renderSign.bind(this, '0.00'));
  }

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
        <Column ref="changeColumn" text="Change" width="100" dataIndex="priceChange"/>
        <Column ref="pctChangeColumn" text="% Change" dataIndex="priceChangePct"/>
        <Column text="Last Updated" dataIndex="priceLastChange" width="125" formatter="date('m/d/Y')" />
      </Grid>
    )
  }
    
  renderSign = (format, value,record, dI, cell) => {
    let color = 'black';

    if (value > 0) {
      color = 'green'
    } else if (value < 0) {
      color = 'red'
    }

    cell.setStyle({ color });
    return Ext.util.Format.number(value, format);
  }

}