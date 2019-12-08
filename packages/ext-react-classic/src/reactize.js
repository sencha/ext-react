import React from 'react';
import ReactDOM from 'react-dom';
//https://coryrylan.com/blog/using-web-components-in-react
//import ReactCell from './ReactCell.js';
//<script src="%PUBLIC_URL%/css.all.js"></script>
//<script src="%PUBLIC_URL%/ext.all.js"></script>
//<script src="%PUBLIC_URL%/ReactCell.js"></script>

function syncEvent(node, eventName, newEventHandler, me) {
  const eventname = eventName[0].toLowerCase() + eventName.substring(1);
  const eventStore = node.__events || (node.__events = {});
  const oldEventHandler = eventStore[eventname];
  if (oldEventHandler) {
    node.removeEventListener(eventname, oldEventHandler);
  }
  if (newEventHandler) {
    node.addEventListener(eventname, eventStore[eventname] = function handler(e) {
      //console.log('eventHandler')
      //console.log(eventname)
      //console.dir(e)
      // if (eventname == 'cmpready') {
      //   //console.dir('cmpready')
      //   me.cmp = event.detail.cmp
      //   me.ext = event.detail.cmp
      //   return
      // }

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
    }

    static get displayName() {
      return displayName;
    }

    render() {
      //console.log('*****render: ' + tagName)
      //console.log(this.props)

      //var newProps = Object.assign({},this.props);
      //newProps['aMe'] = this
      //console.log(newProps)
      //this.element = React.createElement(tagName, { style: this.props.style }, this.props.children);

      var newProps = {
        viewport: this.props.viewport
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
      return this.element;
    }

    componentDidMount() {
      this.componentRef.current.text = this.props.text;
      const node = ReactDOM.findDOMNode(this);
      this.cmp = node.cmp;
      Object.keys(this.props).forEach(name => {
          if (name === 'children' || name === 'style') {
              return;
          }
          if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
              syncEvent(node, name.substring(2), this.props[name], this);
          }
          else {
              //console.log(name)
              if (name != 'viewport') {
                node[name] = this.props[name];
              }
          }
      });
      //syncEvent(node, 'cmpready', true, this);
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
