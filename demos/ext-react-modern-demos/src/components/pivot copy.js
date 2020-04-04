import React, { Component } from 'react';
import { Container, Grid, Column, Toolbar, Button, PivotGrid } from "@sencha/ext-react-modern";
import data from './mockdata';
const Ext = window['Ext']

Ext.require("Ext.grid.plugin.Summary");
Ext.require("Ext.grid.plugin.RowExpander");
Ext.require("Ext.data.summary.*");
Ext.require("Ext.grid.filters.*");
Ext.require("Ext.pivot.*");

const renderLink = (value, record) => {
  const jsx = <a style={{ color: 'red' }} href={`mailto:${record.get('email')}`}>{value}</a>;
  return jsx;
};

const createStore = () => Ext.create('Ext.data.Store', {
  proxy: { type: 'memory' },
  data
  // data: data.slice(0, 3),
});

const gridColumns = [
  {
    text: "JSX cell",
    dataIndex: "name",
    key: "name",
    width: 150,
    renderer: renderLink,
    cell: { xtype: 'reactcell',  encodeHtml: false, },
    summaryRenderer: v => <button type="button">jsx in summary row</button>
  },
  {
    text: "some number",
    dataIndex: "num",
    key: "num",
    width: 200,
    cell: { xtype: 'reactcell',  encodeHtml: false, },
    renderer: v => <strong>{v}</strong>,
    summary: 'sum',
    summaryRenderer: v => `$${v}`
  },
  {
    text: "email",
    dataIndex: "email",
    key: "email",
    width: 200,
    summary: 'count',
    summaryRenderer: v => `Count - ${v}`
  },
  {
    text: 'Column group',
    key: 'group',
    minWidth: 250,
    columns: [
      {
        text: "First",
        dataIndex: "name",
        key: 'name',
        width: 140,
      },
      {
        text: "Second",
        dataIndex: "email",
        key: 'email',
        width: 200,
      },
    ]
  }
];

const virtualGridColumns = [
  {
    text: "JSX cell",
    dataIndex: "name",
    key: "name",
    width: 150,
    renderer: renderLink,
    cell: { xtype: 'reactcell',  encodeHtml: false, },
    // summaryRenderer: v => <button type="button">jsx in summary row</button>
  },
  {
    text: "some number",
    dataIndex: "num",
    key: "num",
    width: 200,
    cell: { xtype: 'reactcell',  encodeHtml: false, },
    renderer: v => <strong>{v}</strong>,
    // summary: 'sum',
    summaryDataIndex: 'num',
    summaryRenderer: v => `$${v}`
  },
  {
    text: "email",
    dataIndex: "email",
    key: "email",
    width: 200,
    // summary: 'count',
    // summaryRenderer: v => `Count - ${v}`
  },
  {
    text: 'Column group',
    key: 'group',
    minWidth: 250,
    columns: [
      {
        text: "First",
        dataIndex: "name",
        key: 'name',
        width: 140,
      },
      {
        text: "Second",
        dataIndex: "email",
        key: 'email',
        width: 200,
      },
    ]
  }
];

const grouperFn = function (rec) {
  return `${rec.get('name')} -  ${rec.get('email')}`;
};
const jsxGrouperFn = function (rec) {
  return <strong>{rec.get('name')} {rec.get('email')}</strong>;
};

const labelRenderer= v => v + ' group';
const jsxLabelRenderer= v => <strong>{v}</strong>;

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
          {this.state.showGrid && <Grid
            title="Grid"
            height={300}
            weighted
            extname="grid1"
            store={{
              proxy: { type: 'memory' },
              data
            }}
            columns={gridColumns}
            infinite={false}
            style={{ border: this.state.bordered ? '2px solid blue' : '0px solid blue' }}
            plugins={{
              gridsummary: {
                row: {
                  docked: 'top',
                  weight: 1,
                },
              },
              rowexpander: {
                column: {
                  width: 35,
                },
              },
              gridfilters: true,
            }}
            itemConfig={{
              body: {
                tpl: this.rowTpl,
              },
            }}
            listeners={{
              childtap: this.toggleRow
            }}
            variableHeights
          />}
          <Grid
          title="another grid"
            height={400}
            weighted
            store={{
              type: 'virtual',
              pageSize: 50,
              leadingBufferZone: 0,
              trailingBufferZone: 0,
              autoLoad: true,
              remoteSort: true,
              remoteFilter: true,
              proxy: {
                type: 'ajax',
                url: 'http://localhost:3004/users',
                simpleSortMode: true,
                pageParam: '',
                noCache: false,
                startParam: '_start',
                limitParam: '_limit',
                reader: {
                  type: 'json',
                  rootProperty: 'items',
                  totalProperty: 'total',
                  summaryRootProperty: 'summary',
                },
              }
            }}
            columns={virtualGridColumns}
            infinite
            plugins={{
              rowexpander: {
                column: {
                  width: 35,
                },
              },
            }}
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
export default pivot;