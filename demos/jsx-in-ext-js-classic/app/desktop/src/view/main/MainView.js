Ext.define('jsxInExtJSClassic.view.main.MainView', {
  extend: 'Ext.Container',
  xtype: 'mainview',
  controller: 'mainviewcontroller',
  viewModel: {
    type: 'mainviewmodel'
  },
  layout: 'border',
  items: [
    {
        xtype: "navview",
        reference: "navview",
        region: "west",
        weight: -1,
        listeners: {
            select: "onMenuViewSelectionChange"
        },
        bind: {
            name: "{name}",
            width: "{navview_width}",
            store: "{menu}",
            selection: "{menuItem}"
        }
    },
    { xtype: 'headerview', reference: 'headerview', region: 'north', docked: 'top',    weight: -2 },
    { xtype: 'footerview', reference: 'footerview', region: 'south', docked: 'bottom', weight: -2 },
    { xtype: 'centerview', reference: 'centerview', region: 'center', weight: -1 },
    { xtype: 'detailview', reference: 'detailview', region: 'east', docked: 'right',  bind: {width:  '{detailview_width}'}  },
  ]
});