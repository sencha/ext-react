/**
 * This class provides dynamic loading support for JavaScript classes. Application code
 * does not typically need to call `Ext.Loader` except perhaps to configure path mappings
 * when not using [Sencha Cmd](http://www.sencha.com/products/sencha-cmd/).
 *
 *      Ext.Loader.setPath('MyApp', 'app');
 *
 * When using Sencha Cmd, this is handled by the "bootstrap" provided by the application
 * build script and such configuration is not necessary.
 *
 * # Typical Usage
 *
 * The `Ext.Loader` is most often used behind the scenes to satisfy class references in
 * class declarations. Like so:
 *
 *      Ext.define('MyApp.view.Main', {
 *          extend: 'Ext.panel.Panel',
 *
 *          mixins: [
 *              'MyApp.util.Mixin'
 *          ],
 *
 *          requires: [
 *              'Ext.grid.Panel'
 *          ],
 *
 *          uses: [
 *              'MyApp.util.Stuff'
 *          ]
 *      });
 *
 * In all of these cases, `Ext.Loader` is used internally to resolve these class names
 * and ensure that the necessary class files are loaded.
 *
 * During development, these files are loaded individually for optimal debugging. For a
 * production use, [Sencha Cmd](http://www.sencha.com/products/sencha-cmd/) will replace
 * all of these strings with the actual resolved class references because it ensures that
 * the classes are all contained in the build in the correct order. In development, these
 * files will not be loaded until the `MyApp.view.Main` class indicates they are needed
 * as shown above.
 *
 * # Loading Classes
 *
 * You can also use `Ext.Loader` directly to load classes or files. The simplest form of
 * use is `{@link Ext#require}`.
 *
 * For example:
 *
 *      Ext.require('MyApp.view.Main', function () {
 *          // On callback, the MyApp.view.Main class is now loaded
 *
 *          var view = new MyApp.view.Main();
 *      });
 *
 * You can alternatively require classes by alias or wildcard.
 *
 *     Ext.require('widget.window');
 *
 *     Ext.require(['widget.window', 'layout.border', 'Ext.data.Connection']);
 *
 *     Ext.require(['widget.*', 'layout.*', 'Ext.data.*']);
 *
 * The callback function is optional.
 *
 * **Note** Using `Ext.require` at global scope will cause `{@link Ext#onReady}` and
 * `{@link Ext.app.Application#launch}` methods to be deferred until the required classes
 * are loaded. It is these cases where the callback function is most often unnecessary.
 *
 * ## Using Excludes
 *
 * Alternatively, you can exclude what you don't need:
 *
 *     // Include everything except Ext.tree.*
 *     Ext.exclude('Ext.tree.*').require('*');
 *
 *     // Include all widgets except widget.checkbox* (this will exclude
 *     // widget.checkbox, widget.checkboxfield, widget.checkboxgroup, etc.)
 *     Ext.exclude('widget.checkbox*').require('widget.*');
 *
 * # Dynamic Instantiation
 *
 * Another feature enabled by `Ext.Loader` is instantiation using class names or aliases.
 *
 * For example:
 *
 *      var win = Ext.create({
 *          xtype: 'window',
 *
 *          // or
 *          // xclass: 'Ext.window.Window'
 *
 *          title: 'Hello'
 *      });
 *
 * This form of creation can be useful if the type to create (`window` in the above) is
 * not known statically. Internally, `{@link Ext#create}` may need to *synchronously*
 * load the desired class and its requirements. Doing this will generate a warning in
 * the console:
 * 
 *      [Ext.Loader] Synchronously loading 'Ext.window.Window'...
 *
 * If you see these in your debug console, you should add the indicated class(es) to the
 * appropriate `requires` array (as above) or make an `{@link Ext#require}` call.
 * 
 * 
 * **Note** Using `{@link Ext#create}` has some performance overhead and is best reserved
 * for cases where the target class is not known until run-time.
 * 
 * @class Ext.Loader
 * @singleton
 */

/**
 * @cfg {Boolean} [enabled=true]
 * Whether or not to enable the dynamic dependency loading feature.
 * @accessor
 */

/**
 * @cfg {Boolean} [scriptChainDelay=false]
 * millisecond delay between asynchronous script injection (prevents stack
 * overflow on some user agents) 'false' disables delay but potentially
 * increases stack load.
 * @accessor
 */

/**
 * @cfg {Boolean} [disableCaching=true]
 * Appends current timestamp to script files to prevent caching.
 * @accessor
 */

/**
 * @cfg {String} [disableCachingParam="_dc"]
 * The get parameter name for the cache buster's timestamp.
 * @accessor
 */

/**
 * @cfg {Object} paths
 * The mapping from namespaces to file paths
 *
 *     {
 *         'Ext': '.', // This is set by default, Ext.layout.container.Container will be
 *                     // loaded from ./layout/Container.js
 *
 *         'My': './src/my_own_folder' // My.layout.Container will be loaded from
 *                                     // ./src/my_own_folder/layout/Container.js
 *     }
 *
 * Note that all relative paths are relative to the current HTML document.
 * If not being specified, for example, `Other.awesome.Class` will simply be
 * loaded from `"./Other/awesome/Class.js"`.
 * @accessor
 */

