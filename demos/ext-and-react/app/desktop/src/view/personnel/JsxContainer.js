Ext.define('Ext-and-React.view.personnel.JsxContainer', {
  extend: 'Ext.container.Container',
  xtype: 'jsxcontainer',
  listeners: {
    beforerender: function(h, e) {
      var part;
      switch(this.part) {
        case 'JsxPart1':
          part = window.myVars.JsxPart1;
          break;
        case 'JsxPart2':
          part = window.myVars.JsxPart2;
          break;
        default:
          part = window.myVars.JsxPartDefault;
          break;
      }
      this.element = window.myVars.React.createElement(part, { theTitle: this.extTitle }, null)
    },
    afterrender: function(h, e) {
      window.myVars.ReactDOM.render(this.element, this.el.dom)
    }
  }
})
