import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import { l } from './index';
import { ExtJSComponent } from './ExtJSComponent';
import { htmlComponent } from './htmlComponent';

// global ext-react settings
export var settings = {};
/**
 * Store ext-react settings from launch
 * @param {Object} ExtReactSettings 
 */
export function configure(ExtReactSettings) {
  settings = ExtReactSettings;
}

function getTheHtmlClass(htmltype) {
  // //clean up xtype stuff (have a method instead of a property) - ExtReactSettings does it correctly
  // var extJSClass = Ext.ClassManager.getByAlias(`widget.${xtype}`);
  // if (!extJSClass) throw new Error(`No Ext JS component with xtype "${xtype}" found.  Perhaps you're missing a package?`);
  //what is target used for?? or, does it have 1 meaning here and another in ExtJSComponent.js?
  return function (_htmlComponent) {
    _inherits(_class, _htmlComponent);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, _htmlComponent.apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'htmltype',

      //     //static get source() {return 'ExtJS'}
      get: function get() {
        return htmltype;
      }
      //     get extJSClass() {return extJSClass}
      //     get ExtReactSettings() { return settings }
      //     get type() {return type}
      //     get target() {return target} //original element passed from jsx
      //  //   constructor(props) { super(props) }

    }]);

    return _class;
  }(htmlComponent);
}

export function htmlify2(target) {
  var htmlifiedClass = getTheHtmlClass(target);
  return htmlifiedClass;
}

function getTheClass(isRootContainer, xtype, target) {
  //clean up xtype stuff (have a method instead of a property) - ExtReactSettings does it correctly
  var extJSClass = Ext.ClassManager.getByAlias('widget.' + xtype);
  if (!extJSClass) throw new Error('No Ext JS component with xtype "' + xtype + '" found.  Perhaps you\'re missing a package?');
  //what is target used for?? or, does it have 1 meaning here and another in ExtJSComponent.js?
  return function (_ExtJSComponent) {
    _inherits(_class2, _ExtJSComponent);

    function _class2() {
      _classCallCheck(this, _class2);

      return _possibleConstructorReturn(this, _ExtJSComponent.apply(this, arguments));
    }

    _createClass(_class2, [{
      key: 'isRootContainer',

      //static get source() {return 'ExtJS'}
      get: function get() {
        return isRootContainer;
      }
    }, {
      key: 'extJSClass',
      get: function get() {
        return extJSClass;
      }
    }, {
      key: 'ExtReactSettings',
      get: function get() {
        return settings;
      }
    }, {
      key: 'xtype',
      get: function get() {
        return xtype;
      }
    }, {
      key: 'target',
      get: function get() {
        return target;
      } //original element passed from jsx
      //   constructor(props) { super(props) }

    }]);

    return _class2;
  }(ExtJSComponent);
}

//merge this into reactify
export function reactify2(target) {
  var xtype = target.toLowerCase().replace(/_/g, '-');
  l('reactify.js: reactify2, target: ' + target + ', xtype: ' + xtype);

  //l(`reactify2 ${xtype}`)
  var reactifiedClass = getTheClass(false, xtype, target);
  return reactifiedClass;
}

//var reactifyObj = {};

export function reactify(target) {
  //console.log('reactify ' + target)
  // console.log(reactifyObj)
  // if( typeof reactifyObj.numRoots == 'undefined' ) {
  //   reactifyObj.numRoots = 0;
  // }
  // if (reactifyObj.numRoots > 1) {
  //   throw `${target} More than 1 root import defined (either ExtReact, RootContainer or RootPanel)`
  // }
  if (typeof target === 'function') {
    //check to make sure this is an Ext JS define
    //this is a custom ExtJS class (like worldmap), it has to have an xtype to work
    if (target.xtype == undefined) {
      if (!(target.$config instanceof Ext.Configurator)) {
        console.warn('ExtReact: Custom Ext JS component defined with no xtype', target.$config);
      }
    }
    // else {
    //   l('target is a function: ' + target.xtype)
    // }
    return target.xtype;
  } else if (target === 'Div') {
    return 'Container';
  } else if (target === 'ExtReact') {
    //   reactifyObj.numRoots++
    l('target is: ExtReact, return reactifiedClass');
    var xtype = 'container';
    var reactifiedClass = getTheClass(true, xtype, target);
    return reactifiedClass;
  } else if (target.substr(0, 4) === 'Root') {
    //    reactifyObj.numRoots++
    l('target is: ' + target + ', return reactifiedClass');
    var className = target.substr(4);
    var _xtype = className.toLowerCase().replace(/_/g, '-');
    var reactifiedClass = getTheClass(true, _xtype, target);
    return reactifiedClass;
  } else {
    // msg 001 l('target is: ' + target)
    //console.log('target is: ' + target)
    return target;
  }
}
//# sourceMappingURL=reactify.js.map