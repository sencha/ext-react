/**
 * @class Ext.d3.interaction.Abstract
 * @extend Ext.Base
 *
 * Defines a common abstract parent class for all D3 interactions.
 */

/**
 * @cfg {Ext.d3.Component} [component=null]
 * The interaction will listen for gestures on this component's element.
 * @accessor
 */

/**
 * @cfg {Object} [gestures=null]
 * Maps gestures that should be used for starting/maintaining/ending
 * the interaction to corresponding class methods. For example:
 *
 *     gestures: {
 *         tap: 'onGesture'
 *     }
 *
 * It is also possible to override the default getter for the `gestures`
 * config, that will derive gestures to be used based on other configs' values.
 * For example, a subclass can define:
 *
 *     getGestures: function () {
 *         var someConfig = this.getSomeConfig(),
 *             gestures = {};
 *
 *         gestures[someConfig.gesture] = 'onGesture';
 *
 *         return gestures;
 *     }
 * @accessor
 */

/**
 * @cfg {Boolean} [enabled=true] `true` if the interaction is enabled.
 * @accessor
 */
