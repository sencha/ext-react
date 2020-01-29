/**
 * @class Ext.data.TreeStore
 * @extend Ext.data.Store
 * @alias store.tree
 *
 * The TreeStore is a store implementation that owns the {@link #cfg-root root node} of
 * a tree, and provides methods to load either local or remote data as child nodes of the root
 * and any descendant non-leaf node.
 *
 * The TreeStore must be used as the store of a {@link Ext.tree.Panel tree panel}.
 *
 * This class also relays many node events from the underlying node structure.
 *
 * # Using Models
 *
 * If no Model is specified, an implicit model will be created that extends {@link Ext.data.TreeModel}.
 * The standard Tree fields will also be copied onto the Model for maintaining their state. These fields are listed
 * in the {@link Ext.data.NodeInterface} documentation.
 *
 * # Reading Nested Data
 *
 * For the tree to read nested data, the {@link Ext.data.reader.Reader} must be configured with a root property,
 * so the reader can find nested data for each node (if a root is not specified, it will default to
 * 'children'). This will tell the tree to look for any nested tree nodes by the same keyword, i.e., 'children'.
 * If a root is specified in the config make sure that any nested nodes with children have the same name.
 * 
 * **Note:** Setting {@link #defaultRootProperty} accomplishes the same thing.
 * 
 * #rootProperty as a Function
 * You can pass a function as the data reader's rootProperty when the tree's dataset has 
 * mixed root properties. Child nodes can then be programmatically determined at read time.  
 * 
 * For example, the child nodes may be passed via the 'children' property 
 * name, though you may have a top-level root property of 'items'.  
 * 
 * See {@link Ext.data.reader.Reader#rootProperty rootProperty} for more information.
 *
 * #Filtering#
 * Filtering of nodes in a TreeStore is hierarchically top down by default. This means that if a non-leaf node does not
 * pass the filter, then it, and all its descendants are filtered *out* of the store.
 *
 * To reverse this, so that any node which passes the filter causes all its ancestors to be visible, configure
 * the `TreeStore` with '{@link #cfg-filterer filterer: 'bottomup'}`
 *
 * You may also programatically filter individual tree nodes by setting their `'visible'` field.
 *
 * Setting this to `false` filters the node out so that it will not appear in the UI. Setting it to `true`
 * filters the node in.
 *
 * Note that if performing several filter operations, it is best to {@link #method-suspendEvents}
 * on the store first, and when all nodes have been modified, {@link #method-resumeEvents} and fire the
 * {@link #event-refresh} event on the store.
 */

/**
 * @property {Boolean} [isTreeStore=true]
 * `true` in this class to identify an object as an instantiated TreeStore, or subclass thereof.
 */

/**
 * @cfg {Ext.data.TreeModel/Ext.data.NodeInterface/Object} root
 * @accessor
 * The root node for this store. For example:
 *
 *     root: {
 *         expanded: true,
 *         text: "My Root",
 *         children: [
 *             { text: "Child 1", leaf: true },
 *             { text: "Child 2", expanded: true, children: [
 *                 { text: "GrandChild", leaf: true }
 *             ] }
 *         ]
 *     }
 *
 * Setting the `root` config option is the same as calling {@link #setRootNode}.
 *
 * It's important to note that setting expanded to true on the root node will cause
 * the tree store to attempt to load.  This will occur regardless the value of
 * {@link Ext.data.ProxyStore#autoLoad autoLoad}. If you you do not want the store
 * to load on instantiation, ensure expanded is false and load the store when you're ready.
 *
 */

/**
 * @cfg {Boolean} [rootVisible=false]
 * `false` to not include the root node in this Stores collection.
 * @accessor
 */

/**
 * @cfg {String} [defaultRootProperty="children"]
 * @accessor
 */

/**
 * @cfg {String} [parentIdProperty]
 * This config allows node data to be returned from the server in linear format
 * without having to structure it into `children` arrays.
 *
 * This property specifies which property name in the raw node data yields the id of the parent node.
 *
 * For example the following data would be read into a geographic tree by
 * configuring the TreeStore with `parentIdProperty: 'parentId'`.
 *
 * The node data contains an upward link to a parent node.
 *
 *     data: [{
 *         name: 'North America',
 *         id: 'NA'
 *     }, {
 *         name: 'Unites States',
 *         id: 'USA',
 *         parentId: 'NA'
 *     }, {
 *         name: 'Redwood City',
 *         leaf: true,
 *         parentId: 'USA'
 *     }, {
 *         name: 'Frederick, MD',
 *         leaf: true,
 *         parentId: 'USA'
 *     }]
 *
 * @accessor
 */

