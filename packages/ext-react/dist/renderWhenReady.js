import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import React from 'react';
var launchQueue = [];
/**
 * Higher order function that returns a component that waits for a ExtReact to be ready before rendering.
 * @param {class} Component 
 * @return {class}
 */

export default function renderWhenReady(Component) {
  var _class, _temp;

  return _temp = _class =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(ExtReactRenderWhenReady, _React$Component);

    function ExtReactRenderWhenReady() {
      var _this;

      _this = _React$Component.call(this) || this;
      _this.state = {
        ready: Ext.isReady,
        done: false
      };
      return _this;
    }

    var _proto = ExtReactRenderWhenReady.prototype;

    _proto.componentWillMount = function componentWillMount() {
      if (!this.state.ready) {
        launchQueue.push(this);
      }
    };

    _proto.render = function render() {
      if (this.state.ready === true && this.state.done == false) {
        this.state.done = true;
        return React.createElement(Component, this.props);
      } else {
        return false;
      }
    };

    return ExtReactRenderWhenReady;
  }(React.Component), _defineProperty(_class, "isExtJSComponent", true), _temp;
}
Ext.onReady(function () {
  for (var _i = 0; _i < launchQueue.length; _i++) {
    var queued = launchQueue[_i];
    queued.setState({
      ready: true
    });
  }
});
//# sourceMappingURL=renderWhenReady.js.map