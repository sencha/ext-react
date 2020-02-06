import React, { Component } from 'react';
import { Container, Grid } from "@sencha/ext-react-modern";
//import data from './mockdata';
const Ext = window['Ext']

Ext.require("Ext.grid.plugin.Summary");
Ext.require("Ext.grid.plugin.RowExpander");
Ext.require("Ext.data.summary.*");
Ext.require("Ext.grid.filters.*");
Ext.require("Ext.pivot.*");

var store ={
  type: 'virtual',
  fields: [
    'firstName', 'lastName', 'address', 'company', 'title',
    {
      name: 'id',
      type: 'int'
    }],
  proxy: {
    type: 'ajax',
    url: 'https://llbzr8dkzl.execute-api.us-east-1.amazonaws.com/production/user',
    reader: {
      rootProperty: 'users',
      totalProperty: 'totalCount'
    }
  },
  pageSize: 25,
  autoLoad: true
}


const virtualGridColumns = [
  {
    text: 'firstName',
    dataIndex: 'firstName'
  },
  {
    text: 'lastName',
    dataIndex: 'lastName'
  }
]

class virtualgrid extends Component {
  rowTpl2 (record) {
    console.log('rowTpl');
    return <div style={{ height: '20px', background: 'lightblue' }}>{record.firstName}</div>
  }

  rowTpl3 =(record) => (<div style={{ height: '20px', background: 'lightblue' }}>{record.firstName}</div>
  )

  rowTpl = (value, context) => (
    <div >
      <span>hi</span>
      <ext-button shadow="true" text="hello"></ext-button>
    </div>
  )

  rowTplStringA = (value, context) => { return 'hi'}

  rowTplString = function(value, context) { return 'hi'}

  toggleRow (grid, target) {
    console.log('row toggled');

    target.record.set('email', 'changed');
  }

  render() {
    return (
      <Container
        layout="vbox"
        shadow
        className="test-class-name"
        maxHeight="100vh"
      >
          <Grid
          title="another grid"
            height={400}
            weighted
            store = {store}
            columns={virtualGridColumns}
            infinite
            // plugins={{
            //   rowexpander: {
            //     column: {
            //       width: 35,
            //     },
            //   },
            // }}

            // itemConfig={{
            //   body: {
            //     tpl: this.rowTplString
            //   },
            // }}

            // itemConfig={{
            //   body: {
            //     tpl: function() { return 'hello'},
            //   },
            // }}

            // itemConfig={{
            //   body: {
            //     tpl: 'hello {firstName}',
            //   },
            // }}

            itemConfig={{
              body: {
                tpl: this.rowTpl,
              },
            }}
            listeners={{
              childtap: this.toggleRow
            }}
            variableHeights
          />
      </Container>

    )
  }
}
export default virtualgrid;