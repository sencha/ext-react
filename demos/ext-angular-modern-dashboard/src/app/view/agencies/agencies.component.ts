import { Component, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { AgencyStore } from '../../store/agency.store';
import { AgencyService }  from '../../service/agency.service';


@Component({
	encapsulation: ViewEncapsulation.None,
	styles: [`
	.dataview {
		-webkit-box-shadow: 0px 5px 10px -6px black;
		-moz-box-shadow: 0px 5px 10px -6px black;
		box-shadow: 0px 5px 10px -6px black;
		padding: 10px 10px 20px 10px;
		border-radius: 20px;
		margin: 10px;
		height: 180px;
		width: 180px;
		background-color: #e3ebec;
		cursor: pointer;
	}
	.dataview-selected {
		background-color:gray;
	}
	.dataview-image {
		height:100px;width:100px;display:block;margin-left:auto;margin-right:auto;
	}
	.dataview-text {
		text-align:center;margin-top:10px;font-size:12px;
	}
	`],
  selector: '',
	template: `
		<div style="padding:10px;background:#f1f5f6;height:95%;">
			<dataview [config]="dataviewConfig"></dataview>
		</div>
	`
})
export class AgenciesComponent { 

	
			// (ready)="readyDataView($event)"
			// (select)="selectDataView($event)"
			// (itemmouseenter)="itemmouseenterDataView($event)"
			// (itemmouseleave)="itemmouseleaveDataView($event)"


	constructor(private agencyService: AgencyService) {}

	dataviewConfig: any = { 
		style: { width: '100%', height: '100%', background: '#f1f5f6' },
		
		scrollable: 'vertical',
		inline: true,
		selectedCls: 'dataview-selected',
		store: new AgencyStore()['ext'],
		itemTpl: [
			'<div class="dataview">',
				'<img class="dataview-image" src="assets/resources/app/logos/{agencyCode}.svg" />',
				'<div class="dataview-text">',
					'<div>{agencyAbbreviation}&nbsp;({agencyCode})</div>',
					'<div>{agencyName}</div>',
				'</div>',
			'</div>',
		]
		//https://itdashboard.gov/drupal/sites/itdb/themes/itdb/assets/img/department-logos/by-id/{agencyCode}.svg',
	};

	// itemmouseenterDataView(o) {
	// 	console.log(o.record);
	// 	this.agencyService.announceAgency(o.record.data);
	// }

	// itemmouseleaveDataView(o) {
	// 	console.log(o.record);
	// }

	// selectDataView(o) {
	// 	Ext.Msg.alert(o.record.data.agencyAbbreviation, o.record.data.agencyName, Ext.emptyFn);
	// }

	// readyDataView(theDataView) {}
}
