import _extends from "@babel/runtime/helpers/extends";
import _createClass from "@babel/runtime/helpers/createClass";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';
import ReactDOM from 'react-dom'; //https://coryrylan.com/blog/using-web-components-in-react
//import ReactCell from './ReactCell.js';
//<script src="%PUBLIC_URL%/css.all.js"></script>
//<script src="%PUBLIC_URL%/ext.all.js"></script>
//<script src="%PUBLIC_URL%/ReactCell.js"></script>

function syncEvent(node, eventName, newEventHandler) {
  var eventNameLc = eventName[0].toLowerCase() + eventName.substring(1);
  var eventStore = node.__events || (node.__events = {});
  var oldEventHandler = eventStore[eventNameLc];

  if (oldEventHandler) {
    node.removeEventListener(eventNameLc, oldEventHandler);
  }

  if (newEventHandler) {
    node.addEventListener(eventNameLc, eventStore[eventNameLc] = function handler(e) {
      newEventHandler.call(this, e);
    });
  }
}

export default function (CustomElement) {
  if (typeof CustomElement !== 'function') {
    throw new Error('Given element is not a valid constructor');
  }

  var tagName = new CustomElement().tagName;

  function toPascalCase(s) {
    return s.match(/[a-z]+/gi).map(function (word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    }).join('');
  }

  var displayName = toPascalCase(tagName);

  var ReactComponent =
  /*#__PURE__*/
  function (_React$Component) {
    _inheritsLoose(ReactComponent, _React$Component);

    function ReactComponent(props) {
      var _this;

      _this = _React$Component.call(this, props) || this;
      _this.componentRef = React.createRef();
      return _this;
    }

    var _proto = ReactComponent.prototype;

    _proto.componentDidMount = function componentDidMount() {
      var _this2 = this;

      this.componentRef.current.text = this.props.text;
      var node = ReactDOM.findDOMNode(this);
      Object.keys(this.props).forEach(function (name) {
        //console.log(name)
        if (name === 'children' || name === 'style') {
          return;
        }

        if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
          syncEvent(node, name.substring(2), _this2.props[name]);
        } else {
          node[name] = _this2.props[name];
        }
      }); // if (this.props.onTap) {
      //     this.componentRef.current.addEventListener('tap', (e) => this.props.onTap(e));
      // }
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      console.log('componentDidUpdate: ' + tagName); //console.log(prevProps)
      //var r = React.isValidElement(this.element)

      var me = this;

      for (var prop in prevProps) {
        if (!/^on/.test(prop)) {
          //console.log(prop)
          //console.log(prevProps[prop])
          //console.log(me.buttonRef.current[prop])
          if (me.props[prop] !== prevProps[prop] && prop != 'children') {
            console.log(prop);
            me.componentRef.current[prop] = me.props[prop];
          }
        }
      }
    };

    _proto.render = function render() {
      //console.log('*****render: ' + tagName)
      //console.log(this.props)
      //this.element = React.createElement(tagName, { style: this.props.style }, this.props.children);
      this.element = React.createElement(tagName, _extends({}, this.props, {
        style: this.props.style,
        ref: this.componentRef
      }), this.props.children);
      return this.element;
    };

    _createClass(ReactComponent, null, [{
      key: "displayName",
      get: function get() {
        return displayName;
      }
    }]);

    return ReactComponent;
  }(React.Component);

  var proto = CustomElement.prototype;
  Object.getOwnPropertyNames(proto).forEach(function (prop) {
    Object.defineProperty(ReactComponent.prototype, prop, Object.getOwnPropertyDescriptor(proto, prop));
  });
  return ReactComponent;
}