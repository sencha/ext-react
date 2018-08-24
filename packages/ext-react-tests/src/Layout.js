import React, { Component } from 'react'
import { Container, TitleBar, TreeList } from '@sencha/ext-modern';
import { Switch, Route, withRouter } from "react-router-dom"
import * as tests from './tests';
var REACT_VERSION = require('react').version;

class Layout extends Component {

  title = "ExtReact Tests - React v" + REACT_VERSION

  onSelectionChange = (tree, item) => {
    const record = item.node;
    if (record && !location.hash.startsWith('#' + record.getId())) {
        location.hash = record.getId();
    }
  }

  render() {
    var items = {}
    items.root = {}
    items.root.children = []
    Object.keys(tests).map(name => {
      var o = {}
      o.id = name + '#'
      o.text = name
      o.leaf = true
      items.root.children.push(o)
    })

    return (
      <Container fullscreen layout="hbox">
        <TitleBar title={this.title} docked="top"></TitleBar>
        <TreeList 
          margin="20px"
          onItemClick={this.onSelectionChange}
          expanderFirst={false}
          store={items}
        /> 
        <Container margin="20px">
          <Switch>
            { Object.keys(tests).map(name => (
              <Route key={name} path={`/${name}`} component={tests[name]}/>
            ))}
          </Switch>
        </Container>
      </Container>
    )
  }
}

export default withRouter(Layout)