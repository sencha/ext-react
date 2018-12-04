/**
 * @class Ext.util.ObjectTemplate
 * This class accepts an object that serves as a template for creating new objects. Like
 * other templates (`Ext.XTemplate`) this creation step requires a context object to give
 * the template its values.
 *
 * For example:
 *
 *      var tpl = new Ext.util.ObjectTemplate({
 *          property: 'Hello {name}',
 *          data: {
 *              value: '{age}'
 *          }
 *      });
 *
 *      var obj = tpl.apply({
 *          name: 'Bill',
 *          age: 42
 *      });
 *
 *      // obj = {
 *      //     property: 'Hello Bill',
 *      //     data: {
 *      //         value: 42
 *      //     }
 *      // }
 *
 * @since 5.0.0
 */

/**
 * @method create
 * Creates an `ObjectTemplate` given a config object or instance.
 * @param {Object/Ext.util.ObjectTemplate} template The template object.
 * @param {Object} [options]
 * @return {Ext.util.ObjectTemplate}
 * @since 5.0.0
 */

/**
 * @method constructor
 * @constructor
 * Constructs the `ObjectTemplate`. The actual compilation of the object to a ready to
 * apply form happens on the first call to `apply`.
 * @param {Object} template
 * @param {Object} [options]
 * @since 5.0.0
 */

/**
 * @method apply
 * Applies the given `context` object to this template and returns a new object with
 * the appropriate pieces replaced.
 * @param {Object} context The data used to populate the template.
 * @return {Object}
 * @since 5.0.0
 */

/**
 * @method compile
 * Compiles the  given template into an `apply` method that is ready to run. This
 * method is used recursively to process object properties and array elements.
 * @param {Mixed} template
 * @return {Function}
 * @since 5.0.0
 */
