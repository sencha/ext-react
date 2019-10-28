Ext.define('Ext-and-React.view.nav.menu.MenuView', {
    extend: 'Ext.list.Tree',
    xtype: 'menuview',
    viewModel: {},
    ui: 'nav',
    requires: [
        'Ext.data.TreeStore',
    ],
    scrollable: true,
    bind: { 
        store: '{menu}', 
        micro: '{navCollapsed}' 
    },
    expanderFirst: false,
    expanderOnly: false
});
