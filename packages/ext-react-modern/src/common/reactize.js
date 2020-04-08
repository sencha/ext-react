import React from 'react';
import ReactDOM from 'react-dom';
import { doReactXTemplate } from '../overrides/ReactXTemplate';
import { doReactCell } from '../overrides/ReactCell';

//https://coryrylan.com/blog/using-web-components-in-react
//import ReactCell from './ReactCell.js';
//<script src="%PUBLIC_URL%/css.all.js"></script>
//<script src="%PUBLIC_URL%/ext.all.js"></script>
//<script src="%PUBLIC_URL%/ReactCell.js"></script>

window['ExtFramework'] = 'react';

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
        doReactXTemplate();
        if (Ext.isModern == true) {
          doReactCell();
        }
      }
    }

    static get displayName() {
      return displayName;
    }

    render() {
      var newProps = {};
      this.objectProps = {};
      var className = '';

      for (var prop in this.props) {
        if (prop.substring(0, 2) == 'on') {
          continue;
        }
        if (prop == 'style' || prop == 'children') {
          continue;
        }
        if (prop == 'className') {
          className = ' ' + this.props[prop];
          continue;
        }

        this.objectProps[prop] = this.props[prop];

        if (typeof this.props[prop] == 'function') {
          newProps[prop] = 'function';
        } else if (typeof this.props[prop] != 'object') {
          newProps[prop] = this.props[prop];
        }
        else {
          try {
            var JSONfn = {};
            JSONfn.stringify = function (obj) {
              return JSON.stringify(obj, function (key, value) {
                if (typeof value === 'function') {
                  return value.toString();
                } else {
                  return value;
                }
              });
            };
            var sPropValfn = JSONfn.stringify(this.props[prop]);
            newProps[prop] = sPropValfn;
          }
          catch (e) {
            newProps[prop] = this.props[prop];
          }
        }
      }

      if (newProps['cls'] == undefined) {
        if (className != '') {
          newProps['cls'] = className
        }
      }
      else {
        newProps['cls'] = newProps['cls'] + className
      }

      this.defer = true
      newProps['createExtComponentDefer'] = this.defer

      this.element = React.createElement(
          tagName,
          {
            ...newProps,
            style: this.props.style,
            ref: this.componentRef
          },
          this.props.children
      )
      return this.element;
    }

    componentDidMount() {
      this.componentRef.current.text = this.props.text;
      const node = ReactDOM.findDOMNode(this);

      var me = this;

      Object.keys(this.objectProps).forEach(function (name) {
        if (me.defer == true) {
          node.attributeObjects[name] = me.props[name];
        }
        else {
          node[name] = me.props[name];
        }
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

      if (this.defer == true) {
        node.doCreateExtComponent()
      }
      this.cmp = node.cmp;

    }

    componentDidUpdate(prevProps, prevState) {
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
        me.cmp = e.detail.cmp
        me.ext = e.detail.cmp
      }
      newEventHandler.call(this, e.detail);
    });
  }
}


