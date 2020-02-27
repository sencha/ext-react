// import React from 'react'
// import App from './App'
// import * as d3 from 'd3'
// import * as FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min.js';

// window.d3 = d3
// require('./index.css')
// import './Data'
// window.FroalaEditor = FroalaEditor;

// Ext.require([
//   'Ext.*',
//   'Ext.ux.*',
//   'Ext.panel.Collapser',
//   'Ext.layout.Fit'
// ])

// import { launch } from '@sencha/ext-react-modern'
// import { ExtReact } from '@sencha/ext-react-modern'
// //import './themer.js'

// launch(() => {
//   let top = Ext.get('loadingSplashTop'), wrapper = Ext.get('loadingSplash')
//   top.on('transitionend', wrapper.destroy, wrapper, { single: true })
//   wrapper.addCls('app-loaded')
//   return <ExtReact><App/></ExtReact>
//   },
//   { debug: false },
//   {
//     quickTips: {
//       tooltip: {
//           // show qtips on tap on mobile
//           showOnTap: true
//       },
//       overflowTip: {
//           // This means that mouseover (or a touch)
//           // cancels the auto dismiss timer to give the
//           // user an opportunity to read long text.
//           // Tap outside of the tip then closes it.
//           allowOver: true
//       }
//     }
//   }
// )


//import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server';

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import { launch } from '@sencha/ext-react-modern'
//import * as serviceWorker from './serviceWorker';

import * as d3 from 'd3'
import * as FroalaEditor from 'froala-editor/js/froala_editor.pkgd.min.js';

const Ext = window.Ext;

window.d3 = d3
require('./index.css')
import './Data'
window.FroalaEditor = FroalaEditor;

Ext.require([
  'Ext.*',
  'Ext.ux.*',
  'Ext.panel.Collapser',
  'Ext.layout.Fit'
])

//launch(<App />, document.getElementById('root'));

Ext.onReady(function () {



  /**
   * A implementation of Ext.Template that supports React elements (JSX).
   *
   * Usage:
   *
   *  const tpl = new Template(data => (
   *      <div>
   *          <div>{data.firstName} {data.lastName}</div>
   *          <div>{data.title}</div>
   *      </div>
   *  ))
   *
   *  const html = tpl.apply({ firstName: 'Joe', lastName: 'Smith', title: 'CEO' });
   */
  var Template = Ext.define(null, {
      extend: 'Ext.Template',

      /**
       * @param {Function} fn A function that takes data values as an object and returns a React.Element to be rendered.
       */
      constructor(fn) {
          this.fn = fn;
          console.log('con')
      },

      // overrides Ext.Template
      apply(values) {
        console.log('hi')
          return ReactDOMServer.renderToStaticMarkup(this.fn(values));
      },

      // overrides Ext.Template
      doInsert(where, el, values, returnElement) {
          const target = this.getCachedTarget();
          this.doRender(values, target);
          const dom = target.firstChild;
          const result = Ext.dom.Helper.doInsert(el, dom, returnElement, where);
          this.unmountChildrenOnRemove(dom);
          return result;
      },

      // overrides Ext.Template
      overwrite(el, values, returnElement) {
          const dom = Ext.getDom(el);
          const result = this.doRender(values, dom);
          this.unmountChildrenOnRemove(dom);
          return returnElement ? new Ext.Element(dom) : dom;
      },

      /**
       * @private
       * @return {HTMLElement}
       */
      getCachedTarget() {
          if (!this.cachedTarget) this.cachedTarget = document.createElement('div');
          return this.cachedTarget;
      },

      /**
       * Renders the result of this.fn to the specified target
       * @private
       * @param {Object} values Values to pass to this.fn
       * @param {HTMLElement} target The element into which the result should be rendered.
       * @return {HTMLElement} The newly rendered element
       */
      doRender(values, target) {
          const reactElement = this.fn(values);
          ReactDOM.render(reactElement, target);
          return target.firstChild;
      },

      /**
       * Ensures that componentWillUnmount is called on each descendent component when the target node is removed from the DOM.
       * @param {Node} target A node containing a React tree
       */
      unmountChildrenOnRemove(target) {
          const parent = target.parentNode;
          const parentKey = '$extreactObserveRemoveChild';
          const targetKey = '$extreactUnmountOnRemove';
          target[targetKey] = true; // we tag the target with $extreactUnmountOnRemove so we know it has a React tree to unmount when removed

          if (!parent[parentKey]) { // we tag the parent with $extreactObserveRemoveChild so we can ensure we are only observing it once
              parent[parentKey] = true;

              const observer = new MutationObserver(mutations => {
                  mutations.forEach(({ removedNodes }) => {
                      for (let i=0; i<removedNodes.length; i++) {
                          let node = removedNodes[i];

                          if (node[targetKey]) {
                              ReactDOM.unmountComponentAtNode(node); // Unmount the React tree when the target dom node is removed.
                          }
                      }
                  })
              });

              observer.observe(parent, { childList: true });
          }
      }
  });

  //export default Template;

  // Hook Ext.XTemplate.get so that we can just pass a function that returns JSX in place of a XTemplate.






  ReactDOM.render(<App />, document.getElementById('root'));
});



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();

