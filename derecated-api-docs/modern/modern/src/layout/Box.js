/**
 * @class Ext.layout.Box
 * @extend Ext.layout.Auto
 * @alias layout.box
 *
 * Box is a superclass for the two box layouts:
 *
 * * {@link Ext.layout.HBox hbox}
 * * {@link Ext.layout.VBox vbox}
 *
 * Box itself is never used directly, but its subclasses provide flexible arrangement of child components
 * inside a {@link Ext.Container Container}.
 *
 * ## Horizontal Box
 *
 * HBox allows you to easily lay out child components horizontally. It can size items based on a fixed width or a
 * fraction of the total width available, enabling you to achieve flexible layouts that expand or contract to fill the
 * space available.
 *
 * See the {@link Ext.layout.HBox HBox layout docs} for more information on using hboxes.
 *
 * ## Vertical Box
 *
 * VBox allows you to easily lay out child components vertically. It can size items based on a fixed height or a
 * fraction of the total height available, enabling you to achieve flexible layouts that expand or contract to fill the
 * space available.
 *
 * See the {@link Ext.layout.VBox VBox layout docs} for more information on using vboxes.
 */

/**
 * @cfg {String} [orient='horizontal']
 * @accessor
 */

/**
 * @cfg {String} [align='stretch']
 * Controls how the child items of the container are aligned. Acceptable configuration values for this property are:
 *
 * - ** start ** : child items are packed together at left side of container
 * - ** center ** : child items are packed together at mid-width of container
 * - ** end ** : child items are packed together at right side of container
 * - **stretch** : child items are stretched vertically to fill the height of the container
 *
 * @accessor
 */

/**
 * @cfg {Boolean} [constrainAlign=false]
 * Limits the size of {@link #align aligned} components to the size of the container.
 *
 * In order for this option to work in Safari, the container must have
 * {@link Ext.Container#percentageSizedItems percentageSizedItems} set to `true`.
 * @accessor
 */

/**
 * @cfg {String} [pack='start']
 * Controls how the child items of the container are packed together. Acceptable configuration values
 * for this property are:
 *
 * - ** start ** : child items are packed together at left side of container
 * - ** center ** : child items are packed together at mid-width of container
 * - ** end ** : child items are packed together at right side of container
 * - ** space-between ** : child items are distributed evenly with the first
 * item at the start and the last item at the end
 * - ** space-around ** : child items are distributed evenly with equal space
 * around them
 * - ** justify ** : behaves the same as `space-between` for backward compatibility.
 * @accessor
 */

/**
 * @cfg {Boolean} [vertical=false]
 * `true` to layout items vertically, otherwise horizontally.
 * @accessor
 * @since 6.2.0
 */

/**
 * @cfg {Boolean} [reverse=false]
 * `true` to reverse the natural layout direction.
 * - When vertical, items are laid out bottom to top.
 * - When horizontal (assuming LTR), items are laid out right to left.
 * @accessor
 * @since 6.5.0
 */
