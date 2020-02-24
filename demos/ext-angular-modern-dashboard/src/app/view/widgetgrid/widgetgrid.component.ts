import { Component } from '@angular/core';
import { WidgetStore } from '../../store/widget.store';

@Component({
	styles:  [``],
  selector: '',
	template: `
		<grid fitToParent=true
			[config]='gridConfig' 
			(ready)="readyGrid($event)"
			(select)="selectGrid($event)"
		></grid>
	`
})
export class WidgetGridComponent { 

	selectGrid(o) {
		console.log(o.record);
	}

	readyGrid(theGrid) {
		console.log(theGrid);
	}

	private border:any = 0;
	private size: any = 'calc(100% - ' + (this.border * 2) + 'px)'
	private gridConfig:any;
	constructor() {
		this.gridConfig = { 
			left: this.border, top: this.border,
			style: { width: this.size, height: this.size },
			//shadow: true, 
			store: new WidgetStore({})['ext'],

			viewConfig: {
				stripeRows: true,
				enableTextSelection: false,
				markDirty: false
			},
			trackMouseOver: false,
			//disableSelection: true,
			columns: [
				{
					text: 'sparkline Data',
					width: 400,
					dataIndex: 's2'
				},
				{
					text: 'sparkline',
					width: 400,
					dataIndex: 's2',
					cell: {
							xtype: 'widgetcell',
							forceWidth: true,
							widget: {
									xtype: 'sparklineline'
							}
					}
				}

			]
			// columns: [
			// 	{
			// 			text     : 'Slider',
			// 			xtype    : 'widgetcolumn',
			// 			width    : 120,
			// 			dataIndex: 'progress',
			// 			widget: {
			// 					xtype: 'sliderwidget',
			// 					minValue: 0,
			// 					maxValue: 1,
			// 					decimalPrecision: 2,
			// 					listeners: {
			// 							change: function(slider, value) {

			// 									// If the widget has been decorated by the WidgetColumn with context-returning methods
			// 									// then extract data and update its context record.
			// 									if (slider.getWidgetRecord) {
			// 											var rec = slider.getWidgetRecord();
			// 											if (rec) {
			// 													rec.set('progress', value);
			// 											}
			// 									}
			// 							}
			// 					}
			// 			}
			// 	},
			// 	{
			// 			text: 'Button',
			// 			width: 105,
			// 			xtype: 'widgetcolumn',
			// 			dataIndex: 'progress',
			// 			widget: {
			// 					width: 90,
			// 					textAlign: 'left',
			// 					xtype: 'button',
			// 					iconCls: 'widget-grid-user',
			// 					handler: function(btn) {
			// 							var rec = btn.getWidgetRecord();
			// 							Ext.Msg.alert("Button clicked", "Hey! " + rec.get('name'));
			// 					}
			// 			}
			// 	},
			// 	{
			// 			text     : 'Progress',
			// 			xtype    : 'widgetcolumn',
			// 			width    : 120,
			// 			dataIndex: 'progress',
			// 			widget: {
			// 					xtype: 'progressbarwidget',
			// 					textTpl: [
			// 							'{percent:number("0")}% done'
			// 					]
			// 			}
			// 	},
			// 	{
			// 			text: 'Run Mode',
			// 			width: 150,
			// 			xtype: 'widgetcolumn',
			// 			widget: {
			// 					xtype: 'combo',
			// 					store: [
			// 							'Local',
			// 							'Remote'
			// 					]
			// 			}
			// 	},
			// 	//{
			// 	//    text: 'Line',
			// 	//    width: 100,
			// 	//    dataIndex: 'sequence1',
			// 	//    xtype: 'widgetcolumn',
			// 	//    widget: {
			// 	//        xtype: 'sparklineline',
			// 	//        tipTpl: 'Value: {y:number("0.00")}'
			// 	//    }
			// 	//},
			// 	{
			// 			text: 'Bar',
			// 			width: 100,
			// 			dataIndex: 'sequence2',
			// 			xtype: 'widgetcolumn',
			// 			widget: {
			// 					xtype: 'sparklinebar'
			// 			}
			// 	},
			// 	{
			// 			text: 'Discrete',
			// 			width: 100,
			// 			dataIndex: 'sequence3',
			// 			xtype: 'widgetcolumn',
			// 			widget: {
			// 					xtype: 'sparklinediscrete'
			// 			}
			// 	},
			// 	{
			// 			text: 'Bullet',
			// 			width: 100,
			// 			dataIndex: 'sequence4',
			// 			xtype: 'widgetcolumn',
			// 			widget: {
			// 					xtype: 'sparklinebullet'
			// 			}
			// 	},
			// 	{
			// 			text: 'Pie',
			// 			width: 60,
			// 			dataIndex: 'sequence5',
			// 			xtype: 'widgetcolumn',
			// 			widget: {
			// 					xtype: 'sparklinepie'
			// 			}
			// 	},
			// 	{
			// 			text: 'Box',
			// 			width: 100,
			// 			dataIndex: 'sequence6',
			// 			xtype: 'widgetcolumn',
			// 			widget: {
			// 					xtype: 'sparklinebox'
			// 			}
			// 	},
			// 	{
			// 			text: 'TriState',
			// 			width: 100,
			// 			dataIndex: 'sequence7',
			// 			xtype: 'widgetcolumn',
			// 			widget: {
			// 					xtype: 'sparklinetristate'
			// 			}
			// 	}
			// ]
		};
	}
}
