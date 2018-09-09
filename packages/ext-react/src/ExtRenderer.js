import ReactDOM from 'react-dom';
import { l } from './index'
import { reactify2, htmlify2 } from './reactify';
import React from 'react';
import Reconciler from 'react-reconciler';
import invariant from 'fbjs/lib/invariant';
import emptyObject from 'fbjs/lib/emptyObject';
const UPDATE_SIGNAL = {};
const CLASS_CACHE = {
  Grid: Ext.ClassManager.getByAlias('widget.grid'),
  Column: Ext.ClassManager.getByAlias('widget.gridcolumn'),
  Button: Ext.ClassManager.getByAlias('widget.button'),
  Menu: Ext.ClassManager.getByAlias('widget.menu'),
  ToolTip: Ext.ClassManager.getByAlias('widget.tooltip'),
  CellBase: Ext.ClassManager.get('Ext.grid.cell.Base'),
  WidgetCell: Ext.ClassManager.getByAlias('widget.widgetcell'),
  Dialog: Ext.ClassManager.getByAlias('widget.dialog'),
  Field: Ext.ClassManager.getByAlias('widget.field'),
  FitLayout: Ext.ClassManager.getByAlias('layout.fit'),
  TabPanel: Ext.ClassManager.getByAlias('widget.tabpanel'),
  RendererCell: Ext.ClassManager.getByAlias('widget.renderercell'),
  Field: Ext.ClassManager.getByAlias('widget.field')
}

