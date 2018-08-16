import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, Toolbar, SearchField, FormPanel, Column } from '@sencha/ext-modern';
import { connect } from 'react-redux';
import { updateCriteria } from './actions';

Ext.require([
    'Ext.Function',
    'Ext.grid.plugin.PagingToolbar'
]);

class EmployeesGrid extends Component {

    static propTypes = {
        criteria: PropTypes.object
    };

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'name', 'age', 'gender'],
        autoLoad: true,
        remoteSort: true,
        remoteFilter: true,
        pageSize: 100,
        proxy: {
            type: 'rest',
            url: '/employees',
            reader: {
                type: 'json',
                rootProperty: 'records',
                totalProperty: 'total'
            }
        }
    });

    componentDidUpdate(prevProps) {
        const { criteria } = this.props;

        if (prevProps.criteria !== criteria) {
            const filters = [];
    
            for (let name in criteria) {
                filters.push({
                    property: name,
                    value: criteria[name]
                })
            }

            this.store.filter(filters)
        }
    }

    search = Ext.Function.createBuffered(() => {
        this.props.dispatch(
          updateCriteria({ text: this.refs.query.cmp.getValue() })
        );
    }, 250)


    render() {
        return (
            <Grid
                store={this.store}
                plugins={{
                    pagingtoolbar: true
                }}
            >
                <Toolbar docked="top">
                    <SearchField 
                        ref='query'
                        ui="faded"
                        width="200" 
                        onChange={this.search} 
                        placeholder="Find by name..." 
                    />
                </Toolbar>
                <Column text="ID" dataIndex="id" width={100}/>
                <Column text="First Name" dataIndex="firstName" width={200}/>
                <Column text="Last Name" dataIndex="lastName" width={200}/>
                <Column text="Age" dataIndex="age" width={100}/>
                <Column text="Gender" dataIndex="gender" width={100}/>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return { ...state }
};

export default connect(mapStateToProps)(EmployeesGrid);