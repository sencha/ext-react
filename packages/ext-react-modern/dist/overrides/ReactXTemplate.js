import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';
export function doReactXTemplate() {
  var Template = Ext.define(null, {
    extend: 'Ext.Template',
    constructor: function constructor(fn) {
      this.fn = fn;
    },
    apply: function apply(values) {
      return ReactDOMServer.renderToStaticMarkup(this.fn(values));
    },
    doInsert: function doInsert(where, el, values, returnElement) {
      var target = this.getCachedTarget();
      this.doRender(values, target);
      var dom = target.firstChild;
      var result = Ext.dom.Helper.doInsert(el, dom, returnElement, where);
      this.unmountChildrenOnRemove(dom);
      return result;
    },
    overwrite: function overwrite(el, values, returnElement) {
      var dom = Ext.getDom(el);
      var result = this.doRender(values, dom);
      this.unmountChildrenOnRemove(dom);
      return returnElement ? new Ext.Element(dom) : dom;
    },
    getCachedTarget: function getCachedTarget() {
      if (!this.cachedTarget) this.cachedTarget = document.createElement('div');
      return this.cachedTarget;
    },
    doRender: function doRender(values, target) {
      var reactElement = this.fn(values);
      ReactDOM.render(reactElement, target);
      return target.firstChild;
    },
    unmountChildrenOnRemove: function unmountChildrenOnRemove(target) {
      var parent = target.parentNode;
      var parentKey = '$extreactObserveRemoveChild';
      var targetKey = '$extreactUnmountOnRemove';
      target[targetKey] = true; // we tag the target with $extreactUnmountOnRemove so we know it has a React tree to unmount when removed

      if (!parent[parentKey]) {
        // we tag the parent with $extreactObserveRemoveChild so we can ensure we are only observing it once
        parent[parentKey] = true;
        var observer = new MutationObserver(function (mutations) {
          mutations.forEach(function (_ref) {
            var removedNodes = _ref.removedNodes;

            for (var i = 0; i < removedNodes.length; i++) {
              var node = removedNodes[i];

              if (node[targetKey]) {
                ReactDOM.unmountComponentAtNode(node); // Unmount the React tree when the target dom node is removed.
              }
            }
          });
        });
        observer.observe(parent, {
          childList: true
        });
      }
    }
  });
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
  };
}