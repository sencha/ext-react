import { Component } from '@angular/core';
import { CandidateCalendarStore } from '../../store/candidatecalendar.store';

@Component({
	styles:  [``],
  selector: '',
	template: `
		<calendar fitToParent=true [config]='calendarConfig'></calendar>
	`
})
export class CandidateCalendarsComponent { 
	calendarConfig: any = {
		timezoneOffset: 0,
		store: {
			autoLoad: true,
			proxy: { type: 'memory' },
			data: [
				{ id: 2, title: 'Donald', eventStore: { proxy: { type: 'ajax', url: 'assets/resources/app/calendars/DonaldTrump.json' } } },
				{ id: 3, title: 'Hillary', eventStore: { proxy: { type: 'ajax', url: 'assets/resources/app/calendars/HillaryClinton.json' } } }
			]
		},

//		defaultView: 'workweek',
//		switcherPosition: 'sideBar',
//		compact: true,
//		sideBar: { items: [ { xtype: 'button', weight: -1, text: 'I am a Button', handler: function() { alert('thanks for clicking me'); } } ] },

		views: { 
			month: { xtype: 'calendar-month', titleTpl: '{start:date("F Y")}', label: 'Month', weight: 30 },
			day: { xtype: 'calendar-day', titleTpl: '{start:date("l F d, Y")}', controlStoreRange: false, label: 'Day', weight: 10, dayHeader: null, startTime: 6, endTime: 22 }, 
			week: { xtype: 'calendar-week', dayHeaderFormat: 'D d', controlStoreRange: false, titleTpl: '{start:date("j M")} - {end:date("j M Y")}', label: 'Week', weight: 20 }, 
			workweek: { xtype: 'calendar-week',	dayHeaderFormat: 'D d', titleTpl: '{start:date("j M")} - {end:date("j M")}', label: 'Work Week', 	weight: 15, firstDayOfWeek: 1,visibleDays: 5 },
		},

		// 		 timezoneOffset: 0,
    //     gestureNavigation: false,
    //     showNowMarker: true,
		// 		 controlStoreRange: false,

	};
}





						// proxy: {
						// 		type: 'memory',
						// 		reader: {
						// 				type: 'json',
						// 				//rootProperty: 'users'
						// 		}

						//}
						// data: [
						// 	{
						// 		calendarId: 1,
						// 		id: 1,
						// 		title: 'Scrum',
						// 		allDay: false,
						// 		startDate: new Date('8/27/2016 03:05:01 PM GMT-0600'),
						// 		endDate: new Date('8/27/2016 04:05:01 PM GMT-0600')
						// 	}
						// ]



					// eventStore: {
					// 	autoLoad: true,
					// 	proxy: {
					// 			type: 'memory'
					// 	},
					// 	data: [
					// 		{
					// 			calendarId: 1,
					// 			id: 500,
					// 			title: 'Scrum',
					// 			allDay: false,
					// 			startDate: new Date('8/27/2016 03:05:01 PM GMT-0600'),
					// 			endDate: new Date('8/27/2016 04:05:01 PM GMT-0600')
					// 		}
					// 	]
					// }


			// data2: {
			// 	work: [
			// 		{
			// 			title: 'Scrum',
			// 			startDate: new Date('8/27/2016 03:05:01 PM GMT-0600'),
			// 			endDate: new Date('8/27/2016 04:05:01 PM GMT-0600')
			// 		}
			// 	]
			// }

