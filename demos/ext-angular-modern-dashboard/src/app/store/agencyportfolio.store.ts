declare var Ext: any;
//import {ExtClass} from '@gusmano/ext-angular-modern/main';
import { ExtClassComponent } from '../ext-class.component';

export class AgencyPortfolioStore extends ExtClassComponent {
	constructor (createConfig?: any) {
		let className: any = 'AgencyPortfolioStore';
		let extend: any = 'Ext.data.Store';
		let defineConfig: any = {
			autoLoad: true,
			fields: [
				{ name: 'agencyCode', type: 'string' }, //"005",
				{ name: 'agencyName', type: 'string' }, //"Department of Agriculture",
				{ name: 'agency', type: 'string',
					convert: function(v, record){
						return record.get('agencyCode') + '-' + record.get('agencyName');
					}
				},
				//{ name: 'previousUII', type: 'string' }, //"005-000000035",
				{ name: 'uniqueInvestmentIdentifier', type: 'string' }, //"005-000000035",
				{ name: 'investmentCategory', type: 'string' }, //"00",
				{ name: 'lobTitle', type: 'string' }, //"N\/A",
				{ name: 'bureauCode', type: 'string' }, //"03",
				{ name: 'bureauName', type: 'string' }, //"Office of the Secretary",
				{ name: 'partOfITPortfolio', type: 'string' }, //"01 - IT Investments for Mission Delivery and Management Support Area",
				{ name: 'missionDeliveryAndManagementSupportArea', type: 'string' }, //"01",
				{ name: 'typeOfInvestment', type: 'string' }, //"02 - Non Major",
				{ name: 'lineItemDescriptor', type: 'string' }, //"00 - Investment Line",
				{ name: 'investmentTitle', type: 'string' }, //"DM-OCIO-e-Learning\/AgLearn Combined",
				{ name: 'investmentDescription', type: 'string' }, //"AgLearn is an eLearning system that provides online administration of curriculum by trainers, individualized training support, on-demand classroom registration, customized content, collaborative tools, and integrated back-end systems.",
				{ name: 'feaBRMservicesPrimaryServiceArea', type: 'string' }, //"139 - Provide and Maintain IT Infrastructure",
				//{ name: 'feaBRMservicesSecondaryServiceArea1', type: 'string' }, //"",
				//{ name: 'feaBRMservicesSecondaryServiceArea2', type: 'string' }, //"",
				//{ name: 'feaBRMservicesSecondaryServiceArea3', type: 'string' }, //"",
				//{ name: 'feaBRMservicesSecondaryServiceArea4', type: 'string' }, //"",
				//{ name: 'totalITspendingPY', type: 'number' }, //5.403,
				{ name: 'totalITspendingCY', type: 'number' }, //5.403,
				{ name: 'totalITspendingCYB', type: 'number',
					convert: function(v, record){
						return record.get('totalITspendingCY') * 1000000;
					}
				},
				//{ name: 'totalITspendingBY', type: 'number' }, //5.403,
				//{ name: 'DME_PY_AgencyFunding', type: 'number' }, //0,
				//{ name: 'DME_PY_Contributions', type: 'number' }, //0,
				{ name: 'DME_CY_AgencyFunding', type: 'number' }, //0,
				{ name: 'DME_CYB_AgencyFunding', type: 'number',
					convert: function(v, record){
						return record.get('DME_CY_AgencyFunding') * 1000000;
					}
				},
				{ name: 'DME_CY_Contributions', type: 'number' }, //0,
				//{ name: 'DME_BY_AgencyFunding', type: 'number' }, //0,
				//{ name: 'DME_BY_Contributions', type: 'number' }, //0,
				//{ name: 'OM_PY_AgencyFunding', type: 'number' }, //5.403,
				//{ name: 'OM_PY_Contributions', type: 'number' }, //0,
				{ name: 'OM_CY_AgencyFunding', type: 'number' }, //5.403,
				{ name: 'OM_CY_Contributions', type: 'number' }, //0,
				//{ name: 'OM_BY_AgencyFunding', type: 'number' }, //5.403,
				//{ name: 'OM_BY_Contributions', type: 'number' }, //0,
				//{ name: 'numberOfGovFTEsPY', type: 'number' }, //3,
				{ name: 'numberOfGovFTEsCY', type: 'number' }, //3,
				//{ name: 'numberOfGovFTEsBY', type: 'number' }, //3,
				//{ name: 'percentageCostForGovFTEPY', type: 'number' }, //10.18,
				{ name: 'percentageCostForGovFTECY', type: 'number' }, //10.18,
				//{ name: 'percentageCostForGovFTEBY', type: 'number' }, //10.18,
				{ name: 'cloudComputingAlternativesEvaluation', type: 'string' }, //"5",
				{ name: 'providesCloudToAgencyComponents', type: 'number' }, //0,
				{ name: 'providesCloudToOtherFedStateLocal', type: 'number' }, //0,
				//{ name: 'Provisioned_DME_PY_AgencyFunding', type: 'number' }, //0,
				//{ name: 'Provisioned_DME_PY_Contributions', type: 'number' }, //0,
				{ name: 'Provisioned_DME_CY_AgencyFunding', type: 'number' }, //0,
				{ name: 'Provisioned_DME_CY_Contributions', type: 'number' }, //0,
				//{ name: 'Provisioned_DME_BY_AgencyFunding', type: 'number' }, //0,
				//{ name: 'Provisioned_DME_BY_Contributions', type: 'number' }, //0,
				//{ name: 'Provisioned_OM_PY_AgencyFunding', type: 'number' }, //0,
				//{ name: 'Provisioned_OM_PY_Contributions', type: 'number' }, //0,
				{ name: 'Provisioned_OM_CY_AgencyFunding', type: 'number' }, //0,
				{ name: 'Provisioned_OM_CY_Contributions', type: 'number' }, //0,
				//{ name: 'Provisioned_OM_BY_AgencyFunding', type: 'number' }, //0,
				//{ name: 'Provisioned_OM_BY_Contributions', type: 'number' }, //0,
				//{ name: 'budgetYear', type: 'number' }, //2017,
				{ name: 'derivedStatus', type: 'string' } //"No change in status",
				//{ name: 'updatedDate', type: 'string' }, //"2016-01-14",
				//{ name: 'updatedTime', type: 'string' } //"20:34:33"
			],
			sorters: [ 'agencyCode', 'bureauCode', 'typeOfInvestment' ],
			proxy: {
				//type: 'jsonp',
				//url: 'https://itdashboard.gov/api/v1/ITDB2/dataFeeds/portfolio?json=true',
				//url: 'https://itdashboard.gov/api/v1/ITDB2/dataFeeds/portfolio/agencyCode/005?json=true',
				type: 'ajax',
				url: 'assets/resources/app/data/agencyportfolio.json',
				reader: {
					type: 'json',
					rootProperty: 'result'
				}
			}

		};

		super(className, extend, defineConfig, createConfig);
	}
}