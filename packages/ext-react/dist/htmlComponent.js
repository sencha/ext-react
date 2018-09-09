import ReactDOM from 'react-dom';
import React from 'react';
export var htmlComponent =
/*#__PURE__*/
function () {
  function htmlComponent(props) {
    this.props = props;
    this.xtype = 'html';
  }

  var _proto = htmlComponent.prototype;

  _proto._applyProps = function _applyProps(oldProps, props, instance, type) {
    //this.cmp.el.dom.childNodes =props.children
    ReactDOM.render(React.createElement(type, props, props.children), instance.cmp.el.dom);
  };

  return htmlComponent;
}();
//# sourceMappingURL=htmlComponent.js.map