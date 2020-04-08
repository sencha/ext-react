/**
 * @class Ext.field.trigger.Menu
 * @extend Ext.field.trigger.Trigger
 * @xtype menutrigger
 * @alias trigger.menu
 * A field trigger that can show a menu aligned to this trigger.
 */

/**
 * @cfg {String} [menuAlign="tl-bl?"]
 * The position to align the menu to (see {@link Ext.util.Positionable#alignTo} for more details).
 */

/**
 * @cfg {Boolean} [destroyMenu=true]
 * Whether or not to destroy any associated menu when this trigger is destroyed.
 * In addition, a value of `true` for this config will destroy the currently bound menu
 * when a new menu is set in {@link #setMenu} unless overridden by that method's destroyMenu
 * function argument.
 */

/**
 * @cfg {Ext.menu.Menu/String/Object} menu
 * A menu or menu configuration. This can be a reference to a menu instance, a menu
 * config object or the `xtype` alias of a {@link Ext.menu.Menu menu}-derived class.
 * @accessor
 */
