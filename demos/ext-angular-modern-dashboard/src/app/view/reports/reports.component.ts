declare var Ext: any;
import { Component } from '@angular/core';
import { AgencyService }  from '../../service/agency.service';

@Component({
	styles:  [``],
  selector: '',
	template: `
		<span style="float:left;margin-top:10px;margin-left:15px;">Report:</span>
		<select style="float:left;margin-top:10px;margin-left:20px;" (change)="onSelect($event.target.value)" > 
			<option *ngFor="let obj of objArray" [value]="obj.value">{{obj.text}}</option>
		</select>

		<pivotgrid
			fitToParent=true
			[config]='pivotgridConfig'
			[title] ='pivotTitle'
			(ready)="readyPivotGrid($event)"
		></pivotgrid>
	`
})
export class ReportsComponent { 
	private margin:any = 10;
	private headerHeight:any = 35;
	private width: any = 'calc(100% - ' + this.margin + 'px - ' + this.margin + 'px)';
	private height: any = 'calc(100% - ' + this.headerHeight + 'px - ' + this.margin + 'px - ' + this.margin + 'px)';
	private thePivotGrid; any;
	private pivotgridConfig: any;

	constructor(private agencyService: AgencyService) {
		this.pivotgridInit();
	}

	pivotgridInit() {
		this.pivotgridConfig= {
			left: 0, top: this.headerHeight,
			style: { width: this.width, height: this.height, border: '0px solid #e9e9e9' },
			margin: this.margin,
			shadow: true,
			matrix: {
				type: 'local',
				viewLayoutType: 'outline',
				store: this.agencyService.getAgencyPortfolioStore(),
				rowGrandTotalsPosition: 'none',
				colGrandTotalsPosition: 'none',
				topAxis: [],
				leftAxis: [],
				aggregate: []
			}
		};
	}

	readyPivotGrid(thePivotGrid) {
		this.thePivotGrid = thePivotGrid;
	}

	private objArray:any = [
		{ value: 'r0', text: 'Select a Report...' }, 
		{ value: 'r1', text: 'Total IT Spending By Agency' }, 
		{ value: 'r2', text: 'Total IT Spending By Type of Investment' },
		{ value: 'r3', text: 'Agency Spending By IT Portfolio' },
		{ value: 'r4', text: 'Agency Spending By Type of Investment' },
		{ value: 'r5', text: 'Total IT Spending By Primary Service Area' },
		{ value: 'r6', text: 'Agency Spending By Bureau' }
	];

	onSelect(value) {
		var reportspivotgrid = this.thePivotGrid.extjsObject;
		switch(value) {
			case 'r0':
				reportspivotgrid.reconfigurePivot({
					colGrandTotalsPosition: 'none',
					topAxis: [],
					leftAxis: [],
					aggregate: []
				});
				break;
			case 'r1':
				reportspivotgrid.reconfigurePivot({
					colGrandTotalsPosition: 'last',
					topAxis: [],
					leftAxis: [{ dataIndex: 'agencyName', header: 'Agency', width: 375 }],
					aggregate: [{ dataIndex: 'totalITspendingCYB', header: 'Total IT spending', width: 200, align: 'right', renderer: function(v) {return Ext.util.Format.currency(v,'$',2)} }]
				});
				break;
			case 'r2':
				reportspivotgrid.reconfigurePivot({
					colGrandTotalsPosition: 'last',
					topAxis: [],
					leftAxis: [{ dataIndex: 'typeOfInvestment', header: 'Type Of Investment', width: 375 }],
					aggregate: [{ dataIndex: 'totalITspendingCYB', header: 'Total IT spending', width: 200, align: 'right', renderer: function(v) {return Ext.util.Format.currency(v,'$',2)} }]
				});
				break;
			case 'r3':
				reportspivotgrid.reconfigurePivot({
					colGrandTotalsPosition: 'last',
					topAxis: [{ dataIndex:  'partOfITPortfolio' }],
					leftAxis: [{ dataIndex: 'agency', locked : true, header: 'Agency', id: 'agency', width: 375 }],
					aggregate: [{ dataIndex: 'totalITspendingCYB', header: 'Total IT spending', width: 200, align: 'right', renderer: function(v) {return Ext.util.Format.currency(v,'$',2)} }]
				});
				break;
			case 'r4':
				reportspivotgrid.reconfigurePivot({
					colGrandTotalsPosition: 'last',
					topAxis: [{ dataIndex:  'typeOfInvestment' }],
					leftAxis: [{ dataIndex: 'agency', locked : true, header: 'Agency', id: 'agency', width: 375 }],
					aggregate: [{ dataIndex: 'totalITspendingCYB', header: 'Total IT spending', width: 200, align: 'right', renderer: function(v) {
						if (v == undefined) {
							return '-';
						}
						else {
							return Ext.util.Format.currency(v,'$',2)} 
						}
					}]
				});
				break;
			case 'r5':
				reportspivotgrid.reconfigurePivot({
					colGrandTotalsPosition: 'last',
					topAxis: [],
					leftAxis: [{ dataIndex: 'feaBRMservicesPrimaryServiceArea', locked : true, header: 'Primary Service Area', width: 400 }],
					aggregate: [{ dataIndex: 'totalITspendingCYB', header: 'Total IT spending', width: 200, align: 'right', renderer: function(v) {return Ext.util.Format.currency(v,'$',2)} }]
				});
				break;
			case 'r6':
				reportspivotgrid.reconfigurePivot({
					colGrandTotalsPosition: 'last',
					topAxis: [{ dataIndex:  'agencyName' }],
					leftAxis: [{ dataIndex: 'bureauName', header: 'Bureau', width: 375 }],
					aggregate: [{ dataIndex: 'totalITspendingCYB', header: 'Total IT spending', width: 200, align: 'right', renderer: function(v) {return Ext.util.Format.currency(v,'$',2)} }]
				});
				break;
			default:
				break;
		}
	}

}
