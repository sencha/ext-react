declare var Ext: any;
//import {ExtClass} from '@gusmano/ext-angular-modern/main';
import { ExtClassComponent } from '../ext-class.component';

export class WidgetStore extends ExtClassComponent {

	constructor (createConfig: any) {
		let className: any = 'WidgetStore';
		let extend: any = 'Ext.data.ArrayStore';

		let defineConfig: any = {
			fields: [
				{name: 'name'},
				{name: 'progress', type: 'float'},
				's1','s2','s3','s4','s5','s6','s7'
			],

			data: (function() {
					var result = [],
							i;
					for (i = 0; i < 8; i++) {
						var j,s = [];for (j = 0; j < 20; j++) { s.push(Ext.Number.randomInt(-10, 10)); }
						result.push([i + 1, 'Record ' + (i + 1), Ext.Number.randomInt(0, 100) / 100, 
						s, s, s, s, s, s, s
						]);
					}
					return result;
			})()
		};
		super(className, extend, defineConfig, createConfig);
		return;
	}
}