/**
 * @cfg {Boolean} [clearOnLoad=true]
 * Remove previously existing child nodes before loading.
 * @accessor
 */

/**
 * @cfg {Boolean} [clearRemovedOnLoad=true]
 * If `true`, when a node is reloaded, any records in the {@link #removed} record
 * collection that were previously descendants of the node being reloaded will be
 * cleared from the {@link #removed} collection.
 * Only applicable if {@link #clearOnLoad} is `true`.
 * @accessor
 */

/**
 * @cfg {String} [nodeParam="node"]
 * The name of the parameter sent to the server which contains the identifier of the node.
 * @accessor
 */

/**
 * @cfg {String} [defaultRootId="root"]
 * The default root id.
 * @accessor
 */

/**
 * @cfg {String} [defaultRootText="Root"]
 * The default root text (if not specified)
 * @accessor
 */

/**
 * @cfg {Boolean} [folderSort=false]
 * Set to true to automatically prepend a leaf sorter.
 * @accessor
 */

/**
 * @cfg {Number} pageSize
 * @hide
 * @accessor
 */

/**
 * @cfg {String} [filterer="topdown"]
 * The order in which to prioritize how filters are applied to nodes.
 *
 * The default, `'topdown'` means that if a parent node does *not* pass the filter, then the branch
 * ends there, and no descendant nodes are filtered in, even if they would pass the filter.
 *
 * By specifying `'bottomup'`, if a leaf node passes the filter, then all its ancestor nodes are filtered
 * in to allow it to be visible.
 * @since 6.0.2
 */

/**
 * @cfg {Boolean} [lazyFill=false]
 * Set to true to prevent child nodes from being loaded until the the node is
 * expanded or loaded explicitly.
 */

/**
 * @cfg fields
 * @inheritdoc Ext.data.Model#cfg-fields
 *
 * @localdoc **Note:** If you wish to create a Tree*Grid*, and configure your tree with a
 * {@link Ext.panel.Table#cfg-columns columns} configuration, it is possible to
 * define the set of fields you wish to use in the Store instead of configuring the
 * store with a {@link #cfg-model}.
 *
 * By default, the Store uses an {@link Ext.data.TreeModel}. If you configure
 * fields, it uses a subclass of {@link Ext.data.TreeModel} defined with the set of
 * fields that you specify (in addition to the fields which it uses for storing
 * internal state).
 */

/**
 * @event nodeappend
 * @inheritdoc Ext.data.NodeInterface#append
 */
/**
 * @event noderemove
 * @inheritdoc Ext.data.NodeInterface#remove
 */
/**
 * @event nodemove
 * @inheritdoc Ext.data.NodeInterface#move
 */
/**
 * @event nodeinsert
 * @inheritdoc Ext.data.NodeInterface#insert
 */
/**
 * @event nodebeforeappend
 * @inheritdoc Ext.data.NodeInterface#beforeappend
 */
/**
 * @event nodebeforeremove
 * @inheritdoc Ext.data.NodeInterface#beforeremove
 */
/**
 * @event nodebeforemove
 * @inheritdoc Ext.data.NodeInterface#beforemove
 */
/**
 * @event nodebeforeinsert
 * @inheritdoc Ext.data.NodeInterface#beforeinsert
 */
/**
 * @event nodeexpand
 * @inheritdoc Ext.data.NodeInterface#expand
 */
/**
 * @event nodecollapse
 * @inheritdoc Ext.data.NodeInterface#collapse
 */
/**
 * @event nodebeforeexpand
 * @inheritdoc Ext.data.NodeInterface#beforeexpand
 */
/**
 * @event nodebeforecollapse
 * @inheritdoc Ext.data.NodeInterface#beforecollapse
 */
/**
 * @event nodesort
 * @inheritdoc Ext.data.NodeInterface#sort
 */


/**
 * @event rootchange
 * Fires any time the tree's root node changes.
 * @param {Ext.data.TreeModel/Ext.data.NodeInterface} newRoot The new root
 * @param {Ext.data.TreeModel/Ext.data.NodeInterface} oldRoot The old root
 */

/**
 * @method getById
 * @inheritdoc Ext.data.LocalStore
 * @localdoc **NOTE:** TreeStore's getById method will only search nodes that
 * are expanded (all ancestor nodes are {@link Ext.data.NodeInterface#expanded
 * expanded}: true -- {@link Ext.data.NodeInterface#isExpanded isExpanded})
 *
 * See also {@link #getNodeById}
 */