const ExtRenderer = Reconciler({

  // createContainer(cmp) {
  //   console.log('ccccccc')
  //   console.log(cmp)
  // },


  createInstance(type, props, internalInstanceHandle) {
    let instance = null;
    const xtype = type.toLowerCase().replace(/_/g, '-')
    var extJSClass = Ext.ClassManager.getByAlias(`widget.${xtype}`)
    if (extJSClass == undefined) {
      l(`ExtRenderer: createInstance, type: ${type}, extJSClass UNDEFINED (type, props, internalInstanceHandle)`,type, props, internalInstanceHandle)
      //SK : HTML Rendering - STEP 1 : Create HTML Instance
      var htmlifiedClass = htmlify2(type)
      instance =  new htmlifiedClass(props);
      return instance
    }
    else {
      l(`ExtRenderer: createInstance, type: ${type}, (props, internalInstanceHandle)`, props, internalInstanceHandle)
      var reactifiedClass = reactify2(type) // could send xtype
      instance =  new reactifiedClass(props);
      return instance;
    }
  },

  appendInitialChild(parentInstance, childInstance) {
    if (childInstance == null || (typeof childInstance === "string" && childInstance.trim().length === 0)) {return}
    if (parentInstance != null && childInstance != null) {
      //SK : Do not uncomment below console statement. It will cause error in case of div
      //l(`ExtRenderer: appendInitialChild, parentxtype: ${parentInstance.rawConfigs.xtype}, childxtype: ${childInstance.cmp.xtype}, (parentInstance, childInstance)`,parentInstance, childInstance)
      l(`ExtRenderer: appendInitialChild`)
      var parentXtype = parentInstance.xtype
      var childXtype = childInstance.xtype
      if (childXtype == 'column'      ||
          childXtype == 'treecolumn'  ||
          childXtype == 'textcolumn'  ||
          childXtype == 'checkcolumn' ||
          childXtype == 'datecolumn'  ||
          childXtype == 'numbercolumn' )
      {
        if(parentInstance.rawcolumns == undefined) { parentInstance.rawcolumns = [] }
        parentInstance.rawcolumns.push(childInstance.cmp)
      }
      else if (parentXtype == 'button' && childXtype == 'menu') {
        if(parentInstance.rawmenu == undefined) { parentInstance.rawmenu = {} }
        parentInstance.rawmenu =childInstance.cmp
      }
      else if (parentXtype == 'menu' && childXtype == 'menuitem') {
        if(parentInstance.rawmenuitems == undefined) { parentInstance.rawmenuitems = [] }
        parentInstance.rawmenuitems.push(childInstance.cmp)
      }
      else if (parentXtype == 'column' && childXtype == 'renderercell') {
        if(parentInstance.rawcell == undefined) 
        parentInstance.rawcell = childInstance.cmp.initialConfig
      }
      else if (parentXtype == 'column' && childXtype == 'widgetcell') {
        if(parentInstance.rawcell == undefined) 
        parentInstance.rawcell = childInstance.cmp.initialConfig
      }
      else if (parentXtype == 'column' && childInstance.cmp instanceof CLASS_CACHE.Field ) {
        if(parentInstance.raweditor == undefined) 
        parentInstance.raweditor = childInstance.cmp
      } 
      else if (parentXtype == 'dialog' && childXtype == 'button') {
        if(parentInstance.rawbuttons == undefined) { parentInstance.rawbuttons = [] }
        parentInstance.rawbuttons.push(childInstance.cmp)
      }
      else if (parentXtype == 'widgetcell') {
        if(parentInstance.rawwidget == undefined) 
        parentInstance.rawwidget = childInstance.cmp.initialConfig
      }
      else if (childXtype == 'tooltip') {
        if(parentInstance.rawtooltip == undefined) 
        parentInstance.rawtooltip = childInstance.cmp
      }
      else if (childInstance.cmp.config && childInstance.cmp.config.rel) {
        let name = childInstance.cmp.config['rel']
        if(typeof name == 'string') {
          parentInstance.rawConfigs[name] = childInstance.cmp
        }
      }
      else {
        if(parentInstance.rawitems == undefined) { parentInstance.rawitems = [] }
        if(childXtype == 'cartesian') {
          parentInstance.rawitems.push(childInstance.cmp.initialConfig)
        } else {
          parentInstance.rawitems.push(childInstance.cmp)
        }
      }
    }
	},

  finalizeInitialChildren(ExtJSComponent, type, props) {
    l(`ExtRenderer: finalizeInitialChildren`)
    //console.log(ExtJSComponent.extJSClass)
    //console.log('setting collection configs and creating EXT component here')
    const xtype = type.toLowerCase().replace(/_/g, '-')
    if (ExtJSComponent.extJSClass != null) {
      l(`ExtRenderer: finalizeInitialChildren, type: ${type}, xtype: ${xtype}, (ExtJSComponent, props)`, ExtJSComponent,props)
      if(ExtJSComponent.rawcolumns != undefined) {
        l(`new set columns config (parent xtype,child columns)`,ExtJSComponent.rawConfigs.xtype,ExtJSComponent.rawcolumns)
        ExtJSComponent.rawConfigs.columns = ExtJSComponent.rawcolumns
      }
      if(ExtJSComponent.rawitems != undefined) {
        l(`new set items config (parent xtype,child items)`,ExtJSComponent.rawConfigs.xtype,ExtJSComponent.rawitems)
        ExtJSComponent.rawConfigs.items = ExtJSComponent.rawitems
      }
      if(ExtJSComponent.rawmenu != undefined) {
        l(`new set menu config (parent xtype,child items)`,ExtJSComponent.rawConfigs.xtype,ExtJSComponent.rawmenu)
        ExtJSComponent.rawConfigs.menu = ExtJSComponent.rawmenu
      }
      if(ExtJSComponent.rawmenuitems != undefined) {
        l(`new set menu items config (parent xtype,child items)`,ExtJSComponent.rawConfigs.xtype,ExtJSComponent.rawmenuitems)
        ExtJSComponent.rawConfigs.items = ExtJSComponent.rawmenuitems
      }
      if(ExtJSComponent.rawbuttons != undefined) {
        l(`new set buttons items config (parent xtype,child items)`,ExtJSComponent.rawConfigs.xtype,ExtJSComponent.rawmenuitems)
        ExtJSComponent.rawConfigs.buttons = ExtJSComponent.rawbuttons
      }
      if(ExtJSComponent.rawcell != undefined) {
        l(`new set cell config (parent xtype,child items)`,ExtJSComponent.rawConfigs.xtype,ExtJSComponent.rawmenu)
        ExtJSComponent.rawConfigs.cell = ExtJSComponent.rawcell
      }
      if(ExtJSComponent.raweditor != undefined) {
        l(`new set editor config (parent xtype,child items)`,ExtJSComponent.rawConfigs.xtype,ExtJSComponent.rawmenu)
        ExtJSComponent.rawConfigs.editor = ExtJSComponent.raweditor
      }
      if(ExtJSComponent.rawwidget != undefined) {
        l(`new set widget config (parent xtype,child items)`,ExtJSComponent.rawConfigs.xtype,ExtJSComponent.rawmenu)
        ExtJSComponent.rawConfigs.widget = ExtJSComponent.rawwidget
      }
      if(ExtJSComponent.rawtooltip != undefined) {
        l(`new set widget config (parent xtype,child items)`,ExtJSComponent.rawConfigs.xtype,ExtJSComponent.rawmenu)
        ExtJSComponent.rawConfigs.tooltip = ExtJSComponent.rawtooltip
      }
      if(ExtJSComponent.rawConfigs.renderer != undefined && CLASS_CACHE.Column && isAssignableFrom(ExtJSComponent.rawConfigs,CLASS_CACHE.Column)) {
        l(`renderer`,ExtJSComponent.rawConfigs.xtype,ExtJSComponent.rawConfigs.renderer)
        ExtJSComponent.rawConfigs.cell= ExtJSComponent.rawConfigs.cell || {}
        ExtJSComponent.rawConfigs.cell.xtype = 'renderercell'
      }
      if(ExtJSComponent.rawConfigs.columns!= undefined && CLASS_CACHE.Column && isAssignableFrom(ExtJSComponent.rawConfigs,CLASS_CACHE.Column)) {
        l(`renderer`,ExtJSComponent.rawConfigs.xtype,ExtJSComponent.rawConfigs.renderer)
        ExtJSComponent.rawConfigs.columns.forEach(function(column){
          if(column.renderer != undefined) {
            column.cell= column.cell || {}
            column.cell.xtype = 'renderercell'
          }
        })
      }
      if(ExtJSComponent.rawConfigs.config != undefined ) {
        Object.assign(ExtJSComponent.rawConfigs, ExtJSComponent.rawConfigs.config);   
      }
      if (typeof(props.children) == 'string' || typeof(props.children) == 'number') {
        if(ExtJSComponent.rawhtml === undefined) {
          ExtJSComponent.rawConfigs.html = props.children
        }
      }
      ExtJSComponent.rawConfigs = ExtJSComponent._cloneProps(ExtJSComponent.rawConfigs)
      ExtJSComponent.cmp = new ExtJSComponent.extJSClass(ExtJSComponent.rawConfigs)
      l(`ExtRenderer: finalizeInitialChildren, type: ${type}, xtype: ${xtype}, (ExtJSComponent.rawConfigs, ExtJSComponent.cmp)`, ExtJSComponent.rawConfigs, ExtJSComponent.cmp)
    }
    else {
      //SK : HTML Rendering - STEP 2  : Create component and render HTML in its DOM
      var cmp = Ext.create({xtype:'component', cls: 'x-react-element'})
      if (Ext.isClassic) {
        console.log(type)
        ExtJSComponent.createElement =  React.createElement(type, props, props.children)
      }
      else {
        ReactDOM.render(React.createElement(type, props, props.children),cmp.el.dom)
      }
      ExtJSComponent.cmp = cmp
      l(`ExtRenderer: finalizeInitialChildren, type: ${type}, xtype: ${xtype}, ExtJSComponent == html`,ExtJSComponent)
    }
    return true;
  },
 
  createTextInstance(text, rootContainerInstance, internalInstanceHandle) {
    l(`createTextInstance (text, rootContainerInstance, internalInstanceHandle)`,text, rootContainerInstance, internalInstanceHandle)
    return text
  },
 
  getPublicInstance(instance) {
    l(`getPublicInstance`,instance)
    return instance
  },

  prepareForCommit() {
    l(`prepareForCommit**********`)
  },

  prepareUpdate(domElement, type, oldProps, newProps) {
    l(`prepareUpdate ${type} **********`)
    return UPDATE_SIGNAL
  },

  resetAfterCommit() {
    l(`resetAfterCommit**********`)
  },

  resetTextContent(domElement) {
    l(`resetTextContent**********`)
   },

  shouldDeprioritizeSubtree(type, props) {
    l(`shouldDeprioritizeSubtree**********`)
    return false
  },

  getRootHostContext() {
    l(`getRootHostContext**********`)
    return emptyObject
  },

  getChildHostContext() {
    l(`getChildHostContext**********`)
    return emptyObject
  },

  //scheduleDeferredCallback: ReactDOMFrameScheduling.rIC,

  shouldSetTextContent(type, props) {
    l(`shouldSetTextContent**********type,props`,type,props)
    //SK : FOR HTML Nested Components we need to create instance for only parent so we set the text context
    const xtype = type.toLowerCase().replace(/_/g, '-')
    var extJSClass = Ext.ClassManager.getByAlias(`widget.${xtype}`)
    var s = typeof props.children === 'string' || typeof props.children === 'number' || extJSClass === undefined
    l(`shouldSetTextContent**********s`,s)
    return (
      typeof props.children === 'string' || typeof props.children === 'number' || extJSClass === undefined
    );
  },

  //now: ReactDOMFrameScheduling.now,
  now: () => {},

  useSyncScheduling: true,
	supportsMutation: true,

  appendChildToContainer(parentInstance, childInstance) {
    //should only be for ExtReact root component
    if (parentInstance != null && childInstance != null) {
      l('appendChildToContainer (childInstance.target, parentInstance, childInstance)', childInstance.target, parentInstance, childInstance)
      //this section replaces all of doAdd!!!
      var parentCmp = parentInstance
      var childCmp = childInstance.cmp
      if (parentCmp.ExtReactRoot != true) {
        console.log('appendChildToContainer ERROR ExtReactRoot is the only one to be in do Add')
        throw error
      }
      else {
        l('appendChildToContainer This is ExtReactRoot, call add method on parent')
        if(childCmp) {
          parentCmp.add(childCmp)
        } else {
          l("appendChildToContainer This is ExtReactRoot but with string/non ExtJS child")
        }
      }
    }
    else {
      l('appendChildToContainer (null) parentInstance', parentInstance)
      l('appendChildToContainer (null) childInstance', childInstance)
    }

//mjg
    if (Ext.isClassic) {
      if(childInstance.createElement) {
        console.log(childInstance)
        console.log(childInstance.createElement)
        ReactDOM.render(childInstance.createElement,childInstance.cmp.getEl().dom)
      }
    }
  },

  removeChildFromContainer(parentInstance, child) {
    l(`removeChildFromContainer (parentInstance, child)`, parentInstance, child)
    if (parentInstance != null && child != null) {
      if(child.cmp) {
        parentInstance.remove(child.cmp, true)
      } else {
        console.log("removeChildFromContainer - child.cmp is undefined")
      }        
    }
  },

  commitMount(instance, type, newProps) {
    l(`commitMount**********`)
  },

  commitUpdate(instance, updatePayload, type, oldProps, newProps) {
    l(`commitUpdate ${type} (instance, updatePayload, oldProps, newProps)`, instance, updatePayload, oldProps, newProps)
    if (instance._applyProps) {
      instance._applyProps(oldProps, newProps, instance, type);
    }
    else {
      console.log('Error: _applyProps')
      console.log(instance)
    }
  },

  appendChild(parentInstance, childInstance) {
    if(childInstance.cmp === undefined) {
      l("plain text")
      return false;
    }
    if (parentInstance != null && childInstance != null) {
      l('appendChild (childInstance.xtype, parentInstance, child)', childInstance.xtype, parentInstance, childInstance)
      doAdd(childInstance.xtype, parentInstance.cmp, childInstance.cmp, childInstance.reactChildren)
    }
    else {
      console.warn('both are null')
    }
  },

  insertBefore(parentInstance, child, beforeChild) {
    l(`insertBefore**********`)
    invariant(
      child !== beforeChild,
      'ExtRenderer: Can not insert node before itself',
    );
    if(parentInstance.cmp.insertBefore && typeof parentInstance.cmp.insertBefore === 'function') {
      parentInstance.cmp.insertBefore(child.cmp, beforeChild.cmp);
    }
  },

  insertInContainerBefore(parentInstance, child, beforeChild) {
    l(`insertInContainerBefore**********`)
    invariant(
      child !== beforeChild,
      'ExtRenderer: Can not insert node before itself',
    );
    child.injectBefore(beforeChild);
  },

  removeChild(parentInstance, child) {
    if (parentInstance != null && child != null) {
      l(`removeChild (parentInstance, child)`, parentInstance, child)
      //not working commented out for tab panel close - does this cause anything to break??
      if (parentInstance.xtype == 'html') return //correct??
      if (child.cmp != undefined) {
        if(parentInstance.cmp.xtype == 'grid' && child.cmp.xtype == 'column') {
          parentInstance.cmp.removeColumn(child.cmp);
        } 
        else if(parentInstance.cmp.xtype === "button") {
          if(child.cmp.xtype === "menu"){
            parentInstance.cmp.setMenu(null)
          }
        }
        else if(parentInstance.cmp.getItems!= undefined && typeof parentInstance.cmp.getItems == 'function' && parentInstance.cmp.getItems().get(child.cmp.getItemId())) {
          parentInstance.cmp.remove(child.cmp, true)
        } else {
          l("DID NOTHING IN REMOVE")
        }   
      }
    }
    else {
      console.warn('removeChild - both are null')
    }
  },

  commitTextUpdate(textInstance, oldText, newText) {
    l(`commitTextUpdate**********`)
  },

})

