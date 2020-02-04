/**
 * @class Ext.panel.Resizer
 * @extend Ext.Base
 * This class allows a {@link Ext.Panel Panel} to be resized via user interaction.
 * It can be used on floating panels, or as a splitter between two panels.
 *
 * @since 6.5.0
 */

/**
 * @cfg {Boolean} [constrainToParent=true]
 * `true` to constrain the dragging operation to the parent
 * of the {@link #cfg-target}.
 * @accessor
 */

/**
 * @cfg {Boolean} [dynamic=false]
 * `true` to live resize the {@link #cfg-target}. `false` to create
 * a proxy indicator to represent the drag operation.
 * @accessor
 */

/**
 * @cfg {String/String[]} edges
 * The draggable edges. These can be specified as a string separated by ' ' or ','. The
 * values for the edges should be direction coordinates (or the shortcut). Possible values are:
 *
 * - `'north'`, or `'n'`
 * - `'northeast'`, or `'ne'`
 * - `'east'`, or `'e'`
 * - `'southeast'`, or `'se'`
 * - `'south'`, or `'s'`
 * - `'southwest'`, or `'sw'`
 * - `'west'`, or `'w'`
 * - `'northwest'`, or `'nw'`
 * - `'all'`, a shortcut for all edges
 *
 * Examples:
 * - `['n', 'e', 's', 'w']`,
 * - `'e,se,s'`
 * - `'e se s'`,
 * - `'northeast southeast southwest northwest'`
 * @accessor
 */

/**
 * @cfg {Number/Number[]} maxSize
 * The maximum width and height for this resizer. If specified as a number,
 * the value applies for both width and height. Otherwise,
 * - `[100, null]`, constrain only the width
 * - `[null, 100]`, constrain only the height
 * - `[200, 300]`, constrain both.
 *
 * **Note** If a {@link Ext.Component#cfg-maxWidth maxWidth} or {@link #Ext.Component#cfg-maxHeight maxHeight}
 * is specified, it will take precedence.
 * @accessor
 */

/**
 * @cfg {Number/Number[]} minSize
 * The minimum width and height for this resizer. If specified as a number,
 * the value applies for both width and height. Otherwise,
 * - `[100, null]`, constrain only the width
 * - `[null, 100]`, constrain only the height
 * - `[200, 300]`, constrain both.
 *
 * **Note** If a {@link Ext.Component#cfg-minWidth minWidth} or {@link #Ext.Component#cfg-minHeight minHeight}
 * is specified, it will take precedence.
 * @accessor
 */

/**
 * {@cfg} {Boolean} [preserveRatio=false]
 * `true` to preserve the current aspect ratio of the component while dragging.
 * @accessor
 */

/**
 * @cfg {Number/Number[]} snap
 * The interval to move during a resize. If specified as a number,
 * the value applies for both width and height. Otherwise,
 * - `[100, null]`, snap only the width
 * - `[null, 100]`, snap only the height
 * - `[200, 300]`, snap both.
 * @accessor
 */

/**
 * @cfg {Boolean} [split=false]
 * `true` to operate in splitter mode, which is typically used for {@link Ext.Component#cfg-docked docked} items or
 * items in a {@link Ext.layout.Box box layout}. `false` to operate in handle mode, which is often used for floating
 * items.
 * @accessor
 */
