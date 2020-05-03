//import React from 'react';
//import { ExtPivotgrid } from "@sencha/ext-react-material-ui";

class Overview extends React.Component {

  constructor() {
    super()

    this.store = {
      autoLoad: true,
      proxy: {
        type: 'ajax',
        url: codefolder + 'ExtPivotgrid/Overview.json'
      }
    }


    // this.store={


    //   type: 'store',
    //   // fields: [
    //   //   { name: 'date', type: 'date', dateFormat: 'Y-m-d' },
    //   //   'bucket',
    //   //   'count'
    //   // ],
    //   data: data
    //   }

    this.matrix = {
      type: 'local',
      store: this.store,
      rowGrandTotalsPosition: 'first',
      leftAxis: [{
          dataIndex: 'country',
          direction: 'DESC',
          header: 'Countries',
          width: 150
      }],
      topAxis: [{
          dataIndex: 'year',
          direction: 'ASC'
      }],
      aggregate: [{
          dataIndex: 'value',
          header: 'Total',
          aggregator: 'sum',
          width: 120
      }]
    }
  }

  render() {
    return (
      <ExtPivotgrid
        fitToParent
        matrix={this.matrix}
      ></ExtPivotgrid>
    )
  }

}
