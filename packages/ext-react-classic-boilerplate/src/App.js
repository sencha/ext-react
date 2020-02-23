import React, { Component } from 'react';
import Person from './Person';
import data from './data';
import { ExtPanel, ExtGrid, ExtToolbar, ExtTextfield } from '@sencha/ext-react-classic';
var REACT_VERSION = ' - React v' + require('react').version

export default class App extends Component {

  title = "Sencha ExtReactClassic 7.2 Boilerplate" + REACT_VERSION;
  state = { person: null };
  store = Ext.create('Ext.data.Store', { data });

  onRowClick = ({sender, record, element, rowIndex, e}) => {
    this.setState({person: record.data});
  }

  onSavePerson = (person) => {
    Ext.toast(`Person ${person.name} saved.`);
    this.store.getById(person.id).set(person, { dirty: false });
    this.setState({ person: null });
  }

  onPersonDialogClose = () => {
    this.setState({ person: null });
  }

  onSearch = ({sender, newValue, oldValue, eOpts}) => {
    var value = newValue.toLowerCase();
    this.store.clearFilter();
    this.store.filterBy(record => {
    return record.get('name').toLowerCase().indexOf(value) !== -1 ||
           record.get('email').toLowerCase().indexOf(value) !== -1
    });
  }

  render() {
    const { person } = this.state;
    return (
      <ExtPanel viewport="true" title={this.title}>
        { person && (
          <Person
            person={person}
            onSave={this.onSavePerson}
            onClose={this.onPersonDialogClose}
          />
        )}
        <ExtToolbar dock="top">
          <ExtTextfield emptyText="Search" onChange={this.onSearch} flex={1}/>
        </ExtToolbar>
          <ExtGrid height={600}
            store={this.store}
            columns={[
              { text: 'Name', dataIndex: 'name', flex: 1 },
              { text: 'Email', dataIndex: 'email', flex: 1 }
            ]}
            onRowclick={this.onRowClick}
            //onRowClick={(ExtGrid, record) => this.onRowClick(record.data)}
          />
      </ExtPanel>
    );
  }

}