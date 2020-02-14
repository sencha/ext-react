Ext.define('jsxInExtJSClassic.view.home.jsx', {
  extend: 'Ext.container.Container',
  xtype: 'jsxcontainer',
  width: '100%',
  listeners: {
    afterrender: function(h, e) {
      Ext.ReactDOM.render(
        Ext.React.createElement(this.part, {  }, null),
        this.el.dom
      )
    }
  }
})

Ext.define('jsxInExtJSClassic.view.home.HomeView',{
	xtype: 'homeview',
	cls: 'homeview',
	controller: {type: 'homeviewcontroller'},
	viewModel: {type: 'homeviewmodel'},
	requires: [],
	extend: 'Ext.panel.Panel',
  layout: 'vbox',
  items: [
    {xtype: 'jsxcontainer', part: Ext.jsx.Part1, flex: 1},
    {xtype: 'jsxcontainer', part: Ext.jsx.JsxPart4, flex: 1}
  ]
});