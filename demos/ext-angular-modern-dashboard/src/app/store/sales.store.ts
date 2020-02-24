declare var Ext: any;
//import {ExtClass} from '@gusmano/ext-angular-modern/main';
import { ExtClassComponent } from '../ext-class.component';

export class SalesStore extends ExtClassComponent {
	constructor (createConfig: any) {
		let className: any = 'SalesStore';
    //let extend: any = 'Ext.data.ArrayStore';
    let extend: any = 'Ext.data.Store';

		let defineConfig: any = {
			alias: 'store.sales',
      autoLoad: true,
      // data: [
      //     {"orderid": 65338,"salesperson": "John Doe","orderdate": "19/04/2012","amount": 930,"country": "United States"},
      //     {"orderid": 31993,"salesperson": "Lisa Peacock","orderdate": "27/04/2012","amount": 640,"country": "Netherlands"},
      // ],
			proxy: {
        type: 'ajax',
				url: 'assets/resources/app/data/sales.json',
				reader: {
					type: 'json',
					rootProperty: 'rows'
				}
			},
			// filters: [
			// 		function(item) {
			// 				return item.get('year') >= 2012;
			// 		}
			// ],
			// fields: [
			// 		{name: 'orderid',       type: 'int'},
			// 		{name: 'salesperson',   type: 'string'},
			// 		{name: 'country',       type: 'string'},
			// 		{name: 'orderdate',     type: 'date', dateFormat: 'd/m/Y'},
			// 		{name: 'amount',        type: 'int'},
			// 		{
			// 				name: 'person-range',
			// 				convert: function(v, record){
			// 						if(/^[a-j]/i.test(record.get('salesperson'))) return 'A-J';
			// 						if(/^[k-s]/i.test(record.get('salesperson'))) return 'K-S';
			// 						if(/^[t-z]/i.test(record.get('salesperson'))) return 'T-Z';
			// 						return v;
			// 				}
			// 		},{
			// 				name: 'year',
			// 				convert: function(v, record){
			// 						return Ext.Date.format(record.get('orderdate'), "Y");
			// 				}
			// 		}
			// ]
		};
		super(className, extend, defineConfig, createConfig);
		return;
	}
}