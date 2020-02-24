declare var Ext: any;
import { Component } from '@angular/core';
import { AgencyService }  from '../../service/agency.service';

@Component({
  styles:  [``],
  selector: 'spendingdetail',
  template: `
    <grid fitToParent=true
      [config]='gridConfig' 
      (ready)="readyGrid($event)"
      (select)="selectGrid($event)"
      (columnsort)="columnsortGrid($event)"
    ></grid>
  `
})
export class SpendingDetailComponent { 
	private gridConfig: any;
	private theGrid: any;

	selectGrid(o) {
		console.log(o.record);
	}

	columnsortGrid(o) {
		console.log(o.control);
		console.log(o.column);
		console.log(o.direction);
		console.log(o.eOpts);
	}

	readyGrid(theGrid) {
		this.theGrid = theGrid['ext'];
	}

	constructor(private agencyService: AgencyService) {
		this.gridConfig = { 
			store: agencyService.getAgencyPortfolioStore(),
			plugins: [
				{ type: 'grideditable' },
				{ type: 'gridviewoptions' },
				{ type: 'pagingtoolbar' },
				{ type: 'summaryrow'},
				{ type: 'columnresizing' }
			//	{ type: 'rowexpander' },
			// { type: 'gridexporter'}
			],
			columns: [
				//{ dataIndex: 'agency', text: 'agency', width: 300 },
				{ dataIndex: 'agencyCode', text: 'agencyCode', width: 300 },
				{ dataIndex: 'agencyName', text: 'agencyName', type: 'string', width: 300 },
				{ dataIndex: 'uniqueInvestmentIdentifier', text: 'uniqueInvestmentIdentifier', type: 'string', width: 300 },
				//{ dataIndex: 'investmentCategory', text: 'investmentCategory', type: 'string', width: 300 },
				//{ dataIndex: 'lobTitle', text: 'lobTitle', type: 'string', width: 300 },
				{ dataIndex: 'bureauCode', text: 'bureauCode', type: 'string', width: 300 },
				{ dataIndex: 'bureauName', text: 'bureauName', type: 'string', width: 300 },
				{ dataIndex: 'partOfITPortfolio', text: 'partOfITPortfolio', type: 'string', width: 300 },
				//{ dataIndex: 'missionDeliveryAndManagementSupportArea', text: 'missionDeliveryAndManagementSupportArea', type: 'string', width: 300 },
				{ dataIndex: 'typeOfInvestment', text: 'typeOfInvestment', type: 'string', width: 300 },
				{ dataIndex: 'lineItemDescriptor', text: 'lineItemDescriptor', type: 'string', width: 300 },
				{ dataIndex: 'investmentTitle', text: 'investmentTitle', type: 'string', width: 300 },
				{ dataIndex: 'investmentDescription', text: 'investmentDescription', width: 300 },
				{ dataIndex: 'feaBRMservicesPrimaryServiceArea', text: 'feaBRMservicesPrimaryServiceArea', type: 'string', width: 300 },
//				{ dataIndex: 'totalITspendingCY', text: 'totalITspendingCY', type: 'number', width: 300 },
				{ dataIndex: 'totalITspendingCYB',text: 'totalITspendingCYB', width: 200, 
					align: 'right', renderer: function(v) {return Ext.util.Format.currency(v,'$',2)} }, 
				//{ dataIndex: 'DME_CY_AgencyFunding', text: 'DME_CY_AgencyFunding', type: 'number', width: 300 },
				{ dataIndex: 'DME_CYB_AgencyFunding', text: 'DME_CYB_AgencyFunding', width: 200,
					align: 'right', renderer: function(v) {return Ext.util.Format.currency(v,'$',2)} }, 
				//{ dataIndex: 'DME_CY_Contributions', text: 'DME_CY_Contributions', type: 'number', width: 300 },
				{ dataIndex: 'OM_CY_AgencyFunding', text: 'OM_CY_AgencyFunding', type: 'number', width: 300 },
				//{ dataIndex: 'OM_CY_Contributions', text: 'OM_CY_Contributions', type: 'number', width: 300 },
				//{ dataIndex: 'numberOfGovFTEsCY', text: 'numberOfGovFTEsCY', type: 'number', width: 300 },
				//{ dataIndex: 'percentageCostForGovFTECY', text: 'percentageCostForGovFTECY', type: 'number', width: 300 },
				//{ dataIndex: 'cloudComputingAlternativesEvaluation', text: 'cloudComputingAlternativesEvaluation', type: 'string', width: 300 },
				//{ dataIndex: 'providesCloudToAgencyComponents', text: 'providesCloudToAgencyComponents', type: 'number', width: 300 },
				//{ dataIndex: 'providesCloudToOtherFedStateLocal', text: 'providesCloudToOtherFedStateLocal', type: 'number', width: 300 },
				{ dataIndex: 'Provisioned_DME_CY_AgencyFunding', text: 'Provisioned_DME_CY_AgencyFunding', type: 'number', width: 300 },
				//{ dataIndex: 'Provisioned_DME_CY_Contributions', text: 'Provisioned_DME_CY_Contributions', type: 'number', width: 300 },
				{ dataIndex: 'Provisioned_OM_CY_AgencyFunding', text: 'Provisioned_OM_CY_AgencyFunding', type: 'number', width: 300 },
				//{ dataIndex: 'Provisioned_OM_CY_Contributions', text: 'Provisioned_OM_CY_Contributions', type: 'number', width: 300 },
				//{ dataIndex: 'derivedStatus', text: 'derivedStatus', type: 'string', width: 300 }
			]
		};
	}

	private exportTo() {
		alert('exportTo');
	}

}
