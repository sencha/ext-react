import Ext_container_Container from './Ext/container/Container.js';
import HTMLParsedElement from './HTMLParsedElement.js';

export default class ExtReactRenderer extends Ext_container_Container {
    constructor() {
        super ([],[])
        this.xtype = 'container';
    }
}
window.customElements.define('ext-react-renderer', HTMLParsedElement.withParsedCallback(ExtReactRenderer))
