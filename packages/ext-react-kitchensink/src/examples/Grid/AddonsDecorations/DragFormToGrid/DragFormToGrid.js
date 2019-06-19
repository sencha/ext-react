import React, { Component } from 'react';
import { Panel, Grid, Column, DataView, Spacer } from '@sencha/ext-modern';
import { patientData, hospitalData } from './data';
import './FormToGrid.scss';


export default class DragFormToGridExample extends Component {
	patientStore = Ext.create('Ext.data.Store', {
        fields: ['name', 'address', 'telephone'],
        data: patientData
    });

	hospitalStore = Ext.create('Ext.data.Store', {
		fields: ['name', 'address', 'telephone', 'patients'],
		data: hospitalData
	});

	hospitalTpl = `
		<tpl if="patients">
            <tpl for="patients">
	            <div class="name-tag x-tooltiptool">
		            <span>{[values]}</span>
		            <span index="{[xindex - 1]}" class="remove-icon x-icon-el x-font-icon x-tool-type-close"></span>
	            </div>
            </tpl>
            <tpl else>
            	<div class="empty-txt">Drop patients here</div>
        </tpl>
	`;

	patientTpl = `
        <tpl for=".">
			<div class="patient-source">
				<table>
					<tbody>
						<tr><td class="patient-label">Name</td><td class="patient-name">{name}</td></tr>
						<tr><td class="patient-label">Address</td><td class="patient-name">{address}</td></tr>
						<tr><td class="patient-label">Telephone</td><td class="patient-name">{telephone}</td></tr>
					</tbody>
				</table>
			</div>
		</tpl>
    `;

	render() {
		return(
			<Panel
				layout={
					{
						"type": "box"
					}
				}
				padding="10"
				cls="form-to-grid-dd"
				title="Patient Hospital Assignment"
				maxWidth="800"
			>
				<Panel
					title="Patients"
			        flex="0.4"
			        border={true}
			        scrollable="y"
				>
					<DataView
						reference="patientView"
						itemTpl={this.patientTpl}
						store={this.patientStore}
					>
					</DataView>
				</Panel>
				<Spacer
					maxHeight={20}
					maxWidth={20}
				>
				</Spacer>
				<Grid
					title="Hospitals"
					flex="0.6"
			        cls="dd-hospital-grid"
			        variableHeights={true}
			        reference="hospitalView"
			        itemConfig={
			        	{
			        		body: {
			        			tpl: this.hospitalTpl,
			        			cls: 'hospital-target'
			        		}
			        	}
			        }
			        store={this.hospitalStore}
				>
					<Column
						dataIndex="name"
						text="Name"
						flex="1"
					>
					</Column>
					<Column
						dataIndex="address"
						text="Address"
						flex="1"
					>
					</Column>
					<Column
						dataIndex="telephone"
						text="Telephone"
						flex="1"
					>
					</Column>
				</Grid>
			</Panel>
		)
	}
}