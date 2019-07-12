import React, { Component } from 'react';
import { Grid, Column } from '@sencha/ext-modern';

Ext.require([
    'Ext.grid.filters.Plugin'
]);

export default class InfiniteGridExample extends Component {

	store = Ext.create('Ext.data.Store', {
		fields: [
        	'firstName', 'lastName', 'address', 'company', 'title',
        {
            name: 'id',
            type: 'int'
        }],
	    autoLoad: true,
	    pageSize: 25,
	    proxy: {
	      	type: 'ajax',
	      	url: 'https://llbzr8dkzl.execute-api.us-east-1.amazonaws.com/production/user',
	      	reader: {
	            rootProperty: 'users',
	            totalProperty: 'totalCount'
	        }
	    }
  	})

	render() {
		return(
			<Grid
				title="Infinite Grid"
				scrollable={true}
				height={500}
			    width={600}
			    plugins={
			    	{
			    		gridfilters: true
			    	}
			    }
			    store={this.store}
			>
				<Column
					text="First Name"
			       	width={150}
			        dataIndex="firstName"
				>
				</Column>
				<Column
					text="Last Name"
			       	width={150}
			        dataIndex="lastName"
				>
				</Column>
				<Column
					text="Id"
			       	width={50}
			        dataIndex="id"
				>
				</Column>
				<Column
					text="Title"
			       	flex={1}
			        dataIndex="title"
				>
				</Column>
				<Column
					text="Address"
			       	flex={1}
			        dataIndex="address"
				>
				</Column>
				<Column
					text="Company"
			       	flex={1}
			        dataIndex="company"
				>
				</Column>
			</Grid>
		)
	}
}