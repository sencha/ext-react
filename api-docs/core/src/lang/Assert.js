/**
 * @class Ext.Assert
 * @extend Ext.Base
 * This class provides help value testing methods useful for diagnostics. These are often
 * used in `debugHooks`:
 * 
 *      Ext.define('Foo.bar.Class', {
 *
 *          debugHooks: {
 *              method: function (a) {
 *                  Ext.Assert.truthy(a, 'Expected "a" to be truthy');
 *              },
 *
 *              foo: function (object) {
 *                  Ext.Assert.isFunctionProp(object, 'doSomething');
 *              }
 *          }
 *      });
 * 
 * **NOTE:** This class is entirely removed in production builds so all uses of it should
 * be either in `debug` conditional comments or `debugHooks`.
 * 
 * The following type detection methods from the `Ext` object are wrapped as assertions
 * by this class:
 * 
 *  * `isEmpty`
 *  * `isArray`
 *  * `isDate`
 *  * `isObject`
 *  * `isSimpleObject`
 *  * `isPrimitive`
 *  * `isFunction`
 *  * `isNumber`
 *  * `isNumeric`
 *  * `isString`
 *  * `isBoolean`
 *  * `isElement`
 *  * `isTextNode`
 *  * `isDefined`
 *  * `isIterable`
 * 
 * These appear both their exact name and with a "Prop" suffix for checking a property on
 * an object. For example, these are almost identical:
 * 
 *      Ext.Assert.isFunction(object.foo);
 *
 *      Ext.Assert.isFunctionProp(object, 'foo');
 *
 * The difference is the default error message generated is better in the second use case
 * than the first.
 * 
 * The above list are also expanded for "Not" flavors (and "Not...Prop"):
 * 
 *  * `isNotEmpty`
 *  * `isNotArray`
 *  * `isNotDate`
 *  * `isNotObject`
 *  * `isNotSimpleObject`
 *  * `isNotPrimitive`
 *  * `isNotFunction`
 *  * `isNotNumber`
 *  * `isNotNumeric`
 *  * `isNotString`
 *  * `isNotBoolean`
 *  * `isNotElement`
 *  * `isNotTextNode`
 *  * `isNotDefined`
 *  * `isNotIterable`
 */

/**
 * @method falsey
 * Checks that the first argument is falsey and throws an `Error` if it is not.
 */

/**
 * @method falseyProp
 * Checks that the first argument is falsey and throws an `Error` if it is not.
 */

/**
 * @method truthy
 * Checks that the first argument is truthy and throws an `Error` if it is not.
 */

/**
 * @method truthyProp
 * Checks that the first argument is truthy and throws an `Error` if it is not.
 */