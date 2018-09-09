import Template from './Template';
var Ext = window.Ext; // add support for functions that return JSX elements in place of XTemplates

var getTpl = Ext.XTemplate.getTpl;
var originalGet = Ext.XTemplate.get;

Ext.XTemplate.get = function (fn) {
  if (typeof fn === 'function') {
    return new Template(fn);
  } else {
    return originalGet.apply(Ext.XTemplate, arguments);
  }
};

Ext.XTemplate.getTpl = function () {
  return getTpl.apply(Ext.XTemplate, arguments);
}; // automatically persist event before rippling


var originalRipple = Ext.dom.Element.prototype.ripple;

Ext.dom.Element.prototype.ripple = function (event) {
  if (event && event.persist) event.persist();
  return originalRipple.apply(this, arguments);
}; // enable component query by component name in Sencha Test


var originalWidgetIsXtype = Ext.Widget.prototype.isXType;

Ext.Widget.prototype.isXType = function (xtype, shallow) {
  return originalWidgetIsXtype.call(this, xtype.toLowerCase().replace(/_/g, '-'), shallow);
}; // needed for classic


if (Ext.Component.prototype.isXType) {
  Ext.Component.prototype.isXType = Ext.Widget.prototype.isXType;
}
//# sourceMappingURL=overrides.js.map