import React, { Component } from 'react';

import Person from './Person';
import data from './data';
import { Panel, Grid, Toolbar, TextField } from '@sencha/ext-classic';
var REACT_VERSION = ' - React v' + require('react').version

export default class App extends Component {

  title = "Sencha ExtReact 7.0 Classic Boilerplate" + REACT_VERSION

    state = {
        person: null
    };

    store = Ext.create('Ext.data.Store', {
        data
    });


  //   { person && (
  //     <Person
  //         person={person}
  //         onSave={this.onSavePerson}
  //         onClose={() => this.setState({ person: null })}
  //     />
  // ) }
  // <Toolbar dock="top">
  //     <TextField emptyText="Search" onChange={(field, value) => this.onSearch(value)} flex={1}/>
  // </Toolbar>



    render() {
        const { person } = this.state;
        
        return (
            <Panel title={this.title}>
              { person && (
                  <Person
                      person={person}
                      onSave={this.onSavePerson}
                      onClose={() => this.setState({ person: null })}
                  />
              ) }
              <Toolbar dock="top">
                  <TextField emptyText="Search" onChange={(field, value) => this.onSearch(value)} flex={1}/>
              </Toolbar>
                <Grid height={600}
                    store={this.store}
                    columns={[
                        { text: 'Name', dataIndex: 'name', flex: 1 },
                        { text: 'Email', dataIndex: 'email', flex: 1 }
                    ]}
                    onRowClick={(grid, record) => this.onRowClick(record.data)}
                />
            </Panel>
        );
    }

    onSearch = (value) => {
        value = value.toLowerCase();
        this.store.clearFilter();
        this.store.filterBy(record => {
            return record.get('name').toLowerCase().indexOf(value) !== -1 ||
                record.get('email').toLowerCase().indexOf(value) !== -1
        });
    }

    onRowClick = (person) => {
        this.setState({ person });
    }

    onSavePerson = (person) => {
        Ext.toast(`Person ${person.name} saved.`);
        this.store.getById(person.id).set(person, { dirty: false });
        this.setState({ person: null });
    }

    onPersonDialogClose = () => {
        this.setState({ person: null });
    }
    
}