/**
 * @method each
 * Calls the specified function for each {@link Ext.data.NodeInterface node} in the store.
 *
 * When store is filtered, only loops over the filtered records unless the `bypassFilters` parameter is `true`.
 *
 * @param {Function} fn The function to call. The {@link Ext.data.Model Record} is passed as the first parameter.
 * Returning `false` aborts and exits the iteration.
 * @param {Object} [scope] The scope (`this` reference) in which the function is executed.
 * Defaults to the current {@link Ext.data.NodeInterface node} in the iteration.
 * @param {Object/Boolean} [includeOptions] An object which contains options which
 * modify how the store is traversed. Alternatively, this parameter can be just the
 * `filtered` option.
 * @param {Boolean} [includeOptions.filtered] Pass `true` to include filtered out
 * nodes in the iteration.
 * @param {Boolean} [includeOptions.collapsed] Pass `true` to include nodes which are
 * descendants of collapsed nodes.
 */

/**
 * @method collect
 * Collects unique values for a particular dataIndex from this store.
 *
 * @param {String} dataIndex The property to collect
 * @param {Object/Boolean} [options] An object which contains options which modify how
 * the store is traversed. Or just the `allowNull` option.
 * @param {Boolean} [options.allowNull] Pass true to allow null, undefined or empty
 * string values.
 * @param {Boolean} [options.filtered] Pass `true` to collect from all records, even
 * ones which are filtered.
 * @param {Boolean} [options.collapsed] Pass `true` to include nodes which are
 * descendants of collapsed nodes.
 *
 * @param {Boolean} [filtered] If previous parameter (`options`) is just the
 * `allowNull` value, this parameter is the `filtered` option.
 *
 * @return {Object[]} An array of the unique values
 */

/**
 * @method getNodeById
 * Returns the record node by id regardless of visibility due to collapsed states;
 * all nodes present in the tree structure are available.
 * @param {String} id The id of the node to get.
 * @return {Ext.data.NodeInterface}
 */

/**
 * @method findNode
 * Finds the first matching node in the tree by a specific field value regardless of visibility
 * due to collapsed states; all nodes present in the tree structure are searched.
 *
 * @param {String} fieldName The name of the Record field to test.
 * @param {String/RegExp} value Either a string that the field value
 * should begin with, or a RegExp to test against the field.
 * @param {Boolean} [startsWith=true] Pass `false` to allow a match to start
 * anywhere in the string. By default the `value` will match only at the start
 * of the string.
 * @param {Boolean} [endsWith=true] Pass `false` to allow the match to end before
 * the end of the string. By default the `value` will match only at the end of the
 * string.
 * @param {Boolean} [ignoreCase=true] Pass `false` to make the `RegExp` case
 * sensitive (removes the 'i' flag).
 * @return {Ext.data.NodeInterface} The matched node or null
 */

/**
 * Marks this store as needing a load. When the current executing event handler exits,
 * this store will send a request to load using its configured {@link #proxy}.
 *
 * **Be aware that it is not usually valid for a developer to call this method on a TreeStore.**
 *
 * TreeStore loads are triggered by a load request from an existing {@link Ext.data.NodeInterface tree node},
 * when the node is expanding, and it has no locally defined children in its data.
 *
 * *Note:* Even for synchronous Proxy types such as {@link Ext.data.proxy.Memory memory proxy},
 * the result will *NOT* be available in the following line of code. You must use a callback
 * in the load options, or a {@link #event-load load listener}.
 *
 * @param {Object} [options] This is passed into the {@link Ext.data.operation.Operation Operation}
 * object that is created and then sent to the proxy's {@link Ext.data.proxy.Proxy#read} function.
 * The options can also contain a node, which indicates which node is to be loaded. If not specified, it will
 * default to the root node.
 * @param {Ext.data.NodeInterface} [options.node] The tree node to load. Defaults to the store's {@link #cfg-root root node}
 * @param {Function} [options.callback] A function which is called when the response arrives.
 * @param {Ext.data.Model[]} options.callback.records Array of records.
 * @param {Ext.data.operation.Operation} options.callback.operation The Operation itself.
 * @param {Boolean} options.callback.success `true` when operation completed successfully.
 * @method load
 */

/**
 * @method reload
 * Reloads the root node of this store.
 */

/**
 * @method flushLoad
 * Called when the event handler which called the {@link #method-load} method exits.
 */

/**
 * @method isVisible
 * @inheritdoc Ext.data.NodeStore#isVisible
 */

/**
 * @event load
 * Fires whenever the store reads data from a remote data source.
 * @param {Ext.data.TreeStore} this
 * @param {Ext.data.TreeModel[]} records An array of records.
 * @param {Boolean} successful True if the operation was successful.
 * @param {Ext.data.Operation} operation The operation that triggered this load.
 * @param {Ext.data.NodeInterface} node The node that was loaded.
 */
