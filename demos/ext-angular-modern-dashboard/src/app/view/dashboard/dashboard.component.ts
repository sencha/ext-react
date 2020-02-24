import { Component } from '@angular/core';
import { AgencyService }  from '../../service/agency.service';
import { AgencyStore } from '../../store/agency.store';
import { StocksStore } from '../../store/stocks.store';

@Component({
	styleUrls: ['./dashboard.component.css'],
	//styles:[require('./dashboard.component.css').toString()],
  selector: '',
	templateUrl: 'dashboard.component.html'
})
export class DashboardComponent {
		// 	<div class="col-md-4 col-sm-4 col-xs-12">
		// 	<div class="home-panel" style="height:280px">
		// 		<div class="home-panel-title">
		// 			ActionSheet
		// 			<button style="margin-top:-5px;margin-right:5px;float:right;" (click)="onActionSheetShow()">Show</button>
		// 		</div>
		// 		<actionsheet [items]="actionsheetItems" (ready)="onActionSheetReady($event)"></actionsheet>
		// 	</div>
		// </div>
	//  actionsheet: any;
	// actionsheetItems = [
	// 	{ text: 'Delete draft',ui: 'decline' },
	// 	{ text: 'Save draft' },
	// 	//{ text: 'Cancel', ui: 'confirm', xlisteners: {click: this.onActionSheetHide(this)} }
	// ];
	// onActionSheetReady(actionsheet) {
	// 	this.actionsheet = actionsheet;
	// 	this.actionsheet.extjsObject.show();
	// }
	// onActionSheetShow() {
	// 	this.actionsheet.extjsObject.show();
	// }
	// // onActionSheetHide(component) {
	// // 	debugger;
	// // 	//component.actionsheet.extjsObject.hide();
	// // }

	 theCalendar: any;
	readyCalendar(theCalendar) {
		this.theCalendar = theCalendar;
	}
	 calendarConfig:any =  {
		left: 0, top: 40,
		style: { width: '100%', height: 'calc(100% - 40px)' },

		timezoneOffset: 0,
		store: {
			autoLoad: true,
			proxy: { type: 'memory' },
			data: [
				{ id: 2, title: 'Donald', eventStore: { proxy: { type: 'ajax', url: 'assets/resources/app/calendars/DonaldTrump.json' } } },
				{ id: 3, title: 'Hillary', eventStore: { proxy: { type: 'ajax', url: 'assets/resources/app/calendars/HillaryClinton.json' } } }
			]
		}


		// timezoneOffset: 0,
		// //resizeEvents: false,
		// startTime: 10,
		// endTime: 14,
		// store: {
		// 	autoLoad: true,
		// 	proxy: { type: 'memory' },
		// 	data: [
		// 		{ id: 2, title: 'Donald', eventStore: { proxy: { type: 'ajax', url: 'resources/data/calendars/DonaldTrump.json' } } },
		// 		{ id: 3, title: 'Hillary', eventStore: { proxy: { type: 'ajax', url: 'resources/data/calendars/HillaryClinton.json' } } }
		// 	]
		// }
	}



	 d3Config:any = {};
	 carouselConfig:any = {};
	 pivotgridConfig:any = {};
	 polarConfig:any = {};
	 cartesianConfig:any = {};
	 listConfig:any = {};
	 timerId: any;
	 theCarousel: any;

	readyCarousel(theCarousel) {
		this.theCarousel = theCarousel;
		this.onAutoPlay();
	}

	onAutoPlay() {
		var carousel = this.theCarousel.extjsObject;
		this.timerId = setInterval(function () {
			carousel.next();
			if (carousel.getActiveIndex() === carousel.getMaxItemIndex()) {
					carousel.setActiveItem(0);
			}
		}, 5000);
	}

	onStopAutoPlay() {
		clearInterval(this.timerId );
	}

