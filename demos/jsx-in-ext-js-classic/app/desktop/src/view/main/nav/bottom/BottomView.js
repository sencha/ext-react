Ext.define('jsxInExtJSClassic.view.main.nav.bottom.BottomView', {
	extend: 'Ext.Toolbar',
	xtype: 'bottomview',
	cls: 'bottomview',
  defaults: {
    ui:'toolbutton-toolbar', 
    handler:'onToolButtonClicked'
  },
	items: [
    {name:'calendar', iconCls:'x-fa fa-calendar', tooltip:'calendar'},
    {name:'bolt',     iconCls:'x-fa fa-bolt',     tooltip:'bolt'},
    {name:'search',   iconCls:'x-fa fa-search',   tooltip:'search'},
	]
});