export default ExtRenderer

/**
 * Wraps a dom element in an Ext Component so it can be added as a child item to an Ext Container.  We attach
 * a reference to the generated Component to the dom element so it can be destroyed later if the dom element
 * is removed when rerendering
 * @param {Object} node A React node object with node, children, and text
 * @returns {Ext.Component}
 */
function wrapDOMElement(node) {
  let contentEl = node.node;

  const cmp = new Ext.Component({ 
      // We give the wrapper component a class so that developers can reset css 
      // properties (ex. box-sizing: context-box) for third party components.
      cls: 'x-react-element' 
  });
  
  if (cmp.element) {
      // modern
      DOMLazyTree.insertTreeBefore(cmp.element.dom, node);
  } else {
      // classic
      const target = document.createElement('div');
      DOMLazyTree.insertTreeBefore(target, node);
      cmp.contentEl = contentEl instanceof HTMLElement ? contentEl : target /* text fragment or comment */;
  }

  cmp.$createdByExtReact = true;
  contentEl._extCmp = cmp;

  // this is needed for devtools when using dangerouslyReplaceNodeWithMarkup
  // this not needed in fiber
  cmp.node = contentEl;

  return cmp;
}

/**
 * Returns true if subClass is parentClass or a sub class of parentClass
 * @param {Ext.Class} subClass
 * @param {Ext.Class} parentClass
 * @return {Boolean}
 */
