/**
 * @class Ext.Base
 *
 * The root of all classes created with {@link Ext#define}.
 *
 * Ext.Base is the building block of all Ext classes. All classes in Ext inherit from Ext.Base.
 * All prototype and static members of this class are inherited by all other classes.
 */

/**
 * @method override
 * Override members of this class. Overridden methods can be invoked via
 * {@link Ext.Base#callParent}.
 *
 *     Ext.define('My.Cat', {
 *         constructor: function() {
 *             alert("I'm a cat!");
 *         }
 *     });
 *
 *     My.Cat.override({
 *         constructor: function() {
 *             alert("I'm going to be a cat!");
 *
 *             this.callParent(arguments);
 *
 *             alert("Meeeeoooowwww");
 *         }
 *     });
 *
 *     var kitty = new My.Cat(); // alerts "I'm going to be a cat!"
 *                               // alerts "I'm a cat!"
 *                               // alerts "Meeeeoooowwww"
 *
 * Direct use of this method should be rare. Use {@link Ext#define Ext.define}
 * instead:
 *
 *     Ext.define('My.CatOverride', {
 *         override: 'My.Cat',
 *         constructor: function() {
 *             alert("I'm going to be a cat!");
 *
 *             this.callParent(arguments);
 *
 *             alert("Meeeeoooowwww");
 *         }
 *     });
 *
 * The above accomplishes the same result but can be managed by the {@link Ext.Loader}
 * which can properly order the override and its target class and the build process
 * can determine whether the override is needed based on the required state of the
 * target class (My.Cat).
 *
 * @param {Object} members The properties to add to this class. This should be
 * specified as an object literal containing one or more properties.
 * @return {Ext.Base} this class
 * @static
 * @inheritable
 */
