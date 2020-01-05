import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { ExtPanel, ExtContainer } from '@sencha/ext-react-modern';

import Home from './home/Home'
import User from './user/User'
import Grid from './grid/Grid'
import GridRenderers from './gridrenderers/GridRenderers'

export default function App() {
  return (
    <ExtPanel viewport="true" title="ext-react-demos" layout="fit">
      <ExtContainer docked="left" width="150">
        <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/user">User</Link></li>
        <li><Link to="/grid">Grid</Link></li>
        <li><Link to="/gridrenderers">GridRenderers</Link></li>
        </ul>
      </ExtContainer>
      <ExtContainer style={{backgroundColor:'lightgray'}} padding="10" layout="fit">
        <Switch>
          <Route exact path="/home" component={Home} />
          <Route path="/user" component={User} />
          <Route path="/grid" component={Grid} />
          <Route path="/gridrenderers" component={GridRenderers} />
        </Switch>
      </ExtContainer>
    </ExtPanel>
  )
}