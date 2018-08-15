import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import ReactDOM from 'react-dom';
import React from 'react';
export var htmlComponent = function () {
  function htmlComponent(props) {
    _classCallCheck(this, htmlComponent);

    this.props = props;
    this.xtype = 'html';
  }

  htmlComponent.prototype._applyProps = function _applyProps(oldProps, props, instance, type) {
    //this.cmp.el.dom.childNodes =props.children
    ReactDOM.render(React.createElement(type, props, props.children), instance.cmp.el.dom);
  };

  return htmlComponent;
}();
//# sourceMappingURL=htmlComponent.js.map