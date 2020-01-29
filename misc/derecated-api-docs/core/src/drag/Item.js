/**
 * @class Ext.drag.Item
 * @extend Ext.Base
 * @mixins Ext.mixin.Observable
 * @mixins Ext.mixin.Identifiable
 *
 * A base class for draggable and droppable items that wrap a DOM element.
 *
 * @abstract
 */

/**
 * @cfg {Boolean} [autoDestroy=true]
 * `true` to destroy the {@link #element} when this item is destroyed.
 * @accessor
 */

/**
 * @cfg {String/HTMLElement/Ext.dom.Element} [element=null]
 * The id, dom or Element reference for this item.
 * @accessor
 */

/**
 * @cfg {String/String[]} [groups=null]
 * A group controls which {@link Ext.drag.Source sources} and {@link Ext.drag.Target} targets
 * can interact with each other. Only items that have the same (or intersecting) groups will
 * react to each other. Items with no groups will be in the default pool.
 * @accessor
 */

/**
 * @method isDisabled
 * Checks whether this item is currently disabled.
 * @return {Boolean} `true` if this item is disabled.
 */

/**
 * @method disable
 * Disable the current item to disallow it from participating
 * in drag/drop operations.
 */


/**
 * @method enable
 * Enable the current item to allow it to participate in
 * drag/drop operations.
 */
