import { Component } from '@angular/core';
import { AgencyService }  from '../../service/agency.service';

@Component({
	styles:  [``],
	template: `
	<container [fitToParent]="'true'" [layout]="'vbox'">
		<panel [margin]="'20 20 20 20'" [title]="header" [shadow]="'true'">
		<button [text]="'Show Configurator'" (tapit)='showConfigurator($event)' style="margin-top:10px;margin-left:10px;width:250px;height:50px;" >
			Show Configurator
		</button>
		</panel>
		<pivotgrid [flex]="'1'"
			(ready)='readyPivotGrid($event)'
			(configchange)='configchangePivotGrid($event)'
			[config]='configuratorConfig'
		></pivotgrid>
	</container>
	`
})
export class ConfiguratorComponent {
	private header: any = '<div class="heading">Analyze</div>';
	private top:any = 50;
	private width: any = 'calc(100% - 0px)';
	private height: any = 'calc(100% - ' + this.top + 'px)';
	private configuratorConfig:any;
	private thePivotGrid; any;

	readyPivotGrid(thePivotGrid) {
		this.thePivotGrid = thePivotGrid;
	}

	showConfigurator() {
		this.thePivotGrid.extjsObject.showConfigurator();
	}

	configchangePivotGrid(thePivotGrid) {
		this.thePivotGrid.extjsObject.reconfigurePivot({'colGrandTotalsPosition': 'last' });
	}

	constructor(private agencyService: AgencyService) {
		this.configuratorConfig = { 
			//left: 0, top: this.top,
			//style: { width: this.width, height: this.height },
			plugins: [
				{ type: 'columnresizing' }, 
				{
					type: 'pivotconfigurator',
					width: 500,
					fields: [
						{
							dataIndex:  'totalITspendingCYB',
							header:     'Total IT Spending',
							aggregator: 'sum',
							formatter: 'number("$0,000.00")',
							settings: {
								allowed: ['aggregate']
								//style: { fontWeight: 'bold' }
							}
						}, 
						{
								dataIndex:  'agencyName',
								header:     'Agency',
								settings: {
										aggregators: ['count']
										// renderers: {
										//     'Colored 0,000.00': 'coloredRenderer'
										// },
										// Define here custom formatters that ca be used on this dimension
								}
						}, 
						{
								dataIndex:  'bureauName',
								header:     'Bureau',
								settings: {
										aggregators: ['count']
								}
						}, 
						{
								dataIndex:  'feaBRMservicesPrimaryServiceArea',
								header:     'Primary Service Area',
								settings: {
										aggregators: ['count']
								}
						},
						{
								dataIndex:  'partOfITPortfolio',
								header:     'IT Portfolio',
								settings: {
										aggregators: ['count']
								}
						},
						{
								dataIndex:  'typeOfInvestment',
								header:     'Type Of Investment',
								settings: {
										aggregators: ['count']
								}
						} 
					]
			}],
			matrix: {
				type: 'local',
				viewLayoutType: 'outline',
				//store: new AgencyPortfolioStore().extjsObject,
				store: agencyService.getAgencyPortfolioStore(),
				enableLocking: true,
				colGrandTotalsPosition: 'none',
				topAxis: [],
				leftAxis: [],
				aggretate: []
			}
		}
	}

}
