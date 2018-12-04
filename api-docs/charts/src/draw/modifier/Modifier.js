/**
 * @class Ext.draw.modifier.Modifier
 * @extend Ext.Base
 *
 * Each sprite has a stack of modifiers. The resulting attributes of sprite is
 * the content of the stack top. When setting attributes to a sprite,
 * changes will be pushed-down though the stack of modifiers and pop-back the
 * additive changes; When modifier is triggered to change the attribute of a
 * sprite, it will pop-up the changes to the top.
 */

/**
 * @cfg {Ext.draw.sprite.Sprite} [sprite=null]
 * The sprite to which the modifier belongs.
 * @accessor
 */
