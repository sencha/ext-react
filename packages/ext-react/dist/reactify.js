import _createClass from "@babel/runtime/helpers/createClass";
import _inheritsLoose from "@babel/runtime/helpers/inheritsLoose";
import { l } from './index';
import { ExtJSComponent } from './ExtJSComponent';
import { htmlComponent } from './htmlComponent';
export var settings = {};
export function configure(ExtReactSettings) {
  settings = ExtReactSettings;
}

function getTheHtmlClass(htmltype) {
  // //clean up xtype stuff (have a method instead of a property) - ExtReactSettings does it correctly
  // var extJSClass = Ext.ClassManager.getByAlias(`widget.${xtype}`);
  // if (!extJSClass) throw new Error(`No Ext JS component with xtype "${xtype}" found.  Perhaps you're missing a package?`);
  //what is target used for?? or, does it have 1 meaning here and another in ExtJSComponent.js?
  return (
    /*#__PURE__*/
    function (_htmlComponent) {
      _inheritsLoose(_class, _htmlComponent);

      function _class() {
        return _htmlComponent.apply(this, arguments) || this;
      }

      _createClass(_class, [{
        key: "htmltype",
        //     //static get source() {return 'ExtJS'}
        get: function get() {
          return htmltype;
        } //     get extJSClass() {return extJSClass}
        //     get ExtReactSettings() { return settings }
        //     get type() {return type}
        //     get target() {return target} //original element passed from jsx
        //  //   constructor(props) { super(props) }

      }]);

      return _class;
    }(htmlComponent)
  );
}

export function htmlify2(target) {
  var htmlifiedClass = getTheHtmlClass(target);
  return htmlifiedClass;
}

function getTheClass(isRootContainer, xtype, target) {
  //clean up xtype stuff (have a method instead of a property) - ExtReactSettings does it correctly
  var extJSClass = Ext.ClassManager.getByAlias("widget." + xtype);
  if (!extJSClass) throw new Error("No Ext JS component with xtype \"" + xtype + "\" found.  Perhaps you're missing a package?"); //what is target used for?? or, does it have 1 meaning here and another in ExtJSComponent.js?

  return (
    /*#__PURE__*/
    function (_ExtJSComponent) {
      _inheritsLoose(_class2, _ExtJSComponent);

      function _class2() {
        return _ExtJSComponent.apply(this, arguments) || this;
      }

      _createClass(_class2, [{
        key: "isRootContainer",
        //static get source() {return 'ExtJS'}
        get: function get() {
          return isRootContainer;
        }
      }, {
        key: "extJSClass",
        get: function get() {
          return extJSClass;
        }
      }, {
        key: "ExtReactSettings",
        get: function get() {
          return settings;
        }
      }, {
        key: "xtype",
        get: function get() {
          return xtype;
        }
      }, {
        key: "target",
        get: function get() {
          return target;
        } //original element passed from jsx
        //constructor(props) { super(props) }

      }]);

      return _class2;
    }(ExtJSComponent)
  );
} //merge this into reactify


export function reactify2(target) {
  var xtype = target.toLowerCase().replace(/_/g, '-');
  l("reactify.js: reactify2, target: " + target + ", xtype: " + xtype); //l(`reactify2 ${xtype}`)

  var reactifiedClass = getTheClass(false, xtype, target);
  return reactifiedClass;
}
export function reactify(target) {
  //console.log('reactify ' + target)
  if (typeof target === 'function') {
    //check to make sure this is an Ext JS define
    //this is a custom ExtJS class (like worldmap), it has to have an xtype to work
    if (target.xtype == undefined) {
      if (!(target.$config instanceof Ext.Configurator)) {
        console.warn("ExtReact: Custom Ext JS component defined with no xtype", target.$config);
      }
    }

    return target.xtype;
  } else if (target === 'ExtReact') {
    l('target is: ExtReact, return reactifiedClass');
    var xtype = 'container';
    var reactifiedClass = getTheClass(true, xtype, target);
    return reactifiedClass;
  } else {
    return target;
  }
}
//# sourceMappingURL=reactify.js.map