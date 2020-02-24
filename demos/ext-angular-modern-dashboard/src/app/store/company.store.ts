declare var Ext: any;
//import {ExtClass} from '@gusmano/ext-angular-modern/main';
import { ExtClassComponent } from '../ext-class.component';

export class CompanyStore extends ExtClassComponent {
	constructor (createConfig: any) {
		let className: any = 'CompanyStore';
		let extend: any = 'Ext.data.Store';
		let defineConfig: any = {
			autoLoad:   true,
			proxy: {
				type: 'ajax',
				reader: {
					type: 'json',
					implicitIncludes: false
				},
				url: 'assets/resources/app/data/company.json'
			},
			fields: [
				{name: 'name'},
				{name: 'phone' },
				{name: 'price', type: 'float'},
				{name: 'change', type: 'float'},
				{name: 'pctChange', type: 'float'},
				{name: 'lastChange', type: 'date',  dateFormat: 'n/j'},
				{name: 'industry'},
				{name: 'desc'},
				{
					name: 'trend',
					convert: function(value, record) {
						// Record creation call with no trend there: start with current price
						if (value === null) {
								return [record.get('price')];
						}
						return Ext.isArray(value) ? value : [ value ];
					} 
				},
				{
					name: 'rating',
					type: 'int',
					convert: function (value, rec) {
						if (value !== undefined) { // allow rating to be set
								return value;
						}
						var pct = rec.data.pctChange;
						return (pct < 0) ? 2 : ((pct < 1) ? 1 : 0);
					}
				}
			],
			validators: {
					name: 'presence'
			},
			// Override to keep the last 10 prices in the trend field
			set: function(fieldName, value) {
				if (fieldName === 'price') {
					this.callParent([{
						price: value,
						trend: this.addToTrend(fieldName.price)
					}]);
				}
				else {
					if (typeof fieldName !== 'string' && 'price' in fieldName) {
						fieldName.trend = this.addToTrend(fieldName.price);
					}
					this.callParent(arguments);
				}
			},

			// Override to keep the last 10 prices in the trend field
			addToTrend: function(value) {
				var trend = this.data.trend.concat(value);
				if (trend.length > 10) {
					Ext.Array.splice(trend, 0, trend.length - 10);
				}
				return trend;
			}
		};

		super(className, extend, defineConfig, createConfig);
	}
}