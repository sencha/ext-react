import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import Ext_container_Container from './Ext/container/Container.js';
import HTMLParsedElement from './HTMLParsedElement.js';

var ExtReact =
/*#__PURE__*/
function (_Ext_container_Contai) {
  _inheritsLoose(ExtReact, _Ext_container_Contai);

  function ExtReact() {
    var _this;

    _this = _Ext_container_Contai.call(this, [], []) || this;
    _this.xtype = 'container';
    return _this;
  }

  return ExtReact;
}(Ext_container_Container);

export { ExtReact as default };
window.customElements.define('ext-react', HTMLParsedElement.withParsedCallback(ExtReact));