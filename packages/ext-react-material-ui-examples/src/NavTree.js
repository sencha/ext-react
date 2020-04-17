import React, { Component } from 'react';
import { Container, Panel, SearchField, Toolbar, TreeList } from '@sencha/ext-react-modern';

export default class NavTree extends Component {

  filterNav = (field, value) => {
    const { store } = this.props;
    this.filterRegex = new RegExp(`(${Ext.String.escapeRegex(value)})`, 'i');
    store.filterBy(record => this.containsMatches(record));
  }

  containsMatches(node) {
    const found = node.data.name.match(this.filterRegex) || node.childNodes.some(child => this.containsMatches(child));
    if (found) node.expand();
    node.data.text = node.data.name.replace(this.filterRegex, '<span style="color:#2196F3;font-weight:bold">$1</span>')
    return found;
  }

  render() {
    const { onSelectionchange, store, selection, ...props } = this.props;
    return (
      <Panel
        {...props}
        scrollable="y"
        shadow
        layout="fit"
        style={{zIndex: 100, backgroundColor: 'white'}}
        header={false}
        collapsible={{ direction: 'left' }}
      >
        <Container flex={1} docked="top" layout="hbox" margin="10 10 0 50">
          <img style={{margin:'20px'}} alt="" width="60px" src="./resources/ext-react-logo.png"/>
          <Container html='<div style="font-size:36px;color:#1976d2;margin:25px 1px 1px 1px;">FOR</div>'></Container>
          <img style={{margin:'20px'}} alt="" width="60px" src="./resources/material-ui-logo.svg"/>
        </Container>
        <Container flex={1} docked="top" margin="1 1 1 65" html='<div style="font-size:24px;color:#1976d2;margin:1px 1px 1px 1px;"></Panel>ExtReact for Material-UI</div>'>
        </Container>
        <SearchField flex={1} docked="top" ui="faded" onChange={this.filterNav} margin="7" />
        <TreeList
            ui="nav"
            scrollable="true"
            store={store}
            expanderFirst={false}
            expanderOnly={false}
            onSelectionchange={onSelectionchange}
            selection={selection}
        />
      </Panel>
    )
  }

}
