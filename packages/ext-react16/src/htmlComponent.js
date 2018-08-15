import ReactDOM from 'react-dom';
import React from 'react';
export class htmlComponent {
  constructor(props) {
    this.props = props
    this.xtype = 'html'
  }
  _applyProps(oldProps, props, instance, type) {
    //this.cmp.el.dom.childNodes =props.children
    ReactDOM.render(React.createElement(type, props, props.children), instance.cmp.el.dom);
  }
}