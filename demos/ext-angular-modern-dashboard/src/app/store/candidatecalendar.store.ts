declare var Ext: any;
//import {ExtClass} from '@gusmano/ext-angular-modern/main';
import { ExtClassComponent } from '../ext-class.component';

export class CandidateCalendarStore extends ExtClassComponent {
	constructor (createConfig?: any) {
		let className: any = 'CandidateCalendarStore';
		let extend: any = 'Ext.data.Store';
		let defineConfig: any = {
			autoLoad: true,
			proxy: { type: 'memory' },
			data: [
				{ id: 2, title: 'Donald', eventStore: { proxy: { type: 'ajax', url: 'assets/resources/app/calendars/DonaldTrump.json' } } },
				{ id: 3, title: 'Hillary', eventStore: { proxy: { type: 'ajax', url: 'assets/resources/app/calendars/HillaryClinton.json' } } }
			]
		};

		super(className, extend, defineConfig, createConfig);
	}
}