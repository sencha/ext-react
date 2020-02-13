import React from 'react';
import ReactDOM from 'react-dom';

import JsxPart1 from './JsxPart1';
import JsxPart2 from './JsxPart2';
import JsxPartDefault from './JsxPartDefault';

var Ext = window['Ext'];

var JsxContainer = Ext.define('jsx', {
  extend: 'Ext.container.Container',
  xtype: 'jsxcontainer',
  listeners: {
    beforerender: function(h, e) {
      var part;
      switch(this.part) {
        case 'JsxPart1':
          part = JsxPart1;
          break;
        case 'JsxPart2':
          part = JsxPart2;
          break;
        default:
          part = JsxPartDefault;
          break;
      }
      this.element = React.createElement(part, { theTitle: this.extTitle }, null)
    },
    afterrender: function(h, e) {
      ReactDOM.render(this.element, this.el.dom)
    }
  }
})

export default JsxContainer;