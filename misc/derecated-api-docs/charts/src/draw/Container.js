/**
 * @class Ext.draw.Container
 * @extend Ext.draw.ContainerBase
 * @xtype draw
 * The container that holds and manages instances of the {@link Ext.draw.Surface}
 * in which {@link Ext.draw.sprite.Sprite sprites} are rendered.  Draw containers are
 * used as the foundation for all of the chart classes but may also be created directly
 * in order to create custom drawings.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Panel, Draw, Toolbar, Button, Spacer, Label } from '@sencha/ext-react-modern';
 *
 *     export default class DrawExample extends Component {
 *
 *         componentDidMount() {
 *             this.refs.draw.on({
 *                 element: 'element',
 *                 mousedown: this.onMouseDown,
 *                 mousemove: this.onMouseMove,
 *                 mouseup: this.onMouseUp,
 *                 mouseleave: this.onMouseUp
 *             });
 *         }
 *
 *         clear = () => {
 *             const { draw } = this.refs;
 *             draw.getSurface().destroy();
 *             draw.getSurface('overlay').destroy();
 *             draw.renderFrame();
 *         }
 *
 *         onMouseDown = (e) => {
 *             let { draw } = this.refs,
 *                 surface = draw.getSurface(),
 *                 xy, x, y;
 *
 *             if (!draw.sprite) {
 *                 xy = surface.getEventXY(e);
 *                 x = xy[0];
 *                 y = xy[1];
 *
 *                 draw.list = [x, y, x, y];
 *                 draw.lastEventX = x;
 *                 draw.lastEventY = y;
 *
 *                 draw.sprite = surface.add({
 *                     type: 'path',
 *                     path: ['M', draw.list[0], draw.list[1], 'L', draw.list[0] + 1e-1, draw.list[1] + 1e-1],
 *                     lineWidth: 30 * Math.random() + 10,
 *                     lineCap: 'round',
 *                     lineJoin: 'round',
 *                     strokeStyle: new Ext.util.Color(Math.random() * 127 + 128, Math.random() * 127 + 128, Math.random() * 127 + 128)
 *                 });
 *
 *                 surface.renderFrame();
 *             }
 *         }
 *
 *         onMouseMove = (e) => {
 *             let { draw } = this.refs,
 *                 surface = draw.getSurface(),
 *                 path, xy, x, y, dx, dy, D;
 *
 *             if (draw.sprite) {
 *                 xy = surface.getEventXY(e);
 *                 x = xy[0];
 *                 y = xy[1];
 *                 dx = draw.lastEventX - x;
 *                 dy = draw.lastEventY - y;
 *                 D = 10;
 *
 *                 if (dx * dx + dy * dy < D * D) {
 *                     draw.list.length -= 2;
 *                     draw.list.push(x, y);
 *                 } else {
 *                     draw.list.length -= 2;
 *                     draw.list.push(draw.lastEventX = x, draw.lastEventY = y);
 *                     draw.list.push(draw.lastEventX + 1, draw.lastEventY + 1);
 *                 }
 *
 *                 path = smoothList(draw.list);
 *
 *                 draw.sprite.setAttributes({
 *                     path: path
 *                 });
 *
 *                 if (Ext.os.is.Android) {
 *                     Ext.draw.Animator.schedule(() => surface.renderFrame(), draw);
 *                 } else {
 *                     surface.renderFrame();
 *                 }
 *             }
 *         }
 *
 *         onMouseUp = (e) => {
 *             this.refs.draw.sprite = null;
 *         }
 *
 *         onResize = () => {
 *             const { draw } = this.refs;
 *             const size = draw.element.getSize();
 *             draw.getSurface().setRect([0, 0, size.width, size.height]);
 *             draw.renderFrame();
 *         }
 *
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Panel shadow layout="fit">
 *                         <Toolbar docked="top">
 *                             <div style={{fontSize: Ext.os.is.Phone ? '12px' : '14px'}}>Use your {Ext.supports.Touch ? 'finger' : 'mouse'} to paint on the surface below.</div>
 *                             <Spacer/>
 *                             <Button handler={this.clear} text="Clear"/>
 *                         </Toolbar>
 *                         <Draw ref="draw"/>
 *                     </Panel>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 *
 *     function smoothList(points) {
 *         if (points.length < 3) {
 *             return ['M', points[0], points[1]];
 *         }
 *
 *         var dx = [], dy = [], result = ['M'],
 *             i, ln = points.length;
 *
 *         for (i = 0; i < ln; i += 2) {
 *             dx.push(points[i]);
 *             dy.push(points[i + 1]);
 *         }
 *
 *         dx = Ext.draw.Draw.spline(dx);
 *         dy = Ext.draw.Draw.spline(dy);
 *         result.push(dx[0], dy[0], 'C');
 *
 *         for (i = 1, ln = dx.length; i < ln; i++) {
 *             result.push(dx[i], dy[i]);
 *         }
 *
 *         return result;
 *     }
 */

