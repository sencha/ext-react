/**
 * @class Ext.util.Draggable
 * @mixin Ext.mixin.Observable
 * A core util class to bring Draggable behavior to a Component. This class is specifically designed only for
 * absolutely positioned elements starting from top: 0, left: 0. The initialOffset can then be set via configuration
 * to have the elements in a different position.
 * @deprecated 6.5.0 This class has been replaced by `Ext.drag.Source`.
 */

/**
 * @event dragstart
 * @preventable
 * Fires whenever the component starts to be dragged
 * @param {Ext.util.Draggable} this
 * @param {Ext.event.Event} e the event object
 * @param {Number} offsetX The current offset value on the x axis
 * @param {Number} offsetY The current offset value on the y axis
 */

/**
 * @event drag
 * Fires whenever the component is dragged
 * @param {Ext.util.Draggable} this
 * @param {Ext.event.Event} e the event object
 * @param {Number} offsetX The new offset value on the x axis
 * @param {Number} offsetY The new offset value on the y axis
 */

/**
 * @event dragend
 * Fires whenever the component is dragged
 * @param {Ext.util.Draggable} this
 * @param {Ext.event.Event} e the event object
 * @param {Number} offsetX The current offset value on the x axis
 * @param {Number} offsetY The current offset value on the y axis
 */

/**
 * @cfg {String} [direction="both"]
 * Possible values: 'vertical', 'horizontal', or 'both'
 * @accessor
 */

/**
 * @cfg {Object/Number} initialOffset
 * The initial draggable offset.  When specified as Number,
 * both x and y will be set to that value.
 * @accessor
 */

/**
 * @cfg {Ext.Component} component
 * The component being dragged.
 * @accessor
 */
