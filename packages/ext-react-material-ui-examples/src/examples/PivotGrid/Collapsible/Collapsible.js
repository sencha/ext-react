import React, { Component } from 'react';
import { Container, PivotGrid, Toolbar, Button, Menu, MenuItem } from '@sencha/ext-react-modern';
import { generateData, randomDate } from '../generateSaleData';
import SaleModel from '../SaleModel';

export default class Collapsible extends Component {

  constructor() {
    super();
    this.loadData();
  }

  store = Ext.create('Ext.data.Store', {
    model: SaleModel
  })

  loadData = () => {
    const data = generateData(20);
    for(let i=0; i<data.length; i++) {
      data[i].company = 'Dell';
      data[i].date = randomDate(new Date(2016, 0, 1), new Date(2016, 0, 31));
    }
    this.store.loadData(data);
  }

  monthLabelRenderer = value => Ext.Date.monthNames[value]

  state = {
    collapsibleRows: false,
    collapsibleColumns: false
  }

  render() {
    const { collapsibleRows, collapsibleColumns } = this.state;
    return (
      <Container layout="fit" padding={10}>
          <PivotGrid
            shadow
            matrix={{
              type: 'local',
              collapsibleRows,
              rowSubTotalsPosition: 'none',
              collapsibleColumns,
              colSubTotalsPosition: 'none',
              viewLayoutType: 'tabular',
              store: this.store,
              aggregate: [{
                dataIndex: 'value',
                header: 'Total',
                aggregator: 'sum',
                width: 90
              }],
              leftAxis: [
                {
                  dataIndex: 'person',
                  header: 'Person'
                },
                {
                  dataIndex: 'company',
                  header: 'Company'
                },
                {
                  dataIndex: 'year',
                  header: 'Year'
                }
              ],
              topAxis: [
                {
                  dataIndex: 'country',
                  header: 'Country'
                },
                {
                  dataIndex: 'month',
                  labelRenderer: this.monthLabelRenderer,
                  header: 'Month'
                }
              ]
            }}
          />
          <Toolbar
            shadow={false}
            docked="top"
            ui="app-transparent-toolbar"
            padding="5 8"
            layout={{
              type: 'hbox',
              align: 'stretch'
            }}
            defaults={{
              margin: '0 10 0 0',
              shadow: true,
              ui: 'action'
            }}
          >
            <Button ui="action raised" text="Collapsible">
              <Menu defaults={{ handler: this.onCollapsibleChange, group: 'buttonstyle' }}>
                <MenuItem text="None" value="none" iconCls={!collapsibleColumns && !collapsibleRows === true && 'x-font-icon md-icon-check'}/>
                <MenuItem text="Rows Only" value="rows" iconCls={!collapsibleColumns && collapsibleRows === true && 'x-font-icon md-icon-check'}/>
                <MenuItem text="Columns Only" value="cols" iconCls={collapsibleColumns && !collapsibleRows === true && 'x-font-icon md-icon-check'}/>
                <MenuItem text="Rows & Columns" value="both" iconCls={collapsibleColumns && collapsibleRows === true && 'x-font-icon md-icon-check'}/>
              </Menu>
            </Button>
          </Toolbar>
      </Container>
    )
  }

  onCollapsibleChange = (item) => {
    var collapsibleColumns = false
    var collapsibleRows = false
    switch(item.value) {
      case 'none':
        collapsibleColumns = false
        collapsibleRows = false
        break;
      case 'rows':
        collapsibleColumns = false
        collapsibleRows = true
        break;
      case 'cols':
        collapsibleColumns = true
        collapsibleRows = false
        break;
      case 'both':
        collapsibleColumns = true
        collapsibleRows = true
        break;
      default:
        collapsibleColumns = false
        collapsibleRows = false
    }
    this.setState({ collapsibleColumns: collapsibleColumns, collapsibleRows: collapsibleRows })
  }

}