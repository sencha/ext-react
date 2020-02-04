/**
 * @class Ext.mixin.Pluggable
 * @extend Ext.Mixin
 *
 * This mixin provides support for a `plugins` config and related API's.
 *
 * If this mixin is used for non-Components, the statements regarding the host being a
 * Component can be translated accordingly. The only requirement on the user of this class
 * is that the plugins actually used be appropriate for their host.
 *
 * While `Ext.Component` in the Classic Toolkit supports `plugins`, it does not use this
 * class to provide that support. This is due to backwards compatibility in regard to
 * timing changes this implementation would present.
 *
 * **Important:** To ensure plugins are destroyed, call `setPlugins(null)`.
 * @protected
 * @since 6.2.0
 */

/**
 * @cfg {Object/String/Object[]/String[]} plugins
 * An object or array of objects that will provide custom functionality for this
 * component. If a string is provided or a string is one of the elements of the
 * array, that string is treated as the `type` alias. For example, "listpaging"
 * is the type alias for `Ext.plugin.ListPaging`. The full alias includes the
 * "plugin." prefix (i.e., 'plugin.listpaging').
 *
 * Plugins should derive from `Ext.plugin.Abstract` but this is not required. The
 * only requirement for a valid plugin is that it contain an `init()` method that
 * accepts a reference to the owning component.
 *
 * When a component is created, if any plugins are available, the component will
 * call the `{@link Ext.plugin.Abstract#method-init init}` method on each plugin,
 * passing a reference to itself. Each plugin can then call methods or respond to
 * events on the component as needed to provide its functionality.
 *
 * ## Example code
 *
 * A plugin by alias:
 *
 *      var list = Ext.create({
 *          xtype: 'list',
 *          itemTpl: '<div class="item">{title}</div>',
 *          store: 'Items',
 *
 *          plugins: 'listpaging'
 *      });
 *
 * Multiple plugins by alias:
 *
 *      var list = Ext.create({
 *          xtype: 'list',
 *          itemTpl: '<div class="item">{title}</div>',
 *          store: 'Items',
 *
 *          plugins: ['listpaging', 'pullrefresh']
 *      });
 *
 * Single plugin by class name with config options:
 *
 *      var list = Ext.create({
 *          xtype: 'list',
 *          itemTpl: '<div class="item">{title}</div>',
 *          store: 'Items',
 *
 *          plugins: {
 *              type: 'listpaging',
 *              autoPaging: true
 *          }
 *      });
 *
 * Multiple plugins by type and class name with config options:
 *
 *      var list = Ext.create({
 *          xtype: 'list',
 *          itemTpl: '<div class="item">{title}</div>',
 *          store: 'Items',
 *
 *          plugins: [{
 *              xclass: 'Ext.plugin.PullRefresh',
 *              pullRefreshText: 'Pull to refresh...'
 *          }, {
 *              type: 'listpaging',
 *              autoPaging: true
 *          }]
 *      });
 *
 * @accessor
 *
 */

/**
 * @method addPlugin
 * Adds a plugin. For example:
 *
 *      list.addPlugin('pullrefresh');
 *
 * Or:
 *
 *      list.addPlugin({
 *          type: 'pullrefresh',
 *          pullRefreshText: 'Pull to refresh...'
 *      });
 *
 * @param {Object/String/Ext.plugin.Abstract} plugin The plugin or config object or
 * alias to add.
 * @since 6.2.0
 */

/**
 * @method destroyPlugin
 * Removes and destroys a plugin.
 *
 * **Note:** Not all plugins are designed to be removable. Consult the documentation
 * for the specific plugin in question to be sure.
 * @param {String/Ext.plugin.Abstract} plugin The plugin or its `id` to remove.
 * @return {Ext.plugin.Abstract} plugin instance or `null` if not found.
 * @since 6.2.0
 */

/**
 * @method findPlugin
 * Retrieves plugin by its `type` alias. For example:
 *
 *      var list = Ext.create({
 *          xtype: 'list',
 *          itemTpl: '<div class="item">{title}</div>',
 *          store: 'Items',
 *
 *          plugins: ['listpaging', 'pullrefresh']
 *      });
 *
 *      list.findPlugin('pullrefresh').setPullRefreshText('Pull to refresh...');
 *
 * **Note:** See also {@link #getPlugin}.
 *
 * @param {String} type The Plugin's `type` as specified by the class's
 * {@link Ext.Class#cfg-alias alias} configuration.
 * @return {Ext.plugin.Abstract} plugin instance or `null` if not found.
 * @since 6.2.0
 */

/**
 * @method getPlugin
 * Retrieves a plugin by its `id`.
 *
 *      var list = Ext.create({
 *          xtype: 'list',
 *          itemTpl: '<div class="item">{title}</div>',
 *          store: 'Items',
 *
 *          plugins: {
 *              xclass: 'Ext.plugin.PullRefresh',
 *              id: 'foo'
 *          }
 *      });
 *
 *      list.getPlugin('foo').setPullRefreshText('Pull to refresh...');
 *
 * **Note:** See also {@link #findPlugin}.
 *
 * @param {String} id The `id` of the plugin.
 * @return {Ext.plugin.Abstract} plugin instance or `null` if not found.
 * @since 6.2.0
 */

/**
 * @method removePlugin
 * Removes and (optionally) destroys a plugin.
 *
 * **Note:** Not all plugins are designed to be removable. Consult the documentation
 * for the specific plugin in question to be sure.
 * @param {String/Ext.plugin.Abstract} plugin The plugin or its `id` to remove.
 * @param {Boolean} [destroy] Pass `true` to not call `destroy()` on the plugin.
 * @return {Ext.plugin.Abstract} plugin instance or `null` if not found.
 * @since 6.2.0
 */
