Ext.require([
  'Ext.grid.filters.Filters',
  'Ext.grid.column.Action',
  'Ext.form.Panel'
])

Ext.define('jsxInExtJSClassic.view.home.HomeView',{
	xtype: 'homeview',
	cls: 'homeview',
	controller: {type: 'homeviewcontroller'},
	viewModel: {type: 'homeviewmodel'},
	requires: [],
	extend: 'Ext.panel.Panel',
  layout: 'vbox',
  items: [
    {xtype: 'reactview', part: Ext.components.react.Part1, flex: 1},
    {xtype: 'reactview', part: Ext.components.react.JsxPart4, flex: 1}
  ]
});