  agencyService: any;
	constructor( agencyService: AgencyService) {
    this.agencyService = agencyService;

		this.d3Config = {
			left: 0, top: 40,
			style: { width: '100%', height: 'calc(100% - 40px)', xmargin: '10px 10px -10px 10px' },
			store: new StocksStore()['ext'],
			rootVisible: false,
			nodeValue: function (node) {
					return node.data.cap;
			},
			colorAxis: {
					scale: {
							type: 'linear',
							domain: [-5, 0, 5],
							range: ['#E45649', '#ECECEC', '#50A14F']
					},
					field: 'change',
					processor: function (axis, scale, node, field) {
						var record = node.data;
						return record.isLeaf() ? scale(record.get(field)) : '#ececec';
					}
			}
		}

		var items:any = [
			{ html: '<div style="width:100%;padding:10px 10px 0 10px;text-align:center;"><img style="height:140px;display:block;margin:0 auto;" src="assets/resources/app/users/DonaldTrump.jpeg"/><div>I\'m the Ernest Hemingway of 140 characters.</div></div>' },
			{ html: '<div style="width:100%;padding:10px 10px 0 10px;text-align:center;"><img style="height:140px;display:block;margin:0 auto;" src="assets/resources/app/users/BarackObama.jpeg"/>Look, when I was a kid, I inhaled frequently. That was the point.<div>' },
			{ html: '<div style="width:100%;padding:10px 10px 0 10px;text-align:center;"><img style="height:140px;display:block;margin:0 auto;" src="assets/resources/app/users/HillaryClinton.jpeg"/>What, like with a cloth or something?<div>' }

			// {
			// 		xtype: 'list',
			// 		margin:40,
			// 		items: {
			// 				xtype: 'toolbar',
			// 				docked: 'top',
			// 				title: 'Who??'
			// 		},

			// 		store: {
			// 				fields: ['name'],
			// 				data: [
			// 						{name: 'Donald'},
			// 						{name: 'Barack'},
			// 						{name: 'Hillary'}
			// 				]
			// 		},
			// 		itemTpl: '{name}'
			// }
		]

		this.carouselConfig = {
			left: 0, top: 40,
			style: { width: '100%', height: 'calc(100% - 40px)', xmargin: '10px 10px -10px 10px' },
			items: items

  // listeners:
  //       {
  //           'show': function(carousel) {
  //               carousel.pageTurner = new Ext.util.DelayedTask(function() {
  //                   if (carousel.getActiveIndex() == carousel.items.length - 2) {
  //                       carousel.setActiveItem(0, 'slide');
  //                   }
  //                   else {
  //                       carousel.next();
  //                   }
  //               }, carousel);
  //               carousel.pageTurner.delay(1000);
  //           },

  //               'activeitemchange': function(carousel){
  //                   if (carousel.getActiveIndex() == 0) {
  //                      carousel.fireEvent('show',this);

  //                   } else

  //                   carousel.pageTurner.delay(1000);
  //               },

  //       },





		}

		this.pivotgridConfig = {
			left: 0, top: 40,
			style: { width: '100%', height: 'calc(100% - 40px)' },
			matrix: {
				type: 'local',
				store: this.agencyService.getAgencyPortfolioStore(),
				topAxis: [],
				leftAxis: [{ dataIndex: 'typeOfInvestment', locked : true, header: 'Type Of Investment', width: 250 }],
				aggregate: [{ dataIndex: 'totalITspendingCYB', id: 'totalITspendingCYB', header: 'Total IT spending', width: 250 }],
			}
		};

		this.polarConfig = {
			left: 0, top: 40,
			style: { width: '100%', height: 'calc(100% - 40px)' },
			store: this.agencyService.getSampleData1(),
			series: {
					type: 'pie',
					//label: { field: 'name', display: 'rotate' },
					xField: 'data3',
					donut: 30
			}
		};

		this.cartesianConfig = {
			left: 0, top: 40,
			style: { width: '100%', height: 'calc(100% - 40px)' },
			store: this.agencyService.getSampleData1(),
			series: [
				{
					type: 'bar',
					xField: 'name',
					yField: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6'],
					title: ['Apples', 'Oranges', 'Bananas', 'Plums', 'Mangos', 'Pears'],
					stacked: false,
					style: { lineWidth: 2 }
				}
			],
			axes: [
				{
					type: 'numeric',
					position: 'left',
					fields: ['data1', 'data2', 'data3', 'data4', 'data5', 'data6'],
					label: {
							rotate: {
									degrees: -30
							}
					}
				},
				{
					type: 'category',
					position: 'bottom',
					fields: 'name'
				}
			]
		};

		this.listConfig = {
			left: 0, top: 40,
			style: { width: '100%', height: 'calc(100% - 40px)' },
			store: new AgencyStore()['ext'],
			//store: agencyService.getAgencyStore(),
			itemTpl: '{agencyCode} - {agencyName} ({agencyAbbreviation})',
		};

	}

}
