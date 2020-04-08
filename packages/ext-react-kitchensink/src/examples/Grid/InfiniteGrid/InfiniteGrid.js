import React, { Component } from 'react';
import { Grid, Column } from '@sencha/ext-react-modern';
import './VirtualForm';

Ext.require([
  'Ext.grid.filters.Plugin'
]);

export default class InfiniteGridExample extends Component {
	render() {
		return(
			<Grid
				title="Infinite Grid"
				scrollable={true}
				height={500}
			    width={600}
			    // plugins={
			    // 	{
			    // 		gridfilters: true
			    // 	}
			    // }
				store={
					{
						type: 'virtualforum'
					}
				}
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