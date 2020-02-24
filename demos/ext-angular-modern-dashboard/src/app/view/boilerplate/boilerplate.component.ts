declare var Ext: any;
import { Component, Type } from '@angular/core';
import data from './data';

@Component({
  selector: '',
	template: `
	<container
			fitToParent=true
			[plugins]="'responsive'"
			[responsiveConfig]="responsiveConfig">
		<panel [title]="'Angular2 Ext JS Boilerplate'" [layout]="'fit'" [flex]="'1'">
			<grid
				[plugins]="gridPlugins"
				[columns]="gridColumns" 
				[store]="gridStore"
				(select)="onPersonSelect($event)"
				(ready)="onGridReady($event)">
				<container [layout]="'hbox'" [docked]="'top'" [padding]="'5'">
					<searchfield [placeHolder]="'Search...'" [flex]="'1'" (change)="onSearch($event)"></searchfield>
				</container>
			</grid>
		</panel>
		<panel
				[title]="employee"
				[layout]="'vbox'"
				[margin]="'0 0 10px 0'"
				[plugins]="'responsive'"
				[bodyPadding]="'10 15'"
				[responsiveConfig]="responsiveConfigEmployee"
				[tools]="tools"
				(ready)="onEmployeePanelReady($event)">
			<container (ready)="onEmployeeDetailsReady($event)"></container>
			<polar downloadServerUrl ="http://svg.sencha.io"
					[config]="configPolar"
					[store]="ptoStore"
					[interactions]="interactions"
					[background]="background"
					[series]="series"
					[axes]="axes">
			</polar>
		</panel>
	</container>
	`
})
export class BoilerplateComponent { 
	employeeDetails: any;
	ptoStore: any;
	grid: any;
	employeePanel: any;

	constructor() {
		this.ptoStore = Ext.create('Ext.data.Store', {
			fields: ['type', 'hours']
		});
	}

	responsiveConfig: any = {
		tall: { layout: 'vbox' },
		wide: { layout: 'hbox' }
	};

	gridPlugins: any = [
		{ type: 'columnresizing' }
	];

	gridColumns: any = [
		{ text: 'Name', dataIndex: 'name', flex: 2, resizable: true },
		{ text: 'Email', dataIndex: 'email', flex: 3, resizable: true, plugins: 'responsive', responsiveConfig: { tall: { hidden: true } } },
		{ text: 'Phone #', dataIndex: 'phone', flex: 2, resizable: true }
	];

	gridStore: any = {
		autoLoad: true,
		fields: ['name', 'email', 'phone', 'hoursTaken', 'hoursRemaining'],
		data
	};

	onPersonSelect(event) {
		var employee = event.record.data;
		console.log({ employee: event.record.data });
		this.employeePanel.x.setTitle(event.record.data.name);
		this.loadEmployeePTOData(event.record.data);
		var html = `
		<div style="padding:0 0 30px 0;color:#000000;">
				<div style="float:left;font-size:14px;">${employee.email}</div>
				<div style="float:right;font-size:14px;">${employee.phone}</div>
		</div>
		<div style="text-align:center;color:#606060;font-weight:100;font-size:14px;">
			Vacation Balance
		</div>
		`
		this.employeeDetails.x.setHtml(html);

	}

	loadEmployeePTOData (employee) {
		this.ptoStore.loadData([
			{ type: 'Hrs Taken', hours: employee.hoursTaken, text: employee.hoursTaken + ' hours\ntaken' },
			{ type: 'Hrs Remaining', hours: employee.hoursRemaining, text: employee.hoursRemaining + ' hours\nremaining' }
		])
	}

	onGridReady(grid) {
		this.grid = grid;
	}

	onSearch({newValue}) {
		var store = this.grid.x.getStore();
		const query = newValue;
		store.clearFilter();
		if (query.length) store.filterBy(record => {
				const { name, email, phone } = record.data;
				return name.indexOf(query) !== -1 || email.indexOf(query) !== -1 || phone.indexOf(query) !== -1;
		});
	}

	onEmployeePanelReady(employeePanel) {
		this.employeePanel = employeePanel;
	}

	responsiveConfigEmployee: any = {
		tall: { height: 390 },
		wide: { width: 400 }
	};

	tools: any = [
			{ type: 'close', handler: this.onCloseClick }
	]

	onCloseClick() {
		alert('close');
	}

	onEmployeeDetailsReady(employeeDetails) {
		this.employeeDetails = employeeDetails;
	}

	configPolar: any = { height: 300 };
	interactions: any =['rotate', 'itemhighlight'];
	background: any ="#FAFAFA";
	series: any = [{
		type: 'pie',
		xField: 'hours',
		label: {
			field: 'text'
		},
		donut: 20,
		colors: ['#4CAF50', '#BDBDBD'],
		style: {
		stroke: 'white',
			miterLimit: 10,
			lineCap: 'miter',
			lineWidth: 2
		}
	}];
	axes: any = [];
}
