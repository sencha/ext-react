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
    const { onSelectionChange, store, selection, ...props } = this.props;
    return (
      <Panel
        {...props}
        scrollable="y"
        shadow
        style={{zIndex: 100, backgroundColor: 'white'}}
        header={false}
        collapsible={{ direction: 'left' }}
      >
        <SearchField flex={1} docked="top" ui="faded" onChange={this.filterNav} margin="7" />
        <TreeList
            ui="nav"
            store={store}
            expanderFirst={false}
            expanderOnly={false}
            onSelectionchange={onSelectionChange}
            selection={selection}
        />
      </Panel>
    )
  }

}
