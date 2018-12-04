/**
 * @class Ext
 * @extend Ext.Base
 *
 * The Ext namespace (global object) encapsulates all classes, singletons, and
 * utility methods provided by Sencha's libraries.
 *
 * Most user interface Components are at a lower level of nesting in the namespace,
 * but many common utility functions are provided as direct properties of the Ext namespace.
 *
 * Also many frequently used methods from other classes are provided as shortcuts
 * within the Ext namespace. For example {@link Ext#getCmp Ext.getCmp} aliases
 * {@link Ext.ComponentManager#get Ext.ComponentManager.get}.
 *
 * Many applications are initiated with {@link Ext#application Ext.application} which is
 * called once the DOM is ready. This ensures all scripts have been loaded, preventing
 * dependency issues. For example:
 *
 *      Ext.application({
 *          name: 'MyApp',
 *
 *          launch: function () {
 *              Ext.Msg.alert(this.name, 'Ready to go!');
 *          }
 *      });
 *
 * <b><a href="http://www.sencha.com/products/sencha-cmd/">Sencha Cmd</a></b> is a free tool
 * for helping you generate and build Ext JS (and Sencha Touch) applications. See
 * `{@link Ext.app.Application Application}` for more information about creating an app.
 *
 * A lower-level technique that does not use the `Ext.app.Application` architecture is
 * {@link Ext#onReady Ext.onReady}.
 *
 * You can also discuss concepts and issues with others on the
 * <a href="http://www.sencha.com/forum/">Sencha Forums</a>.
 *
 * @singleton
 */

/**
 * @property [enableGarbageCollector=false]
 * `true` to automatically uncache orphaned Ext.Elements periodically. If set to
 * `false`, the application will be required to clean up orphaned Ext.Elements and
 * it's listeners as to not cause memory leakage.
 */

/**
 * @property [enableListenerCollection=true]
 * True to automatically purge event listeners during garbageCollection.
 */

/**
 * @property {String} [name='Ext']
 * <p>The name of the property in the global namespace (The <code>window</code> in browser environments) which refers to the current instance of Ext.</p>
 * <p>This is usually <code>"Ext"</code>, but if a sandboxed build of ExtJS is being used, this will be an alternative name.</p>
 * <p>If code is being generated for use by <code>eval</code> or to create a <code>new Function</code>, and the global instance
 * of Ext must be referenced, this is the name that should be built into the code.</p>
 */

/**
 * @property {Function} privateFn
 * A reusable empty function for use as `privates` members.
 *
 *      Ext.define('MyClass', {
 *          nothing: Ext.emptyFn,
 *
 *          privates: {
 *              privateNothing: Ext.privateFn
 *          }
 *      });
 *
 */

/**
 * @property {Function} emptyFn
 * A reusable empty function.
 */

/**
 * @property {Function} identityFn
 * A reusable identity function that simply returns its first argument.
 */

/**
 * @property {Date} frameStartTime
 * This indicate the start timestamp of current cycle.
 * It is only reliable during dom-event-initiated cycles and
 * {@link Ext.draw.Animator} initiated cycles.
 */

/**
 * @cfg {String/Ext.Manifest} manifest
 * This object is initialized prior to loading the framework
 * and contains settings and other information describing the application.
 *
 * For applications built using Sencha Cmd, this is produced from the `"app.json"`
 * file with information extracted from all of the required packages' `"package.json"`
 * files. This can be set to a string when your application is using the
 * (microloader)[#/guide/microloader]. In this case, the string of "foo" will be
 * requested as `"foo.json"` and the object in that JSON file will parsed and set
 * as this object.
 *
 * @since 5.0.0
 */

/**
 * @cfg {Object} [debugConfig]
 * This object is used to enable or disable debugging for classes or namespaces. The
 * default instance looks like this:
 *
 *      Ext.debugConfig = {
 *          hooks: {
 *              '*': true
 *          }
 *      };
 *
 * Typically applications will set this in their `"app.json"` like so:
 *
 *      {
 *          "debug": {
 *              "hooks": {
 *                  // Default for all namespaces:
 *                  '*': true,
 *
 *                  // Except for Ext namespace which is disabled
 *                  'Ext': false,
 *
 *                  // Except for Ext.layout namespace which is enabled
 *                  'Ext.layout': true
 *              }
 *          }
 *      }
 *
 * Alternatively, because this property is consumed very early in the load process of
 * the framework, this can be set in a `script` tag that is defined prior to loading
 * the framework itself.
 *
 * For example, to enable debugging for the `Ext.layout` namespace only:
 *
 *      var Ext = Ext || {};
 *      Ext.debugConfig = {
 *          hooks: {
 *              //...
 *          }
 *      };
 *
 * For any class declared, the longest matching namespace specified determines if its
 * `debugHooks` will be enabled. The default setting is specified by the '*' property.
 *
 * **NOTE:** This option only applies to debug builds. All debugging is disabled in
 * production builds.
 */

/**
 * @property {String} [BLANK_IMAGE_URL='data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==']
 * URL to a 1x1 transparent gif image used by Ext to create inline icons with
 * CSS background images.
 */

/**
 * @property {String} [baseCSSPrefix='x-']
 * The base prefix to use for all `Ext` components. To configure this property, you should use the
 * Ext.buildSettings object before the framework is loaded:
 *
 *     Ext.buildSettings = {
 *         baseCSSPrefix : 'abc-'
 *     };
 *
 * or you can change it before any components are rendered:
 *
 *     Ext.baseCSSPrefix = Ext.buildSettings.baseCSSPrefix = 'abc-';
 *
 * This will change what CSS classes components will use and you should
 * then recompile the SASS changing the `$prefix` SASS variable to match.
 */
