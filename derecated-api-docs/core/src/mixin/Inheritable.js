/**
 * @class Ext.mixin.Inheritable
 * @extend Ext.Mixin
 *
 * A mixin that provides the functionality for inheritable configs. This allows linking
 * components and containers via a prototype-chained object for accessing inherited
 * values.
 *
 * ## Getting Inherited Properties
 *
 * A component's inherited state is used to keep track of aspects of a component's state
 * that might be influenced by its ancestors like "collapsed" and "hidden". For example:
 *
 *      var hidden = this.getInheritedConfig('hidden');
 *
 * The above will produce `true` if this or any ancestor component has its `hidden` config
 * set to `true`.
 *
 * ## Chained Objects
 *
 * Inheritable properties are implemented by chaining each component's inherited state
 * object to its parent container's inherited state object via the prototype. The result
 * is such that if a component's `inheritedState` does not have it's own property, it
 * inherits the property from the nearest ancestor that does.
 *
 * In the case of a Container, two state objects are created. The primary ("outer") object
 * is used for reading inherited properties. It is also what a child will prototype chain
 * to if that child is not part of the container's `items` collection. Anything in the
 * `items` collection will chain to the inheritedStateInner object instead. This object is
 * prototype chained to inheritedState but allows for Container's layout to set inherited
 * properties that specifically apply only to children of the container. This inner object
 * is unlikely to be needed by user code.
 *
 * ## Publishing Inherited Properties
 *
 * The first step to publishing inherited properties is to override `initInheritedState`
 * and add properties that have inheritable values.
 *
 *      initInheritedState: function (inheritedState) {
 *          this.callParent(arguments);
 *
 *          if (this.getHidden()) {
 *              inheritedState.hidden = true;
 *          }
 *      }
 *
 * The above is important because `initInheritedState` is called whenever the object needs
 * to be repopulated. As you can see, only `true` values are added to `inheritedState` in
 * this case because `false` would mask a `hidden` value of `true` from an ancestor.
 *
 * If these values change dynamically, these properties must be maintained. For example:
 *
 *      updateHidden: function (hidden) {
 *          var inherited = this.getInherited();
 *
 *          if (hidden) {
 *              inherited.hidden = true;
 *          } else {
 *              // Unmask whatever may be inherited:
 *              delete inherited.hidden;
 *          }
 *      }
 *
 * ## Proper Usage
 *
 * ALWAYS access inherited state using `getInherited` or `getInheritedConfig`, not by
 * accessing `inheritedState` directly.
 *
 * The `inheritedState` property does not exist until the first call to `getInherited`. At
 * that point `getInherited` walks up the component tree to establish the `inheritedState`
 * prototype chain. Additionally the `inheritedState` property should NOT be relied upon
 * even after the initial call to `getInherited` because it is possible for it to become
 * invalid.
 *
 * Invalidation typically happens when a component is moved to a new container. In such a
 * case the `inheritedState` remains invalid until the next time `getInherited` is called
 * on the component or one of its descendants.
 * @private
 * @since 5.0.0
 */

/**
 * @method getInherited
 * This method returns an object containing the inherited properties for this instance.
 *
 * @param {Boolean} [inner=false] Pass `true` to return `inheritedStateInner` instead
 * of the normal `inheritedState` object. This is only needed internally and should
 * not be passed by user code.
 *
 * @return {Object} The `inheritedState` object containing inherited properties.
 * @since 5.0.0
 */

/**
 * @method getInheritedConfig
 * This method returns the value of a config property that may be inherited from some
 * ancestor.
 *
 * In some cases, a config may be explicitly set on a component with the intent of
 * *only* being presented to its children while that component should act upon the
 * inherited value (see `referenceHolder` for example). In these cases the `skipThis`
 * parameter should be specified as `true`.
 *
 * @param {String} property The name of the config property to return.
 * @param {Boolean} [skipThis=false] Pass `true` if the property should be ignored if
 * found on this instance. In other words, `true` means the property must be inherited
 * and not explicitly set on this instance.
 * @return {Mixed} The value of the requested `property`.
 * @since 5.0.0
 */

/**
 * @method isDescendantOf
 * Determines whether this component is the descendant of a passed component.
 * @param {Ext.Component} ancestor A Component which may contain this Component.
 * @return {Boolean} `true` if the component is the descendant of the passed component,
 * otherwise `false`.
 */

/**
 * @method isAncestor
 * Determines whether **this Component** is an ancestor of the passed Component.
 * This will return `true` if the passed Component is anywhere within the subtree
 * beneath this Component.
 * @param {Ext.Component} possibleDescendant The Component to test for presence
 * within this Component's subtree.
 */