/**
 * @cfg {Boolean} [preserveScripts=true]
 * `false` to remove asynchronously loaded scripts, `true` to retain script
 * element for browser debugger compatibility and improved load performance.
 * @accessor
 */

/**
 * @cfg {String} scriptCharset
 * Optional charset to specify encoding of dynamic script content.
 * @accessor
 */

/**
 * An array of class names to keep track of the dependency loading order.
 * This is not guaranteed to be the same everytime due to the asynchronous
 * nature of the Loader.
 *
 * @property {Array} history
 */

/**
 * @method getPath
 * Translates a className to a file path by adding the
 * the proper prefix and converting the .'s to /'s. For example:
 *
 *     Ext.Loader.setPath('My', '/path/to/My');
 *
 *     alert(Ext.Loader.getPath('My.awesome.Class')); // alerts '/path/to/My/awesome/Class.js'
 *
 * Note that the deeper namespace levels, if explicitly set, are always resolved first.
 * For example:
 *
 *     Ext.Loader.setPath({
 *         'My': '/path/to/lib',
 *         'My.awesome': '/other/path/for/awesome/stuff',
 *         'My.awesome.more': '/more/awesome/path'
 *     });
 *
 *     alert(Ext.Loader.getPath('My.awesome.Class')); // alerts '/other/path/for/awesome/stuff/Class.js'
 *
 *     alert(Ext.Loader.getPath('My.awesome.more.Class')); // alerts '/more/awesome/path/Class.js'
 *
 *     alert(Ext.Loader.getPath('My.cool.Class')); // alerts '/path/to/lib/cool/Class.js'
 *
 *     alert(Ext.Loader.getPath('Unknown.strange.Stuff')); // alerts 'Unknown/strange/Stuff.js'
 *
 * @param {String} className
 * @return {String} path
 */

/**
 * @method onReady
 * Add a new listener to be executed when all required scripts are fully loaded
 *
 * @param {Function} fn The function callback to be executed
 * @param {Object} scope The execution scope (`this`) of the callback function.
 * @param {Boolean} [withDomReady=true] Pass `false` to not also wait for document
 * dom ready.
 * @param {Object} [options] Additional callback options.
 * @param {Number} [options.delay=0] A number of milliseconds to delay.
 * @param {Number} [options.priority=0] Relative priority of this callback. Negative
 * numbers are reserved.
 */

/**
 * @method loadScript
 * Loads the specified script URL and calls the supplied callbacks. If this method
 * is called before {@link Ext#isReady}, the script's load will delay the transition
 * to ready. This can be used to load arbitrary scripts that may contain further
 * {@link Ext#require Ext.require} calls.
 *
 * @param {Object/String/String[]} options The options object or simply the URL(s) to load.
 * @param {String} options.url The URL from which to load the script.
 * @param {Function} [options.onLoad] The callback to call on successful load.
 * @param {Function} [options.onError] The callback to call on failure to load.
 * @param {Object} [options.scope] The scope (`this`) for the supplied callbacks.
 */

/**
 * Loads all classes by the given names and all their direct dependencies; optionally
 * executes the given callback function when finishes, within the optional scope.
 *
 * @param {String/String[]} expressions The class, classes or wildcards to load.
 * @param {Function} [fn] The callback function.
 * @param {Object} [scope] The execution scope (`this`) of the callback function.
 * @member Ext
 * @method require
 */

/**
 * Synchronously loads all classes by the given names and all their direct dependencies; optionally
 * executes the given callback function when finishes, within the optional scope.
 *
 * @param {String/String[]} expressions The class, classes or wildcards to load.
 * @param {Function} [fn] The callback function.
 * @param {Object} [scope] The execution scope (`this`) of the callback function.
 * @member Ext
 * @method syncRequire
 */

/**
 * @cfg {String[]} requires
 * @member Ext.Class
 * List of classes that have to be loaded before instantiating this class.
 * For example:
 *
 *     Ext.define('Mother', {
 *         requires: ['Child'],
 *         giveBirth: function() {
 *             // we can be sure that child class is available.
 *             return new Child();
 *         }
 *     });
 */

/**
 * @cfg {String[]} uses
 * @member Ext.Class
 * List of optional classes to load together with this class. These aren't neccessarily loaded before
 * this class is created, but are guaranteed to be available before Ext.onReady listeners are
 * invoked. For example:
 *
 *     Ext.define('Mother', {
 *         uses: ['Child'],
 *         giveBirth: function() {
 *             // This code might, or might not work:
 *             // return new Child();
 *
 *             // Instead use Ext.create() to load the class at the spot if not loaded already:
 *             return Ext.create('Child');
 *         }
 *     });
 */

