import _extends from "@babel/runtime/helpers/extends";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
//import ReactDOM from 'react-dom';
import { l } from './index'; //import React from 'react';

import { Component, Children, cloneElement } from 'react';
import EXTRenderer from './ExtRenderer.js';
import union from 'lodash.union';
import isEqual from 'lodash.isequal';
import capitalize from 'lodash.capitalize';
import cloneDeepWith from 'lodash.clonedeepwith';
import { renderWhenReady } from '..';
import { globalRoot } from './index';
var count = 0;
export var ExtJSComponent =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(ExtJSComponent, _Component);

  function ExtJSComponent(element) {
    var _this;

    _this = _Component.call(this, element) || this;
    _this.cmp = null;
    _this.el = null;
    _this.reactProps = {};
    _this.reactChildren = {};
    _this.reactElement = {};

    _this._getReactStuff(element);

    _this.rawConfigs = _this._getConfig();
    _this.rawConfigs.$createdByExtReact = true;

    if (_this.isRootContainer) {
      _this.rawConfigs.ExtReactRoot = true;
      _this.cmp = new _this.extJSClass(_this.rawConfigs);
      l("ExtJSComponent: constructor ROOT, element: " + _this.target + ", xtype: " + _this.xtype + " (this.rawConfig, this.cmp, this)", _this.rawConfig, _this.cmp, _assertThisInitialized(_assertThisInitialized(_this)));
    } else {
      l("ExtJSComponent: constructor NOTROOT, element: " + _this.target + ", xtype: " + _this.xtype + " (this.rawConfig, this)", _this.rawConfig, _assertThisInitialized(_assertThisInitialized(_this)));
    }

    return _this;
  }

  var _proto = ExtJSComponent.prototype;

  _proto.componentWillMount = function componentWillMount() {
    l("ExtJSComponent: componentWillMount");
  };

  _proto.componentDidMount = function componentDidMount() {
    l("ExtJSComponent: componentDidMount, element: " + this.target + ", call EXTRenderer.createContainer");
    this._mountNode = EXTRenderer.createContainer(this.cmp); //l(`ExtJSComponent: componentDidMount, element: ${this.target}, call EXTRenderer.updateContainer`)

    l("ExtJSComponent: componentDidMount (reactChildren, _mountNode) call EXTRenderer.updateContainer", this.reactChildren, this._mountNode);
    EXTRenderer.updateContainer(this.reactChildren, this._mountNode, this);
  };

  _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
    if (this.isRootContainer) {
      l("ExtJSComponent: componentDidUpdate, call EXTRenderer.updateContainer, element: " + this.target);
      EXTRenderer.updateContainer(this.reactChildren, this._mountNode, this);
    }
  };

  _proto.componentWillUnmount = function componentWillUnmount() {
    l("ExtJSComponent: componentWillUnmount, call EXTRenderer.updateContainer, element: " + this.target);
    EXTRenderer.updateContainer(null, this._mountNode, this);
  };

  _proto.render = function render() {
    l('render');
    return null;
  };

  _proto._getReactStuff = function _getReactStuff(element) {
    /*******reactElement */
    if (element.children == undefined || element.children == false) {
      for (var prop in element) {
        if (prop != 'children') {
          this.reactProps[prop] = element[prop];
        }
      }
    } else {
      this.reactChildren = element.children;

      if (element.props == undefined) {
        for (var prop in element) {
          if (prop != 'children') {
            this.reactProps[prop] = element[prop];
          }
        }
      } else {
        this.reactProps = element.props;
      }
    }

    this.reactElement.props = this.reactProps;
    this.reactElement.children = this.reactChildren;
  };

  _proto._getConfig = function _getConfig() {
    var config = {};
    config.xtype = this.xtype;
    var props = this.reactProps;

    for (var key in props) {
      //if (key == 'defaults') { debugger }
      if (key.substr(0, 2) === 'on') {
        if (props[key] != undefined) {
          var event = key.substr(2).toLowerCase();

          if (config.listeners == undefined) {
            config.listeners = {};
          }

          config.listeners[event] = props[key]; //MetaData
        } else {
          console.warn('function for ' + key + ' event is not defined');
        }
      } else {
        config[key] = props[key];
      }
    }

    if (config['className'] != undefined) {
      config['cls'] = config['cls'] + ' ' + config['className'];
    }

    this._ensureResponsivePlugin(config);

    if (this.isRootContainer) {
      if (config['layout'] == undefined) {
        config['layout'] = 'fit';

        if (config['cls'] != undefined) {
          config['cls'] = config['cls'] + ' ' + 'ExtReactRoot';
        } else {
          config['cls'] = 'ExtReactRoot';
        }
      }

      if (Ext.isClassic) {
        config['height'] = '100%';
        config['width'] = '100%';
        var root = document.getElementsByClassName('reactroot')[0];
        config.renderTo = root;
      } else {
        var root = document.getElementsByClassName('x-viewport-body-el')[0];

        if (root == undefined) {
          root = globalRoot[count];
          count++;
          config['height'] = '100%';
          config['width'] = '100%';
        } else {
          config['fullscreen'] = true;
        }

        config.renderTo = root;
      }

      this.extJSConfig = config;
    }

    return config;
  };

  _proto._ensureResponsivePlugin = function _ensureResponsivePlugin(config) {
    if (config.responsiveConfig) {
      var plugins = config.plugins;

      if (plugins == null) {
        config.plugins = 'responsive';
      } else if (Array.isArray(plugins) && plugins.indexOf('responsive') === -1) {
        plugins.push('responsive');
      } else if (typeof plugins === 'string') {
        if (plugins !== 'responsive') {
          config.plugins = [plugins, 'responsive'];
        }
      } else if (!plugins.resposive) {
        plugins.responsive = true;
      }
    }
  };
  /**
   * Returns the Ext JS component instance
   */


  _proto.getHostNode = function getHostNode() {
    return this.el;
  };
  /**
   * Returns the Ext JS component instance
   */


  _proto.getPublicInstance = function getPublicInstance() {
    return this.cmp;
  };

  _proto._applyDefaults = function _applyDefaults(_ref) {
    var defaults = _ref.defaults,
        children = _ref.children;

    if (defaults) {
      return Children.map(children, function (child) {
        if (child.type.prototype instanceof ExtJSComponent) {
          return cloneElement(child, _extends({}, defaults, child.props));
        } else {
          return child;
        }
      });
    } else {
      return children;
    }
  };
  /**
   * Determines whether a child element corresponds to a config or a container item based on the presence of a rel config or
   * matching other known relationships
   * @param {Ext.Base} item
   */


  _proto._propForChildElement = function _propForChildElement(item) {
    if (item.config && item.config.rel) {
      if (typeof item.config.rel === 'string') {
        return {
          name: item.config.rel
        };
      } else {
        return item.config.rel;
      }
    }

    var extJSClass = this.extJSClass;

    if (isAssignableFrom(extJSClass, CLASS_CACHE.Button) && CLASS_CACHE.Menu && item instanceof CLASS_CACHE.Menu) {
      return {
        name: 'menu',
        array: false
      };
    } else if (isAssignableFrom(extJSClass, Ext.Component) && CLASS_CACHE.ToolTip && item instanceof CLASS_CACHE.ToolTip) {
      return {
        name: 'tooltip',
        array: false
      };
    } else if (CLASS_CACHE.Column && item instanceof CLASS_CACHE.Column) {
      return {
        name: 'columns',
        array: true
      };
    } else if (isAssignableFrom(extJSClass, CLASS_CACHE.Column) && CLASS_CACHE.CellBase && item instanceof CLASS_CACHE.CellBase) {
      return {
        name: 'cell',
        array: false,
        value: this._cloneConfig(item)
      };
    } else if (isAssignableFrom(extJSClass, CLASS_CACHE.WidgetCell)) {
      return {
        name: 'widget',
        array: false,
        value: this._cloneConfig(item)
      };
    } else if (isAssignableFrom(extJSClass, CLASS_CACHE.Dialog) && CLASS_CACHE.Button && item instanceof CLASS_CACHE.Button) {
      return {
        name: 'buttons',
        array: true
      };
    } else if (isAssignableFrom(extJSClass, CLASS_CACHE.Column) && CLASS_CACHE.Field && item instanceof CLASS_CACHE.Field) {
      return {
        name: 'editor',
        array: false,
        value: this._cloneConfig(item)
      };
    }
  };

  _proto._cloneConfig = function _cloneConfig(item) {
    return _extends({}, item.initialConfig, {
      xclass: item.$className
    });
  };
  /**
   * If the propName corresponds to an event listener (starts with "on" followed by a capital letter), returns the name of the event.
   * @param {String} propName 
   * @param {String}
   */


  _proto._eventNameForProp = function _eventNameForProp(propName) {
    if (propName.match(/^on[A-Z]/)) {
      return propName.slice(2).toLowerCase();
    } else {
      return null;
    }
  };
  /**
   * Creates an Ext config object for this specified props
   * @param {Object} props
   * @param {Boolean} [includeEvents] true to convert on* props to listeners, false to exclude them
   * @private
   */


  _proto._createConfig = function _createConfig(props, includeEvents) {
    props = this._cloneProps(props);
    var config = {};
    config.xtype = this.xtype;
    if (includeEvents) config.listeners = {};

    for (var key in props) {
      if (props.hasOwnProperty(key)) {
        var value = props[key];

        var eventName = this._eventNameForProp(key);

        if (eventName) {
          if (value && includeEvents) config.listeners[eventName] = value;
        } else if (key === 'config') {
          Object.assign(config, value);
        } else if (key !== 'children' && key !== 'defaults') {
          config[key.replace(/className/, 'cls')] = value;
        }
      }
    }

    var extJSClass = this.extJSClass; //need this???
    // if (isAssignableFrom(extJSClass, CLASS_CACHE.Column) && typeof config.renderer === 'function' && CLASS_CACHE.RendererCell) {
    //     config.cell = config.cell || {};
    //     config.cell.xtype = 'renderercell';
    // }

    return config;
  };
  /**
   * Cloning props rather than passing them directly on as configs fixes issues where Ext JS mutates configs during
   * component initialization.  One example of this is grid columns get $initParent added when the grid initializes.
   * @param {Object} props
   * @private
   */


  _proto._cloneProps = function _cloneProps(props) {
    return cloneDeepWith(props, function (value) {
      if (value instanceof Ext.Base || typeof value === 'function') {
        return value;
      }
    });
  };

  _proto._rushProps = function _rushProps(oldProps, newProps) {
    var rushConfigs = this.extJSClass.__ExtReactUpdateConfigsBeforeChildren;
    if (!rushConfigs) return;
    var oldConfigs = {},
        newConfigs = {};

    for (var name in rushConfigs) {
      oldConfigs[name] = oldProps[name];
      newConfigs[name] = newProps[name];
    }

    this._applyProps(oldConfigs, newConfigs);
  }; //   _isEquivalent(a, b) {
  //     // Create arrays of property names
  //     var aProps = Object.getOwnPropertyNames(a);
  //     var bProps = Object.getOwnPropertyNames(b);
  //     // If number of properties is different,
  //     // objects are not equivalent
  //     if (aProps.length != bProps.length) {
  //         return false;
  //     }
  //     for (var i = 0; i < aProps.length; i++) {
  //         var propName = aProps[i];
  //         // If values of same property are not equal,
  //         // objects are not equivalent
  //         if (a[propName] !== b[propName]) {
  //             return false;
  //         }
  //     }
  //     // If we made it this far, objects
  //     // are considered equivalent
  //     return true;
  // }
  // _shallowEqual(objA, objB) {
  //   if (objA === objB) {
  //     return true;
  //   }
  //   if (typeof objA !== 'object' || objA === null ||
  //       typeof objB !== 'object' || objB === null) {
  //     return false;
  //   }
  //   var keysA = Object.keys(objA);
  //   var keysB = Object.keys(objB);
  //   if (keysA.length !== keysB.length) {
  //     return false;
  //   }
  //   // Test for A's keys different from B.
  //   var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
  //   for (var i = 0; i < keysA.length; i++) {
  //     if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }

  /**
   * Calls config setters for all react props that have changed
   * @private
   */


  _proto._applyProps = function _applyProps(oldProps, props) {
    // if (this._shallowEqual(oldProps, props)) {
    //   console.log('*****************************************************************same'); 
    //   return
    // }
    // else {
    //   console.log('*****************************************************************not same'); 
    // }
    // var oldP = JSON.stringify(oldProps)
    // var newP = JSON.stringify(props)
    // if (oldP == newP) {
    //   console.log('*****************************************************************same'); 
    //   return
    // }
    // else {
    //   console.log('*****************************************************************not same'); 
    // }
    // if (JSON.stringify(oldProps) == JSON.stringify(props)) {
    //   alert('same'); // gives true
    //   return
    // }
    var keys = union(Object.keys(oldProps), Object.keys(props));

    for (var _iterator = keys, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref2;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref2 = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref2 = _i.value;
      }

      var key = _ref2;
      var oldValue = oldProps[key],
          newValue = props[key];
      if (key === 'children') continue;

      if (!isEqual(oldValue, newValue)) {
        var eventName = this._eventNameForProp(key);

        if (eventName) {
          //                console.log('*****************************************************************eventName')
          //                console.log(eventName)
          this._replaceEvent(eventName, oldValue, newValue);
        } else {
          var setter = this._setterFor(key);

          if (setter) {
            var value = this._cloneProps(newValue);

            if (this.ExtReactSettings.debug) console.log(setter, newValue, value); // if (key == 'theme') {
            //   Ext.thechart = this.cmp
            //   console.log('*****************************************************************setter')
            //   console.log(this.cmp.xtype + ' - ' + setter + ' - ' + value) 
            //   //console.log(this.cmp)
            //   //console.log('*****************************************************************value')
            //   //console.log(key)
            //   //console.log(value)
            //   // debugger
            //   //this.cmp.setTheme('Purple')
            //   //this.cmp.redraw()
            //  }

            this.cmp[setter](value);
          }
        }
      }
    }
  };
  /**
   * Detaches the old event listener and adds the new one.
   * @param {String} eventName 
   * @param {Function} oldHandler 
   * @param {Function} newHandler 
   */


  _proto._replaceEvent = function _replaceEvent(eventName, oldHandler, newHandler) {
    if (oldHandler) {
      if (this.ExtReactSettings.debug) console.log("detaching old listener for " + eventName);
      this.cmp.un(eventName, oldHandler);
    }

    if (this.ExtReactSettings.debug) console.log("attaching new listener for " + eventName);
    this.cmp.on(eventName, newHandler);
  };
  /**
   * Returns the name of the setter method for a given prop.
   * @param {String} prop
   */


  _proto._setterFor = function _setterFor(prop) {
    if (prop === 'className') {
      prop = 'cls';
    }

    var name = "set" + this._capitalize(prop);

    return this.cmp[name] && name;
  };
  /**
   * Returns the name of a getter for a given prop.
   * @param {String} prop
   */


  _proto._getterFor = function _getterFor(prop) {
    var name = "get" + this._capitalize(prop);

    return this.cmp[name] && name;
  };
  /**
   * Capitalizes the first letter in the string
   * @param {String} str
   * @return {String}
   * @private
   */


  _proto._capitalize = function _capitalize(str) {
    return capitalize(str[0]) + str.slice(1);
  };

  _proto._precacheNode = function _precacheNode() {
    this._flags |= Flags.hasCachedChildNodes;

    if (this.el) {
      // will get here when rendering root component
      precacheNode(this, this.el);
    } else if (this.cmp.el) {
      this._doPrecacheNode();
    } else if (Ext.isClassic) {
      // we get here when rendering child components due to lazy rendering
      this.cmp.on('afterrender', this._doPrecacheNode, this, {
        single: true
      });
    }
  };

  _proto._doPrecacheNode = function _doPrecacheNode() {
    this.el = this.cmp.el.dom;
    this.el._extCmp = this.cmp;
    precacheNode(this, this.el);
  };
  /**
   * Returns the child item at the given index, only counting those items which were created by ExtReact
   * @param {Number} n
   */


  _proto._toReactChildIndex = function _toReactChildIndex(n) {
    var items = this.cmp.items;
    if (!items) return n;
    if (items.items) items = items.items;
    var found = 0,
        i,
        item;

    for (i = 0; i < items.length; i++) {
      item = items[i];

      if (item.$createdByExtReact && found++ === n) {
        return i;
      }
    }

    return i;
  };
  /**
   * Translates and index in props.children to an index within a config value that is an array.  Use
   * this to determine the position of an item in props.children within the array config to which it is mapped.
   * @param {*} prop
   * @param {*} indexInChildren
   */


  _proto._toArrayConfigIndex = function _toArrayConfigIndex(prop, indexInChildren) {
    var _this2 = this;

    var i = 0,
        found = 0;
    Children.forEach(this.props.children, function (child) {
      var propForChild = _this2._propForChildElement(child);

      if (propForChild && propForChild.name === prop.name) {
        if (i === indexInChildren) return found;
        found++;
      }
    });
    return -1;
  };
  /**
   * Updates a config based on a child element
   * @param {Object} prop The prop descriptor (name and array)
   * @param {Ext.Base} value The value to set
   * @param {Number} [index] The index of the child element in props.children
   * @param {Boolean} [isArrayDelete=false] True if removing the item from an array
   */


  _proto._mergeConfig = function _mergeConfig(prop, value, index, isArrayDelete) {
    var setter = this._setterFor(prop.name);

    if (!setter) return;
    if (value) value.$ExtReactConfig = true;

    if (prop.array) {
      var getter = this._getterFor(prop.name);

      if (!getter) return;
      var currentValue = this.cmp[getter]() || [];

      if (isArrayDelete) {
        // delete
        value = currentValue.filter(function (item) {
          return item !== value;
        });
      } else if (index !== undefined) {
        // move
        value = currentValue.filter(function (item) {
          return item !== value;
        });
        value = value.splice(this._toArrayConfigIndex(index, prop), 0, item);
      } else {
        // append
        value = currentValue.concat(value);
      }
    }

    if (this.ExtReactSettings.debug) console.log(setter, value);
    this.cmp[setter](value);
  };

  _proto._ignoreChildrenOrder = function _ignoreChildrenOrder() {
    // maintaining order in certain components, like Transition's container, can cause problems with animations, _ExtReactIgnoreOrder gives us a way to opt out in such scenarios
    if (this.cmp._ExtReactIgnoreOrder) return true; // moving the main child of a container with layout fit causes it to disappear.  Instead we do nothing, which
    // should be ok because fit containers are not ordered

    if (CLASS_CACHE.FitLayout && this.cmp.layout instanceof CLASS_CACHE.FitLayout) return true; // When tab to the left of the active tab is removed, the left-most tab would always be selected as the tabs to the right are reinserted

    if (CLASS_CACHE.TabPanel && this.cmp instanceof CLASS_CACHE.TabPanel) return true;
  };

  return ExtJSComponent;
}(Component);
/**
 * Wraps a dom element in an Ext Component so it can be added as a child item to an Ext Container.  We attach
 * a reference to the generated Component to the dom element so it can be destroyed later if the dom element
 * is removed when rerendering
 * @param {Object} node A React node object with node, children, and text
 * @returns {Ext.Component}
 */

function wrapDOMElement(node) {
  var contentEl = node.node;
  var cmp = new Ext.Component({
    // We give the wrapper component a class so that developers can reset css 
    // properties (ex. box-sizing: context-box) for third party components.
    cls: 'x-react-element'
  });

  if (cmp.element) {
    // modern
    DOMLazyTree.insertTreeBefore(cmp.element.dom, node);
  } else {
    // classic
    var target = document.createElement('div');
    DOMLazyTree.insertTreeBefore(target, node);
    cmp.contentEl = contentEl instanceof HTMLElement ? contentEl : target
    /* text fragment or comment */
    ;
  }

  cmp.$createdByExtReact = true;
  contentEl._extCmp = cmp; // this is needed for devtools when using dangerouslyReplaceNodeWithMarkup
  // this not needed in fiber

  cmp.node = contentEl;
  return cmp;
}
//# sourceMappingURL=ExtJSComponent.js.map