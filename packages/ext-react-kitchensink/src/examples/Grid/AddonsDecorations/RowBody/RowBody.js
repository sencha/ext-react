import React, {Component} from 'react';
import { Grid, Column, } from '@sencha/ext-react-modern';
import model from '../../CompanyModel';



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
    console.log('a')
      return ReactDOMServer.renderToStaticMarkup(this.fn(values));
  },

  // overrides Ext.Template
  doInsert(where, el, values, returnElement) {
    console.log('b')
      const target = this.getCachedTarget();
      this.doRender(values, target);
      const dom = target.firstChild;
      const result = Ext.dom.Helper.doInsert(el, dom, returnElement, where);
      this.unmountChildrenOnRemove(dom);
      return result;
  },

  // overrides Ext.Template
  overwrite(el, values, returnElement) {
    console.log('c')
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
    console.log('d')
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
      console.log(target)
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





export default class RowBodyGridExample extends Component {

  store = Ext.create('Ext.data.Store', {
    model,
    autoLoad: true,
      pageSize: 0,
      proxy: {
          type: 'ajax',
          url: 'resources/data/CompanyData.json'
      }
  });

  tplorig = new Template(data => (
          <div>hi
              <div>{data.firstName} {data.lastName}</div>
              <div>{data.title}</div>
          </div>
      ))


  tplorig2 = data => (
    <div>
      <div>Industry: {data.industry}</div>
      <div>Last Updated: {Ext.util.Format.date(data.lastChange, "Y-m-d g:ia")}</div>
      <div style={{marginTop:'1em'}}>{data.desc}</div>
    </div>
  );

  tpl = data => {return `
    <div>
      <div>Industry: {data.industry}</div>
      <div>Last Updated: {Ext.util.Format.date(data.lastChange, "Y-m-d g:ia")}</div>
      <div style={{marginTop:'1em'}}>{data.desc}</div>
    </div>`};




render() {
    return (
      <Grid
          title="Row Body Grid"
          store={this.store}
          shadow
          itemConfig={{
              body:{
                  tpl: this.tplorig
                  //tpl: '<div>Industry: {industry}</div>' +
                  //    '<div>Last Updated: {lastChange:date("Y-m-d g:ia")}</div>' +
                  //    '<div style="margin-top: 1em;">{desc}</div>'

              }
          }}
      >
        <Column text="Company" dataIndex="name" width="150"/>
        <Column text="Price" dataIndex="price" width="75" formatter="usMoney"/>
        <Column text="Change" width="100" dataIndex="priceChange" renderer={this.renderSign.bind(this, '0.00')}/>
        <Column text="% Change" dataIndex="priceChangePct" renderer={this.renderSign.bind(this, '0.00')}/>
        <Column text="Last Updated" dataIndex="priceLastChange" width="125" formatter="date('m/d/Y')" />
      </Grid>
    )
  }

 renderSign = (format, value) => (
        <span style={{ color: value > 0 ? 'green' : value < 0 ? 'red' : ''}}>
            {Ext.util.Format.number(value, format)}
        </span>
  )

}