function isAssignableFrom(subClass, parentClass) {
  if (!subClass || !parentClass) return false;
  if (parentClass.xtype == 'gridcolumn' && subClass.xtype != undefined) {
    subClass = Ext.ClassManager.getByAlias('widget.' + subClass.xtype)
  }
  return subClass === parentClass || subClass.prototype instanceof parentClass;
}

//this needs to be refactored
function doAdd(childXtype, parentCmp, childCmp, childPropsChildren) {
  l(`ExtRenderer.js: doAdd, parentxtype: ${parentCmp.xtype}, childxtype: ${childXtype}, (parentCmp, childCmp, childPropsChildern)`, parentCmp, childCmp, childPropsChildren)
//console.warn('why in doAdd??')

  //  parentCmp.add(childCmp)
//  return



  // if (parentCmp.ExtReactRoot != true) {
  //   console.log('ExtReactRoot is the only onc to be in doAdd')
  //   throw error
  // }
  // else {
  //   console.log('This is ExtReactRoot, do add')
  //   parentCmp.add(childCmp)
  // }

  // return

  //  l(`ExtRenderer: createInstance, type: ${type}, extJSClass undefined`)

  //which other types need special care?

  if(parentCmp.xtype == 'grid') {
    if (childXtype == 'column' || 
    childXtype == 'treecolumn' || 
    childXtype == 'textcolumn' || 
    childXtype == 'checkcolumn' || 
    childXtype == 'datecolumn' || 
    childXtype == 'rownumberer' ||
    childXtype == 'numbercolumn' ) {
    parentCmp.addColumn(childCmp);
    }
  }
  else if (parentCmp.xtype == 'tooltip') {
    parentCmp.setTooltip(childCmp)
  }
  else if (parentCmp.xtype == 'plugin') {
    parentCmp.setPlugin(childCmp)
  }
  else if (parentCmp.xtype == 'button') {
    if (childXtype == 'menu') {
//      l(`doAdd button/menu`)
      l(`ExtRenderer.js: doAdd, parentxtype: ${parentCmp.xtype}, childxtype: ${childXtype}, button/menu setMenu`)
      parentCmp.setMenu(childCmp)
    }
    else {
      l(`ExtRenderer.js: doAdd, parentxtype: ${parentCmp.xtype}, childxtype: ${childXtype}, did nothing!!!`)
    }
  }

  else if (childXtype == 'toolbar'  && Ext.isClassic == true) {
    l(`ExtRenderer.js: doAdd, parentxtype: ${parentCmp.xtype}, childxtype: ${childXtype}, toolbar, classic, addDockedItems`)
    parentCmp.addDockedItems(childCmp)
  }


  else if ((childXtype == 'toolbar' || childXtype == 'titlebar') && parentCmp.getHideHeaders != undefined) {
    if (parentCmp.getHideHeaders() == false) {
//      l(`doAdd toolbar hideHeaders is false`)
      l(`ExtRenderer.js: doAdd, parentxtype: ${parentCmp.xtype}, childxtype: ${childXtype}, toolbar hideHeaders is false, insert`)
      var i = parentCmp.items.items.length
      parentCmp.insert(i-1,childCmp)
     }
    else {
      //l(`doAdd toolbar hideHeaders is true`)
      l(`ExtRenderer.js: doAdd, parentxtype: ${parentCmp.xtype}, childxtype: ${childXtype}, toolbar hideHeaders is false, add`)
      parentCmp.add(childCmp)
    }
  }
  else if (parentCmp.add != undefined) {
    //l(`doAdd use add method`, parentCmp.xtype, childCmp.xtype)
    l(`ExtRenderer.js: doAdd, parentxtype: ${parentCmp.xtype}, childxtype: ${childXtype}, add`)
    parentCmp.add(childCmp)
  }
  else {
    //l(`doAdd did nothing!!!`, parentCmp.xtype, childCmp.xtype)
    l(`ExtRenderer.js: doAdd, parentxtype: ${parentCmp.xtype}, childxtype: ${childXtype}, did nothing!!!`)

  }

 
//we return if we handle html children correctly
//return




//   if (childPropsChildren == undefined) return
//   if (childPropsChildren.type == undefined) { 
//     if(typeof childPropsChildren === "string") {
//       //PLAIN TEXT CASE
//       var text=childPropsChildren
//       //l(`${text} is PLAIN TEXT`)
//       l(`ExtRenderer.js: doAdd, parentxtype: ${parentCmp.xtype}, childxtype: ${childXtype}, ${text} is PLAIN TEXT`)
//       childCmp.setHtml(text)
//     } 
//     else {
//       l(`ExtRenderer.js: doAdd, parentxtype: ${parentCmp.xtype}, childxtype: ${childXtype}, (children)`, childPropsChildren)
//       for (var i = 0; i < childPropsChildren.length; i++) {
//         var child = childPropsChildren[i]
//         var xtype = null
//         try {
//           var type = child.type
//           if (type == undefined) { 
//             type = child[0].type 
//           }
//           xtype = type.toLowerCase().replace(/_/g, '-')
//         }
//         catch(e) {
//           l(`ExtRenderer.js: doAdd, child ${i}, catch (child)`, child)
//           continue
//         }
//         if (xtype != null) {
//           var target = Ext.ClassManager.getByAlias(`widget.${xtype}`)
//           if (target == undefined) {
//             //l(`${xtype} is HTML`)
//             l(`ExtRenderer.js: doAdd, child ${i}, xtype: ${xtype}, is HTML`)
//             //should call wrapDOMElement(node)??? what does classic do? can widget be used?
//             var widget = Ext.create({xtype:'widget'})
//             childCmp.add(widget)
//             ReactDOM.render(child,widget.el.dom)
//           }
//           else {
// //            l(`xtype is NULL`)
//             l(`ExtRenderer.js: doAdd, child ${i}, xtype: ${xtype}, target ${xtype}`)
//           }
//         }
//         else {
//           l(`ExtRenderer.js: doAdd, children, xtype: ${xtype}, i: ${i}, is null`)
//           //l(`${xtype} is ExtJS`)
//         }
//       }
//     }
    
//   }
//   else {
//     l(childPropsChildren);
//     var child = childPropsChildren

//     var xtype = null
//     try {
//       var type = child.type
//       if (type == undefined) { 
//         type = child[0].type 
//       }
//       xtype = type.toLowerCase().replace(/_/g, '-')
//     }
//     catch(e) {
//     }

//     if (xtype != null) {
//       var extObject = Ext.ClassManager.getByAlias(`widget.${xtype}`)
//       if (extObject == undefined) {
//         l(`${xtype} is HTML`)
//         //should call wrapDOMElement(node)??? what does classic do? can widget be used?

//         var widget = Ext.create({xtype:'widget'})
//         childCmp.add(widget)
//         ReactDOM.render(child,widget.el.dom)
//       }
//       else {
//         l(`xtype is NULL`)
//       }
//     }
//     else {
//       l(`${xtype} is ExtJS`)
//     }

//   }
}
