import React, { Component } from 'react';
import { Container, Toolbar, Button, PivotGrid } from "@sencha/ext-react-modern";
import data from './mockdata';
const Ext = window['Ext']

Ext.require("Ext.grid.plugin.Summary");
Ext.require("Ext.grid.plugin.RowExpander");
Ext.require("Ext.data.summary.*");
Ext.require("Ext.grid.filters.*");
Ext.require("Ext.pivot.*");

// const renderLink = (value, record) => {
//   const jsx = <a style={{ color: 'red' }} href={`mailto:${record.get('email')}`}>{value}</a>;
//   return jsx;
// };

// const createStore = () => Ext.create('Ext.data.Store', {
//   proxy: { type: 'memory' },
//   data
//   // data: data.slice(0, 3),
// });




const grouperFn = function (rec) {
  return `${rec.get('name')} -  ${rec.get('email')}`;
};

// const jsxGrouperFn = function (rec) {
//   return <strong>{rec.get('name')} {rec.get('email')}</strong>;
// };

const jsxGrouperFn = (rec) => (<div>hi</div>)

//const labelRenderer= v => v + ' group';
//const jsxLabelRenderer= v => <strong>{v}</strong>;

const pivotMatrix = {
  type: 'local',
  collapsibleRows: true,
  collapsibleColumns: false,
  rowGrandTotalsPosition: 'first',
  textGrandTotalTpl: 'Total',
  viewLayoutType: 'outline',
  leftAxis: [{
    header: 'First',
    dataIndex: 'email',
    width: 200,
    grouperFn: jsxGrouperFn,
    //grouperFn: grouperFn,
    // labelRenderer: jsxLabelRenderer
  },
  {
    header: 'Second',
    dataIndex: 'name',
    width: 200,
  }],
  aggregate: [{
    header: 'Count',
    dataIndex: 'num',
    aggregator: 'count'
  },
  {
    header: 'Sum',
    dataIndex: 'num',
    aggregator: 'sum'
  }],
  store: {
    proxy: { type: 'memory' },
    data
  },
};

class pivot extends Component {
  constructor() {
    super();
    this.state = {
      showGrid: true,
      bordered: false,
    };

    this.changeState = this.changeState.bind(this);
    this.changeStyle = this.changeStyle.bind(this);
    this.destroyGrid = this.destroyGrid.bind(this);
  }

  changeState() {
    this.setState({
      num: Math.random()
    });
  }

  changeStyle() {
    this.setState({
      bordered: true
    });
  }

  destroyGrid() {
    this.setState({
      showGrid: false
    });
  }

  rowTpl (record) {
    console.log('rowTpl');
    return <div style={{ height: '20px', background: 'lightblue' }}>{record.email}</div>
  }

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
        <Toolbar docked="top">
          <Button text="Change State" handler={this.changeState}/>
          <Button text="Change Style" handler={this.changeStyle}/>
          <Button text="Destroy Grid" handler={this.destroyGrid}/>
        </Toolbar>
        <PivotGrid
          title="Pivot Grid"
          matrix={pivotMatrix}
          height={300}
        />
      </Container>

    )
  }
}
export default pivot;