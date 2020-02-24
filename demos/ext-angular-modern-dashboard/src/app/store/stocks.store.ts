declare var Ext: any;
//import {ExtClass} from '@gusmano/ext-angular-modern/main';
import { ExtClassComponent } from '../ext-class.component';

export class StocksStore extends ExtClassComponent {
	constructor (createConfig?: any) {
		let className: any = 'StocksStore';
		let extend: any = 'Ext.data.TreeStore';
		let defineConfig: any = {

					autoLoad: true,
				//				type: 'tree',
				fields: [
					'name',
					'description',
					'cap',
					{
						name: 'leaf',
						calculate: function (data) {
								return data.root ? false : !data.children;
						}
					},
					{
						name: 'change',
						calculate: function () {
								return (-5 + Math.random() * 10).toFixed(2); // percentages
						}
					},
					{
						name: 'expanded',
						type: 'boolean',
						defaultValue: true
					}
				],
				proxy: {
					type: 'ajax',
					url: 'assets/resources/app/data/stocksSmall.json'
				}





















			// autoLoad: true,
			// proxy: {
			// 	//type: 'jsonp',
			// 	type: 'ajax',
			// 	reader: {
			// 		type: 'json',
			// 		rootProperty: 'result'
			// 	},
			// 	//url: 'https://itdashboard.gov/api/v1/ITDB2/dataFeeds/agency?json=true'
			// 	//url: 'data/agencyJsonP.json'
			// 	url: 'resources/data/agency.json'
			// },
			// fields: [
			// 	{name: 'agencyName'},
			// 	{name: 'agencyCode'},
			// 	{name: 'agencyAbbreviation'},
			// 	{name: 'agencyType'}
			// ],
			// filters: [
			// 	function(item) {
			// 		return item.data.agencyType == '1-CFO Act';
			// 	}
			// ]
		};

		super(className, extend, defineConfig, createConfig);
	}
}