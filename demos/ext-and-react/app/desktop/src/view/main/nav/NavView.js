Ext.define('Ext-and-React.view.main.nav.NavView', {
    extend: 'Ext.Panel',
    xtype: 'navview',
    controller: "navviewcontroller",
    cls: 'navview',
    viewModel: {},
    layout: 'fit',
    tbar: {xtype: 'topview', height: 50},
    items: [ 
        {
            xtype: 'menuview', 
            reference: 'menuview', 
            bind: {width: '{menuview_width}'}, 
            listeners: { 
                selectionchange: "onMenuViewSelectionChange"
            }
        }
    ],
    bbar: {xtype: 'bottomview', bind: {height: '{bottomview_height}'}}
});
