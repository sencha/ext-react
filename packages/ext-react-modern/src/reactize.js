import React from 'react';
import ReactDOM from 'react-dom';
import { doTemplate2 } from './Template2';

//https://coryrylan.com/blog/using-web-components-in-react
//import ReactCell from './ReactCell.js';
//<script src="%PUBLIC_URL%/css.all.js"></script>
//<script src="%PUBLIC_URL%/ext.all.js"></script>
//<script src="%PUBLIC_URL%/ReactCell.js"></script>

window['ExtFramework'] = 'react';

function syncEvent(node, eventName, newEventHandler, me) {
  const eventname = eventName[0].toLowerCase() + eventName.substring(1);
  const eventStore = node.__events || (node.__events = {});
  const oldEventHandler = eventStore[eventname];
  if (oldEventHandler) {
    node.removeEventListener(eventname, oldEventHandler);
  }
  if (newEventHandler) {
    node.addEventListener(eventname, eventStore[eventname] = function handler(e) {
      if (eventname == 'ready') {
        me.cmp = event.detail.cmp
        me.ext = event.detail.cmp
      }
      newEventHandler.call(this, e.detail);
    });
  }
}

export default function (CustomElement) {

  if (typeof CustomElement !== 'function') {
    throw new Error('Given element is not a valid constructor');
  }
  const tagName = (new CustomElement()).tagName;

  function toPascalCase(s) {
    return s.match(/[a-z]+/gi)
        .map(function (word) {
            return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
        })
        .join('')
  }
  const displayName = toPascalCase(tagName)

  class ReactComponent extends React.Component {
    constructor(props) {
      super(props)
      this.componentRef = React.createRef();

      if (window['ExtReact'] == null) {
        window['ExtReact'] = 'loaded'
        console.log('before Template2');
        doTemplate2()
        console.log('after Template2');

        // Ext.onReady(function () {
        //   console.log('before Template2');
        //   doTemplate2()
        //   // console.log('after Template2');
        //   // var Template = Ext.define(null, {
        //   //   extend: 'Ext.Template',
        //   //   constructor: function constructor(fn) {
        //   //     this.fn = fn;
        //   //   },
        //   //   apply: function apply(values) {
        //   //     return ReactDOMServer.renderToStaticMarkup(this.fn(values));
        //   //   },
        //   //   doInsert: function doInsert(where, el, values, returnElement) {
        //   //     var target = this.getCachedTarget();
        //   //     this.doRender(values, target);
        //   //     var dom = target.firstChild;
        //   //     var result = Ext.dom.Helper.doInsert(el, dom, returnElement, where);
        //   //     this.unmountChildrenOnRemove(dom);
        //   //     return result;
        //   //   },
        //   //   overwrite: function overwrite(el, values, returnElement) {
        //   //     var dom = Ext.getDom(el);
        //   //     var result = this.doRender(values, dom);
        //   //     this.unmountChildrenOnRemove(dom);
        //   //     return returnElement ? new Ext.Element(dom) : dom;
        //   //   },
        //   //   getCachedTarget: function getCachedTarget() {
        //   //     if (!this.cachedTarget) this.cachedTarget = document.createElement('div');
        //   //     return this.cachedTarget;
        //   //   },
        //   //   doRender: function doRender(values, target) {
        //   //     var reactElement = this.fn(values);
        //   //     ReactDOM.render(reactElement, target);
        //   //     return target.firstChild;
        //   //   },
        //   //   unmountChildrenOnRemove: function unmountChildrenOnRemove(target) {
        //   //     var parent = target.parentNode;
        //   //     var parentKey = '$extreactObserveRemoveChild';
        //   //     var targetKey = '$extreactUnmountOnRemove';
        //   //     target[targetKey] = true; // we tag the target with $extreactUnmountOnRemove so we know it has a React tree to unmount when removed
        //   //     if (!parent[parentKey]) {
        //   //       // we tag the parent with $extreactObserveRemoveChild so we can ensure we are only observing it once
        //   //       parent[parentKey] = true;
        //   //       var observer = new MutationObserver(function (mutations) {
        //   //         mutations.forEach(function (_ref) {
        //   //           var removedNodes = _ref.removedNodes;
        //   //           for (var i = 0; i < removedNodes.length; i++) {
        //   //             var node = removedNodes[i];
        //   //             if (node[targetKey]) {
        //   //               ReactDOM.unmountComponentAtNode(node); // Unmount the React tree when the target dom node is removed.
        //   //             }
        //   //           }
        //   //         });
        //   //       });
        //   //       observer.observe(parent, {
        //   //         childList: true
        //   //       });
        //   //     }
        //   //   }
        //   // });
        //   // var getTpl = Ext.XTemplate.getTpl;
        //   // var originalGet = Ext.XTemplate.get;
        //   // Ext.XTemplate.get = function (fn) {
        //   //   if (typeof fn === 'function') {
        //   //     return new Template(fn);
        //   //   } else {
        //   //     return originalGet.apply(Ext.XTemplate, arguments);
        //   //   }
        //   // };
        //   // Ext.XTemplate.getTpl = function () {
        //   //   return getTpl.apply(Ext.XTemplate, arguments);
        //   // };
        //   // //console.log('template override loaded')
        // })
      }
    }

    static get displayName() {
      return displayName;
    }

    render() {
      //console.log('*****render: ' + tagName)
      //console.log(this.props)
      var newProps = {};
      this.objectProps = {};
      var className = '';
      for (const prop in this.props) {
        var t = typeof this.props[prop]

        if (prop == 'className') {
          className = ' ' + this.props[prop];
        }
        else if (t == 'function') {
          newProps[prop] = function() {} //'function';
          this.objectProps[prop] = this.props[prop];

          // if (prop == 'renderer' || prop == 'summaryRenderer') {
          //   newProps[prop] = 'function';
          //   this.objectProps[prop] = this.props[prop];
          // }
          // else {
          //   newProps[prop] = this.props[prop];
          //   this.objectProps[prop] = this.props[prop];
          // }
        }
        else if (t != 'object') {
          newProps[prop] = this.props[prop];
        }
        else {
          if (prop == 'style' || prop == 'children') {
          }
          // else if (prop == 'columns') {
          //   this.objectProps[prop] = this.props[prop];
          // }
          else {
            var sPropVal = ''
            try {

              var JSONfn = {};
              var hasFunction = false;
              // if (!JSONfn) {
              //     JSONfn = {};
              // }

              (function () {
                JSONfn.stringify = function(obj) {
                  return JSON.stringify(obj,function(key, value) {
                    if (typeof value === 'function' ) {
                      hasFunction = true;
                      //console.log(key)
                      return value.toString();
                    }
                    else {
                      return value;
                    }
                  });
                }

                // JSONfn.parse = function(str) {
                //   return JSON.parse(str,function(key, value){
                //       if(typeof value != 'string') return value;
                //       return ( value.substring(0,8) == 'function') ? eval('('+value+')') : value;
                //   });
                //}
              }());

              hasFunction = false;
              var sPropValfn = JSONfn.stringify(this.props[prop]);
              if (hasFunction == true) {
                console.log(`${prop} has function`)
                console.log(this.props[prop])
                newProps[prop] = function() {} //'function';
                this.objectProps[prop] = this.props[prop];
              }
              else {
                newProps[prop] = sPropValfn;
              }

              // sPropVal = JSON.stringify(this.props[prop]); //functions are swallowed - mjg
              // if (prop == 'itemConfig') {
              //   this.objectProps[prop] = this.props[prop];
              // }
              // else {
              //   newProps[prop] = sPropVal;
              // }


            }
            catch(e) {
              this.objectProps[prop] =this.props[prop];
            }
          }
        }
      }

      //console.log(newProps['cls'])
      //console.log(className)
      if (newProps['cls'] == undefined) {
        if (className != '') {
          newProps['cls'] = className
        }
      }
      else {
        newProps['cls'] = newProps['cls'] + className
      }

      this.element = React.createElement(
          tagName,
          {
            ...newProps,
            style: this.props.style,
            ref: this.componentRef
          },
          this.props.children
      )
      // console.log(newProps)
      // console.log(this.objectProps)
      // console.log(this.element)
      return this.element;
    }

    componentDidMount() {
      this.componentRef.current.text = this.props.text;
      const node = ReactDOM.findDOMNode(this);
      this.cmp = node.cmp;

      var me = this;
      Object.keys(this.objectProps).forEach(function (name) {
        node[name] = me.props[name];
      });

      Object.keys(this.props).forEach(name => {
        if (name === 'children' || name === 'style' || name === 'viewport' || name === 'layout') {
            return;
          }
          if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
            syncEvent(node, name.substring(2), me.props[name], me);
          }
          else {
            //node[name] = this.props[name];
          }
      });
    }

    componentDidUpdate(prevProps, prevState) {
      //console.log('componentDidUpdate: ' + tagName)
      var me = this;
      for (var prop in prevProps) {
        if (!/^on/.test(prop)) {
          if (me.props[prop] !== prevProps[prop] && prop != 'children') {
            var node = ReactDOM.findDOMNode(this);
            me.componentRef.current[prop] = me.props[prop];
            node[prop] = me.props[prop]
          }
        }
      }
    }


  }

  const proto = CustomElement.prototype;
  Object.getOwnPropertyNames(proto).forEach(prop => {
    Object.defineProperty(ReactComponent.prototype, prop, Object.getOwnPropertyDescriptor(proto, prop));
  });

  return ReactComponent;
}
