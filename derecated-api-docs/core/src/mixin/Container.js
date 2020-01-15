/**
 * @class Ext.mixin.Container
 * @extend Ext.Mixin
 * @private
 * Common methods for both classic & modern containers
 */

/**
 * @property {Boolean} [isContainer=true]
 * `true` in this class to identify an object as an instantiated Container, or subclass thereof.
 */

/**
 * @cfg {Boolean} [nameHolder=false]
 * When `true` child components are tracked by their `name` property and can be
 * retrieved using the `lookupName` method.
 */

/**
 * @cfg {Boolean} [referenceHolder=false]
 * If `true`, this container will be marked as being a point in the hierarchy where
 * references to items with a specified `reference` config will be held. The container
 * will automatically become a referenceHolder if a {@link #controller} is specified.
 *
 * See the introductory docs for {@link Ext.container.Container} for more information
 * about references & reference holders.
 */

/**
 * @method getNamedItems
 * Returns an object holding the descendants of this container keyed by their
 * `name`. This object should not be held past the scope of the function calling this
 * method. It will not be valid if items are added or removed from this or any
 * sub-container.
 *
 * The intended usage is shown here (assume there are 3 components with names of
 * "foo", "bar" and "baz" at some level below this container):
 *
 *      onClick: function () {
 *          var items = this.getNamedItems();
 *
 *          // using "items" we can access any descendant by its "name"
 *
 *          items.foo.getValue() + items.bar.getValue() + items.baz.getValue();
 *      }
 *
 * If `this` component has a `name` assigned to it, it is **not** included in this
 * object. That name is understood to belong to the ancestor container configured
 * as the `nameHolder`.
 *
 * @return {Object} An object with each named child. This will be `null` if this
 * container has no descendants with a `name` specified.
 * @since 6.5.0
 */

/**
 * @method getReferences
 * Returns an object holding the descendants of this view keyed by their
 * `{@link Ext.Component#cfg-reference reference}`. This object should not be held
 * past the scope of the function calling this method. It will not be valid if items
 * are added or removed from this or any sub-container.
 *
 * The intended usage is shown here (assume there are 3 components with reference
 * values of "foo", "bar" and "baz" at some level below this container):
 *
 *      onClick: function () {
 *          var refs = this.getReferences();
 *
 *          // using "refs" we can access any descendant by its "reference"
 *
 *          refs.foo.getValue() + refs.bar.getValue() + refs.baz.getValue();
 *      }
 *
 * If `this` component has a `{@link Ext.Component#cfg-reference reference}` assigned
 * to it, that is **not** included in this object. That reference is understood to
 * belong to the ancestor container configured as the `referenceHolder`.
 *
 * @return {Object} An object with each child reference. This will be `null` if this
 * container has no descendants with a `{@link Ext.Component#cfg-reference reference}`
 * specified.
 * @since 5.0.0
 */

/**
 * @method lookup
 * Gets a reference to the component with the specified {@link #reference} value.
 *
 * The method is a short-hand for the {@link #lookupReference} method.
 *
 * @param {String} ref The value of the `reference` to lookup.
 * @return {Ext.Component} The referenced component or `null` if it is not found.
 * @since 6.0.1
 */

/**
 * @method lookupName
 * Gets a reference to the component with the specified `name` property.
 *
 * @param {String} name The name of the descendant to lookup.
 * @return {Ext.Component} The component or `null` if it is not found.
 * @since 6.5.0
 */

/**
 * @method lookupReferences
 * Gets a reference to the component with the specified {@link #reference} value.
 *
 * The {@link #lookup} method is a short-hand version of this method.
 *
 * @param {String} ref The name of the reference to lookup.
 * @return {Ext.Component} The referenced component or `null` if it is not found.
 * @since 5.0
 */
