import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import Ext_container_Container from './Ext/container/Container.js';
import HTMLParsedElement from './HTMLParsedElement.js';

var ExtReactRenderer =
/*#__PURE__*/
function (_Ext_container_Contai) {
  _inheritsLoose(ExtReactRenderer, _Ext_container_Contai);

  function ExtReactRenderer() {
    var _this;

    _this = _Ext_container_Contai.call(this, [], []) || this;
    _this.xtype = 'container';
    return _this;
  }

  return ExtReactRenderer;
}(Ext_container_Container);

export { ExtReactRenderer as default };
window.customElements.define('ext-react-renderer', HTMLParsedElement.withParsedCallback(ExtReactRenderer));