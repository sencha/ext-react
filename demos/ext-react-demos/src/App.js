import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { ExtPanel, ExtContainer, ExtTreelist } from '@sencha/ext-react-modern';

import Home from './home/Home'
import User from './user/User'
import Grid from './grid/Grid'
import GridRenderers from './gridrenderers/GridRenderers'
import GridRowBody from './gridrowbody/GridRowBody'
import gridsummarychangestate from './gridsummarychangestate/gridsummarychangestate'
import pivot from './components/pivot'
import virtualgrid from './components/virtualgrid'

export default class App extends Component {

  treeclick = (sender, info, eOpts) => {
    window.location.hash = sender.info.node.getId();
  }

  render() {
    return (
      <ExtPanel viewport="true" title="ext-react-demos" layout="fit">
      <ExtContainer docked="left" width="300">
        <ExtTreelist
          ui="nav"
          expanderFirst={false}
          onItemclick={this.treeclick}
          store={{
            root: {
              children: [
                { id: '/home', text: 'Home', iconCls: 'x-fa fa-home', leaf: true },
                { id: '/user', text: 'User', iconCls: 'x-fa fa-info', leaf: true },
                { id: '/grid', text: 'Grid', iconCls: 'x-fa fa-info', leaf: true },
                { id: '/gridrenderers', text: 'GridRenderers', iconCls: 'x-fa fa-info', leaf: true },
                { id: '/gridrowbody', text: 'GridRowBody', iconCls: 'x-fa fa-info', leaf: true },
                { id: '/gridsummarychangestate', text: 'gridsummarychangestate', iconCls: 'x-fa fa-info', leaf: true },
                { id: '/pivot', text: 'pivot', iconCls: 'x-fa fa-info', leaf: true },
                { id: '/virtualgrid', text: 'virtualgrid', iconCls: 'x-fa fa-info', leaf: true },
              ]
            }
          }}
        />
      </ExtContainer>
      <ExtContainer style={{backgroundColor:'lightgray'}} padding="10" layout="fit">
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/user" component={User} />
          <Route path="/grid" component={Grid} />
          <Route path="/gridrenderers" component={GridRenderers} />
          <Route path="/gridrowbody" component={GridRowBody} />
          <Route path="/gridsummarychangestate" component={gridsummarychangestate} />
          <Route path="/pivot" component={pivot} />
          <Route path="/virtualgrid" component={virtualgrid} />
        </Switch>
      </ExtContainer>
    </ExtPanel>
    )
  }
};
