import {Component} from '@angular/core';

@Component({
	selector: 'simplegrid',
	template: `
	<ExtGrid fitToParent=true
		[columns]="gridcolumns"
		[store]="gridstore"
		(select)="onGridSelect($event)"
	></ExtGrid>
	`
})

export class SimpleGridComponent {

	gridcolumns = [
		{ text: 'Name', width: 250, dataIndex: 'name' },
		{ text: 'Email Address', flex: 1, dataIndex: 'email' },
		{ text: 'Phone Number', width: 250, dataIndex: 'phone' }
	];

	gridstore = {
		fields: ['name', 'email', 'phone'],
		data: [
			{ name: 'Lisa', email: 'lisa@simpsons.com', phone: '555-111-1224' },
			{ name: 'Bart', email: 'bart@simpsons.com', phone: '555-222-1234' },
			{ name: 'Homer', email: 'homer@simpsons.com', phone: '555-222-1244' },
			{ name: 'Marge', email: 'marge@simpsons.com', phone: '555-222-1254' }
		]
	};

 onGridSelect({record}) {
		alert(record.data.name);
	}
}












	// private onGridActivate(event) { console.log(event); }
	// private onGridHide(event) { console.log(event); }




	// private gridReady(grid) {
	// //	this.gridExtObject = grid.extjsObject;
	// }

// 	private onTap() {
// 		console.log('tap');
// //		this.gridExtObject.setStore()
// 	}
	//private onEmailChange({newValue}) { console.log(newValue); }

	// gridListeners = {
	// 	select: this.doSelect()
	// }
	// private doSelect() { alert('doselect'); }



		// (activate)="onGridActivate($event)"
		// (hideq)="onGridHide($event)"
		// (ready)="gridReady($event)"



// <x-formpanel title='hi' width='90%'>
// 	<x-emailfield
// 		label='Email'
// 		name='email'
// 		(change)='onEmailChange($event)'
// 	>
// 	</x-emailfield>
// 	<x-button text='hi' ui='action' (tapit)='onTap($event)'></x-button>
// </x-formpanel>


