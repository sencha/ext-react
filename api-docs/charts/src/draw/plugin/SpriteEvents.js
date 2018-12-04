/**
 * @class Ext.draw.plugin.SpriteEvents
 * @extend Ext.plugin.Abstract
 * @alias plugin.spriteevents
 *
 * A draw container {@link Ext.AbstractPlugin plugin} that adds ability to listen
 * to sprite events. For example:
 *
 *     var drawContainer = Ext.create('Ext.draw.Container', {
 *          plugins: ['spriteevents'],
 *          renderTo: Ext.getBody(),
 *          width: 200,
 *          height: 200,
 *          sprites: [{
 *               type: 'circle',
 *               fillStyle: '#79BB3F',
 *               r: 50,
 *               x: 100,
 *               y: 100
 *          }],
 *          listeners: {
 *              spriteclick: function (item, event) {
 *                  var sprite = item && item.sprite;
 *                  if (sprite) {
 *                      sprite.setAttributes({fillStyle: 'red'});
 *                      sprite.getSurface().renderFrame();
 *                  }
 *              }
 *          }
 *     });
 */

/**
 * @event spritemousemove
 * Fires when the mouse is moved on a sprite.
 * @param {Object} sprite
 * @param {Event} event
 */

/**
 * @event spritemouseup
 * Fires when a mouseup event occurs on a sprite.
 * @param {Object} sprite
 * @param {Event} event
 */

/**
 * @event spritemousedown
 * Fires when a mousedown event occurs on a sprite.
 * @param {Object} sprite
 * @param {Event} event
 */

/**
 * @event spritemouseover
 * Fires when the mouse enters a sprite.
 * @param {Object} sprite
 * @param {Event} event
 */

/**
 * @event spritemouseout
 * Fires when the mouse exits a sprite.
 * @param {Object} sprite
 * @param {Event} event
 */

/**
 * @event spriteclick
 * Fires when a click event occurs on a sprite.
 * @param {Object} sprite
 * @param {Event} event
 */

/**
 * @event spritedblclick
 * Fires when a double click event occurs on a sprite.
 * @param {Object} sprite
 * @param {Event} event
 */

/**
 * @event spritetap
 * Fires when a tap event occurs on a sprite.
 * @param {Object} sprite
 * @param {Event} event
 */
