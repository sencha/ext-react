import React, { Component } from 'react';
import {ExtTabpanel} from '@sencha/ext-react-classic';
import Panel from './components/panel/Panel'
import Grid from './components/grid/Grid'
import Form from './components/form/Form';
import Dashboard from './components/dashboard/Dashboard';
import Calendar from './components/calendar/Calendar';
import TreeGrid from './components/tree/TreeGrid';
import IFrame from './components/iFrame/IFrame';
import GridReact from './components/gridReact/GridReact';

class App extends Component {

  readyPage = ({ cmp, cmpObj }) => {
    cmp.setActiveTab(3)
  }

  render() {
    return (
      <ExtTabpanel
        title = 'TabPanel'
        viewport = {true}
        onReady = { this.readyPage }
        plain = {true}
        tabBar = {{
          items: {
            xtype: 'toolbar',
            flex: 1,
            style: 'background-color: transparent !important',
            padding: '0 8px 4px 0',
            items: [
              '->',
              {
                iconCls: 'x-fa fa-caret-up',
                ui: 'plain-toolbar-small',
              }
            ]
          }
        }}
      >
        <Panel/>
        <Grid/>
        <Form/>
        <Dashboard/>
        <Calendar/>
        <TreeGrid/>
        <IFrame/>
        <GridReact/>
      </ExtTabpanel>
    )
  }
}
export default App;