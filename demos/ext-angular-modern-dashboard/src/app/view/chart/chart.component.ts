import { Component, OnInit } from '@angular/core';

@Component({
	styles:  [``],
  selector: '',
	template: `
	<cartesian downloadServerUrl ="http://svg.sencha.io" fitToParent=true [config]='cartesianConfig' ></cartesian>
	
	<div style="width:500px;height:500px;">
	</div>
	`
})
export class ChartComponent implements OnInit { 
	private border:any = 0;
	private size: any = 'calc(100% - ' + (this.border * 2) + 'px)'
	private polarConfig:any = {};
	private cartesianConfig:any = {};

  ngOnInit() {

		this.cartesianConfig = {
			store: {
					fields: ['name', 'data1', 'data2', 'data3', 'data4', 'data5'],
					data: [
							{'name':'metric one', 'data1':10, 'data2':12, 'data3':14, 'data4':8, 'data5':13},
							{'name':'metric two', 'data1':7, 'data2':8, 'data3':16, 'data4':10, 'data5':3},
							{'name':'metric three', 'data1':5, 'data2':2, 'data3':14, 'data4':12, 'data5':7},
							{'name':'metric four', 'data1':2, 'data2':14, 'data3':6, 'data4':1, 'data5':23},
							{'name':'metric five', 'data1':27, 'data2':38, 'data3':36, 'data4':13, 'data5':33}
					]
			},

			legend: {
					type: 'sprite',
					position: 'bottom'
			},
			// innerPadding: '0 3 0 3',
			// insetPadding: '30 10 10 10',
			// interactions: [
			// 	{
			// 		type: 'panzoom',
			// 		axes: {
			// 				left: {
			// 						allowPan: false,
			// 						allowZoom: false
			// 				},
			// 				bottom: {
			// 						allowPan: true,
			// 						allowZoom: true
			// 				}
			// 		}
			// 	}
			// ],
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
					fields: 'name',
					//visibleRange: [0, 0.2]
				}
			]
		};
	}
}
