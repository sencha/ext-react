import React, { Component } from 'react';
import { connect } from 'react-redux';
import { filterChange } from './actions';
import { Grid, Column, TitleBar, SearchField, Label } from '@sencha/ext-react-modern';
import data from './data';

Ext.require(['Ext.grid.plugin.PagingToolbar']);

class Employees extends Component {

    store = Ext.create('Ext.data.Store', {
        autoLoad: true,
        pageSize: 50,
        data: data,
        autoDestroy: true
    });

    componentDidUpdate(prevProps, prevState) {
        let { filter } = this.props;

        if (filter !== prevProps.filter) {
            filter = filter.toLowerCase();
            this.store.clearFilter();
            this.store.filterBy(record => {
                return  record.get('first_name').toLowerCase().indexOf(filter) !== -1 ||
                        record.get('last_name').toLowerCase().indexOf(filter) !== -1 ||
                        record.get('title').toLowerCase().indexOf(filter) !== -1
            });
        }
    }

    render() {
        const { dispatch } = this.props;

        return (
            <Grid
                store={this.store}
                shadow
                plugins={{
                    gridpagingtoolbar: true
                }}
            >
                <TitleBar title="Employees" docked="top" ui="titlebar-search">
                    <SearchField
                        ui="alt"
                        align="right"
                        placeholder="Search..."
                        onChange={(me, value) => dispatch(filterChange(value))}
                    />
                </TitleBar>
                <Column text="ID" dataIndex="id" width="50"/>
                <Column text="First Name" dataIndex="first_name" width="150"/>
                <Column text="Last Name" dataIndex="last_name" width="150"/>
                <Column text="Title" dataIndex="title" flex={1}/>
            </Grid>
        )
    }

}

const mapStateToProps = (state) => {
    return { ...state }
};

export default connect(mapStateToProps)(Employees);