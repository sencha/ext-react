Ext.define('jsxInExtJSClassic.view.nav.menu.MenuView', {
	extend: 'Ext.list.Tree',
	requires: [
		'Ext.data.TreeStore',
	],
	xtype: 'menuview',
	ui: 'nav',
	scrollable: true,
	bind: { micro: '{navCollapsed}' },
	expanderFirst: false,
	expanderOnly: false,
	listeners: {
		selectionchange: 'onMenuViewSelectionChange'
	},
});
