Ext.require([
  'Ext.grid.filters.Filters',
  'Ext.grid.column.Action',
  'Ext.form.Panel'
])

Ext.define('jsxInExtJSClassic.view.home.NamesView',{
	xtype: 'namesview',
  extend: 'jsxInExtJSClassic.view.home.ReactView',
  part: Ext.components.react.Names
});