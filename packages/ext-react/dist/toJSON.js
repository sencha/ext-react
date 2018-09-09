import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/objectWithoutPropertiesLoose";
import { Children } from 'react';
/**
 * Converts both ExtReact and DOM components to json for Jest snapshots
 * @param {React.Component} component
 * @returns {Object}
 */

export default function toJSON(component) {
  var element = component._currentElement;
  var renderedChildren = component._renderedChildren;
  if (typeof element === 'string') return element;

  var _element$props = element.props,
      children = _element$props.children,
      props = _objectWithoutPropertiesLoose(_element$props, ["children"]);

  var jsonChildren = null;

  if (typeof children === 'string') {
    // inner text
    jsonChildren = [children];
  } else if (renderedChildren) {
    // child components
    jsonChildren = Object.keys(renderedChildren).map(function (key) {
      var child = renderedChildren[key];
      child = getHostComponentFromComposite(child) || child;
      return child.toJSON ? child.toJSON() : toJSON(child);
    });
  }

  var object = {
    type: typeof element.type === 'string' ? element.type : element.type.name,
    props: includeSerializable(props),
    children: jsonChildren
  };
  Object.defineProperty(object, '$$typeof', {
    value: Symbol['for']('react.test.json')
  });
  return object;
}
/**
 * Returns an object containing only the serializable keys from the source object.
 * @param {Object} obj The source object
 * @returns {Object}
 */

function includeSerializable(obj) {
  if (Array.isArray(obj)) {
    var result = [];

    for (var _iterator = obj, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var item = _ref;

      if (typeof item === 'object') {
        var jsonItem = includeSerializable(item);

        if (jsonItem !== undefined) {
          result.push(jsonItem);
        }
      } else {
        result.push(item);
      }
    }

    return result;
  } else if (typeof obj === 'object') {
    if (obj.constructor !== Object) {
      // include only the class name for complex objects
      return {
        $className: obj.$className || obj.constructor.name || 'unknown'
      };
    }

    var _result = {};

    for (var key in obj) {
      _result[key] = includeSerializable(obj[key]);
    }

    return _result;
  } else {
    return obj;
  }
} // borrowed from react-test-renderer

/**
 * Gets the inner ExtReact or DOM component from the specified component
 * @param {React.Component} inst A component instance
 * @returns {React.Component}
 */


function getHostComponentFromComposite(inst) {
  var type;

  while ((type = inst._renderedNodeType) === ReactNodeTypes.COMPOSITE) {
    inst = inst._renderedComponent;
  }

  if (type === ReactNodeTypes.HOST) {
    return inst._renderedComponent;
  } else if (type === ReactNodeTypes.EMPTY) {
    return null;
  }
}

export var ReactNodeTypes = {
  HOST: 0,
  COMPOSITE: 1,
  EMPTY: 2
};
//# sourceMappingURL=toJSON.js.map