/**
 * @cfg {String} [engine="Ext.draw.engine.Canvas"]
 * Defines the engine (type of surface) used to render draw container contents.
 *
 * The render engine is selected automatically depending on the platform used. Priority
 * is given to the {@link Ext.draw.engine.Canvas} engine due to its performance advantage.
 *
 * You may also set the engine config to be `Ext.draw.engine.Svg` if so desired.
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

/**
 * @event bodyresize
 * Fires when the size of the draw container body changes.
 * @param {Object} size The object containing 'width' and 'height' of the draw container's body.
 */

/**
 * @cfg {Function} [resizeHandler=null]
 * The resize function that can be configured to have a behavior,
 * e.g. resize draw surfaces based on new draw container dimensions.
 * The `resizeHandler` function takes a single parameter -
 * the size object with `width` and `height` properties.
 *
 * __Note:__ since resize events trigger {@link #renderFrame} calls automatically,
 * return `false` from the resize function, if it also calls `renderFrame`,
 * to prevent double rendering.
 * @accessor
 */

/**
 * @cfg {Object[]} [sprites=null]
 * Defines a set of sprites to be added to the drawContainer surface.
 *
 * For example:
 *
 *      sprites: [{
 *           type: 'circle',
 *           fillStyle: '#79BB3F',
 *           r: 100,
 *           x: 100,
 *           y: 100
 *      }]
 *
 * @accessor
 */

/**
 * @cfg {Object[]} [gradients=[]]
 * Defines a set of gradients that can be used as color properties
 * (fillStyle and strokeStyle, but not shadowColor) in sprites.
 * The gradients array is an array of objects with the following properties:
 * - **id** - string - The unique name of the gradient.
 * - **type** - string, optional - The type of the gradient. Available types are: 'linear', 'radial'. Defaults to 'linear'.
 * - **angle** - number, optional - The angle of the gradient in degrees.
 * - **stops** - array - An array of objects with 'color' and 'offset' properties, where 'offset' is a real number from 0 to 1.
 *
 * For example:
 *
 *     gradients: [{
 *         id: 'gradientId1',
 *         type: 'linear',
 *         angle: 45,
 *         stops: [{
 *             offset: 0,
 *             color: 'red'
 *         }, {
 *            offset: 1,
 *            color: 'yellow'
 *         }]
 *     }, {
 *        id: 'gradientId2',
 *        type: 'radial',
 *        stops: [{
 *            offset: 0,
 *            color: '#555',
 *        }, {
 *            offset: 1,
 *            color: '#ddd',
 *        }]
 *     }]
 *
 * Then the sprites can use 'gradientId1' and 'gradientId2' by setting the color attributes to those ids, for example:
 *
 *     sprite.setAttributes({
 *         fillStyle: 'url(#gradientId1)',
 *         strokeStyle: 'url(#gradientId2)'
 *     });
 *
 * @accessor
 */

/**
 * @cfg {String} downloadServerUrl
 * The default URL used by the {@link #download} method.
 * @accessor
 */
