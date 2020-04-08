import React, {Component} from 'react';
import { Column, Grid } from '@sencha/ext-react-modern';
import model from '../../CompanyModel';

Ext.require([
    'Ext.grid.filters.*'
]);

export default class GridFilteringExample extends Component {

  store = {
    xtype: 'store',
    model,
    autoLoad: true,
    pageSize: 0,
    proxy: {
      type: 'ajax',
      url: '/KitchenSink/BigData'
    }
  };

  nameSorter = (rec1, rec2) => {
    // Sort prioritizing surname over forename as would be expected.
    var rec1Name = rec1.get('surname') + rec1.get('forename'),
        rec2Name = rec2.get('surname') + rec2.get('forename');

    if (rec1Name > rec2Name) {
        return 1;
    }

    if (rec1Name < rec2Name) {
        return -1;
    }

    return 0;
  }

  render() {
    return (
      <Grid
        plugins={{
            gridfilters: true
        }}
        rowNumbers
        shadow
        store={this.store}
        title='Grid Filters'
      >
        <Column
          dataIndex='employeeNo'
          filter='number'
          flex={1}
          minWidth={100}
          text='Id'
        />
        <Column
          dataIndex='fullName'
          filter='string'
          minWidth={150}
          sorter={{
              sorterFn: this.nameSorter
          }}
          text='Name'
        />
        <Column
          dataIndex='dob'
          editable
          formatter='date("m/d/Y")'
          text='Date of Birth'
          width={115}
        />
        <Column
          dataIndex='noticePeriod'
          editable
          filter='string'
          text='Notice Period'
        />
        <Column
          align='center'
          dataIndex='holidayDays'
          format='0'
          text='Holidays'
        />
        <Column
          align='center'
          dataIndex='verified'
          text='Visible'
          width={150}
        />
        <Column
          align='right'
          dataIndex='salary'
          editable
          formatter='usMoney'
          text='Salary'
          width={150}
        />
        <Column
          dataIndex='email'
          editable
          editor={{
              xtype: 'emailfield'
          }}
          text='Email'
          width={250}
        />
      </Grid>
    )
  }
}