Ext.define('Ext-and-React.view.main.nav.top.TopView', {
    extend: 'Ext.Toolbar',
    xtype: 'topview',
    cls: 'topview',
    viewModel: {},
    shadow: false,
    items: [
        {
            xtype: 'container', 
            cls: 'topviewtext',
            bind: { 
                html: '{name}',
                hidden: '{navCollapsed}' 
            }
        },
        '->',
        {
            xtype: 'button',
            ui: 'topviewbutton',
            reference: 'navtoggle',
            handler: 'onTopViewNavToggle',
            iconCls: 'x-fa fa-navicon'
        }
    ]
});