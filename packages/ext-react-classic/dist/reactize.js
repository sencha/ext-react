import _extends from "@babel/runtime/helpers/extends";
import _createClass from "@babel/runtime/helpers/createClass";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import React from 'react';
import ReactDOM from 'react-dom'; //https://coryrylan.com/blog/using-web-components-in-react
//import ReactCell from './ReactCell.js';
//<script src="%PUBLIC_URL%/css.all.js"></script>
//<script src="%PUBLIC_URL%/ext.all.js"></script>
//<script src="%PUBLIC_URL%/ReactCell.js"></script>

function syncEvent(node, eventName, newEventHandler, me) {
  var eventname = eventName[0].toLowerCase() + eventName.substring(1);
  var eventStore = node.__events || (node.__events = {});
  var oldEventHandler = eventStore[eventname];

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
        me.cmp = event.detail.cmp;
        me.ext = event.detail.cmp;
      }

      newEventHandler.call(this, e.detail);
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

    _proto.render = function render() {
      //console.log('*****render: ' + tagName)
      //console.log(this.props)
      var newProps = {};
      this.objectProps = {};
      var className = '';

      for (var prop in this.props) {
        var t = typeof this.props[prop];

        if (prop == 'className') {
          className = ' ' + this.props[prop];
        } else if (t == 'function') {
          if (prop == 'renderer' || prop == 'summaryRenderer') {
            newProps[prop] = 'function';
            this.objectProps[prop] = this.props[prop];
          } else {
            newProps[prop] = this.props[prop];
            this.objectProps[prop] = this.props[prop];
          }
        } else if (t != 'object') {
          newProps[prop] = this.props[prop];
        } else {
          if (prop == 'style' || prop == 'children') {} // else if (prop == 'columns') {
          //   this.objectProps[prop] = this.props[prop];
          // }
          else {
              var sPropVal = '';

              try {
                var JSONfn = {};
                var hasFunction = false; // if (!JSONfn) {
                //     JSONfn = {};
                // }

                (function () {
                  JSONfn.stringify = function (obj) {
                    return JSON.stringify(obj, function (key, value) {
                      if (typeof value === 'function') {
                        hasFunction = true; //console.log(key)

                        return value.toString();
                      } else {
                        return value;
                      }
                    });
                  }; // JSONfn.parse = function(str) {
                  //   return JSON.parse(str,function(key, value){
                  //       if(typeof value != 'string') return value;
                  //       return ( value.substring(0,8) == 'function') ? eval('('+value+')') : value;
                  //   });
                  //}

                })();

                hasFunction = false;
                var sPropValfn = JSONfn.stringify(this.props[prop]);

                if (hasFunction == true) {
                  console.log(prop + " has function");
                  console.log(this.props[prop]);
                  newProps[prop] = 'function';
                  this.objectProps[prop] = this.props[prop];
                } else {
                  newProps[prop] = sPropValfn;
                } // sPropVal = JSON.stringify(this.props[prop]); //functions are swallowed - mjg
                // if (prop == 'itemConfig') {
                //   this.objectProps[prop] = this.props[prop];
                // }
                // else {
                //   newProps[prop] = sPropVal;
                // }

              } catch (e) {
                this.objectProps[prop] = this.props[prop];
              }
            }
        }
      } //console.log(newProps['cls'])
      //console.log(className)


      if (newProps['cls'] == undefined) {
        if (className != '') {
          newProps['cls'] = className;
        }
      } else {
        newProps['cls'] = newProps['cls'] + className;
      }

      this.element = React.createElement(tagName, _extends({}, newProps, {
        style: this.props.style,
        ref: this.componentRef
      }), this.props.children);
      return this.element;
    };

    _proto.componentDidMount = function componentDidMount() {
      this.componentRef.current.text = this.props.text;
      var node = ReactDOM.findDOMNode(this);
      this.cmp = node.cmp;
      var me = this;
      Object.keys(this.objectProps).forEach(function (name) {
        node[name] = me.props[name];
      });
      Object.keys(this.props).forEach(function (name) {
        if (name === 'children' || name === 'style' || name === 'viewport' || name === 'layout') {
          return;
        }

        if (name.indexOf('on') === 0 && name[2] === name[2].toUpperCase()) {
          syncEvent(node, name.substring(2), me.props[name], me);
        } else {//node[name] = this.props[name];
        }
      });
    };

    _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
      //console.log('componentDidUpdate: ' + tagName)
      var me = this;

      for (var prop in prevProps) {
        if (!/^on/.test(prop)) {
          if (me.props[prop] !== prevProps[prop] && prop != 'children') {
            var node = ReactDOM.findDOMNode(this);
            me.componentRef.current[prop] = me.props[prop];
            node[prop] = me.props[prop];
          }
        }
      }
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