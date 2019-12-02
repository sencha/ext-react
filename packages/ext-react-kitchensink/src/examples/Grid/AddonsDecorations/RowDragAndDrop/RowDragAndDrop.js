import React, {Component} from 'react';
import { Grid, Column } from '@sencha/ext-react-modern';
import model from '../../CompanyModel';

Ext.require(['Ext.grid.plugin.RowDragDrop']);

export default class RowDragAndDropExample extends Component {
  store = Ext.create('Ext.data.Store', {
      model,
      autoLoad: true,
      pageSize: 0,
      proxy: {
          type: 'ajax',
          url: '/KitchenSink/BigData'
      }
  });

  render() {
      return (
            <Grid
                shadow
                height="100%"
                selectable={{ checkbox: true }}
                store={this.store}
                plugins={{gridrowdragdrop: true}}
            >
                <Column
                  text="Name"
                  dataIndex="fullName"
                  width={150}
                  sortable
                  checked
                />
                <Column
                  text="Email"
                  dataIndex="email"
                  flex={1}
                  sortable
                  checked
                />
            </Grid>
        );
    }
}
