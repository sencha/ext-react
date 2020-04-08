/**
 * @class Ext.d3.hierarchy.Hierarchy
 * @extend Ext.d3.svg.Svg
 * Abstract class for D3 components using
 * [Hierarchy Layout](https://github.com/d3/d3-hierarchy).
 * The Hierarchy component uses the root {@link Ext.data.TreeModel node} of a bound
 * {@link Ext.data.NodeStore node store} to compute positions of all nodes,
 * as well as objects representing the links from parent to child for each node.
 *
 * Each node is a `d3.hierarchy` instance. Several attributes are populated on each node:
 * - `data` - the Ext.data.TreeModel instance associated with the node.
 * - `parent` - the parent node, or null for the root.
 * - `children` - the array of child nodes, or null for leaf nodes.
 * - `value` - the node value, as returned by the value accessor.
 * - `depth` - the depth of the node, starting at 0 for the root.
 * - `x` - the minimum x-coordinate of the node position.
 * - `y` - the minimum y-coordinate of the node position.
 *
 * Each link is an object with two attributes:
 * - `source` - the parent node.
 * - `target` - the child node.
 *
 * The class also provides an ability to color code each node with the
 * {@link Ext.d3.axis.Color}.
 */

/**
 * The class name added to all hierarchy components (subclasses).
 * See also {@link #componentCls}.
 * @cfg {String} [hierarchyCls='hierarchy']
 * @accessor
 */

/**
 * The selected record. Typically used with {@link #bind binding}.
 * @cfg {Ext.data.TreeModel} [selection=null]
 * @accessor
 */

/**
 * A {@link Ext.d3.axis.Color} config or an instance.
 * By default (if no 'colorAxis' config is given) all nodes
 * are assigned a unique color from the `d3.scale.category20c`
 * scale (until the colors run out, then we start to reuse them)
 * based on the value of the `name` field.
 * @cfg {Ext.d3.axis.Color} colorAxis
 * @accessor
 */

/**
 * [Children](https://github.com/d3/d3-hierarchy/#hierarchy) accessor function.
 * Defaults to returning node's {@link Ext.data.NodeInterface#childNodes child nodes},
 * if the node is {@link Ext.data.NodeInterface#expanded expanded} or null otherwise
 * (meaning children of collapsed nodes are not rendered).
 * @cfg {Function} nodeChildren
 * @param {Ext.data.TreeModel} record An instance of the TreeModel class.
 * @return {Ext.data.TreeModel[]}
 * @accessor
 */

/**
 * A function that updates class attributes of a given selection.
 * By default adds the following classes to node elements:
 * - `x-d3-parent` - if a node is a parent node;
 * - `x-d3-leaf` - if a node is a leaf node;
 * - `x-d3-expanded` - if a node is expanded;
 * - `x-d3-root` - if a node is the root node (represents the root of the store);
 * - `x-d3-layout-root` - if a node is the root node of the current layout.
 * @cfg {Function} nodeClass
 * @param {d3.selection} selection
 * @accessor
 */

/**
 * A function that returns a text string, given a component and  node (d3.hierarchy) instance.
 * Alternatively, can be a field name or an array of field names used to fetch the text.
 * If array of field names is given, the first non-empty string will be used.
 * A node holds a reference to the {@link Ext.data.TreeModel} instance
 * in its `data` field.
 * For example, to return the value of the record's field `name` as node's text
 * the following function can be used:
 *
 *     nodeText: function (component, node) {
 *         var record = node.data,
 *             text = record.get('name');
 *
 *         return text;
 *     }
 *
 * Or simply:
 *
 *     nodeText: 'name'
 *
 * To return the value of the `title` field, if the `name` field is empty:
 *
 *     nodeText: ['name', 'title']
 *
 * @cfg {Function/String/String[]} nodeText
 * @param {Ext.d3.hierarchy.Hierarchy} component
 * @param {d3.hierarchy} node
 * @return {String}
 * @accessor
 */

/**
 * @cfg {Function/String/Number} [nodeValue=1]
 * [The function](https://github.com/d3/d3-hierarchy#node_sum) that receives
 * the node's data (tree store record) and returns the numeric value of the node.
 * This config can also be a field name or a number, in which case it will be
 * converted to a function that returns the value of the specified field,
 * or a function that returns the given number for all nodes.
 * Note: {@link #nodeChildren} does not have effect on this config, even
 * though only expanded nodes will render by default, the `nodeValue`
 * function will be called for all nodes.
 * @param {Ext.data.TreeModel} record The data of the node (store record).
 * @return {Number} Numeric value of the node used to calculate its area.
 * @accessor
 */

/**
 * @cfg {Boolean} [noParentValue=false]
 * If `true` the {@link #nodeValue} function will not be called for parent nodes,
 * instead they'll get a value of zero.
 * The {@link #nodeChildren} function is used to determine if a node is a parent.
 * @accessor
 */

/**
 * The [key](https://github.com/d3/d3-selection/#selection_data) function for nodes.
 * Returns the 'id' of the node's {@link Ext.data.TreeModel data} by default.
 * @cfg {Function} nodeKey
 * @param {d3.hierarchy} node
 * @param {Number} index
 * @return {*}
 * @accessor
 */

/**
 * The [key](https://github.com/d3/d3-selection/#selection_data) function for links.
 * Returns the 'id' of the link's target {@link Ext.data.TreeModel data} by default.
 * @cfg {Function} linkKey
 * @param {Object} link
 * @param {d3.hierarchy} link.source
 * @param {d3.hierarchy} link.target
 * @param {Number} index
 * @return {*}
 * @accessor
 */

/**
 * The select event(s) to listen for on each node.
 * The node in question will be selected,
 * selection will be removed from the previously selected node.
 * The select event won't be handled when Ctrl/Cmd is pressed.
 * For example, this allows to expand a node by double-clicking
 * without selecting it.
 * `false` can be used to prevent listening for the default event.
 * @cfg {String/String[]/false} [selectEventName='click']
 * @accessor
 */

/**
 * The expand event(s) to listen for on each node.
 * The node in question will be expanded, if collapsed,
 * or collapsed, if expanded.
 * `false` can be used to prevent listening for the default event.
 * @cfg {String/String[]/false} [expandEventName='dblclick']
 * @accessor
 */

/**
 * @cfg {Boolean} [rootVisible=true]
 * False to hide the root node.
 * @accessor
 */

/**
 * @property layoutTransition
 * The current layout transition.
 * Only active for its duration from the time of the `renderScene` call.
 */
