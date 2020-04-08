/**
 * @class Ext.util.Fly
 * This class is a base for classes that want to provide a `fly` static method.
 *
 * For example:
 *
 *      Ext.define('Foo.util.Thing', {
 *          extend: 'Ext.util.Fly',
 *
 *          // useful stuff
 *      });
 *
 *      var thing = Ext.util.Thing.fly(42);  // passes 42 to the reset method
 *
 *      // use "thing"
 *
 *      thing.release();   // return to the pool for future reuse
 *
 * @private
 */

/**
 * @method fly
 * @static
 * Returns a flyweight instance. These instances should be returned when no
 * longer needed by calling `release`.
 *
 * Additional arguments passed to this method will be passed on to the `reset`
 * method.
 *
 * @return {Ext.util.Fly} the flyweight instance
 */

/**
 * @method release
 * This method should be called when a flyweight instance is no longer needed and
 * should be returned to the flyweight pool.
 */

/**
 * Resets this instance to prepare for use. Derived classes may accept additional
 * arguments.
 *
 * When called with no arguments, the class should relinquish any resources it can
 * and prepare to wait for potential reuse.
 *
 * @method reset
 * @chainable
 * @return {Ext.util.Fly} this
 */
