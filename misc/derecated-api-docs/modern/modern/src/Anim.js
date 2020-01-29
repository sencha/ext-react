/**
 * @class Ext.Anim
 * Ext.Anim is used to execute simple animations defined in {@link Ext.anims}. The {@link #run} method can take any of the
 * properties defined below.
 *
 *     Ext.Anim.run(this, 'fade', {
 *         out: false,
 *         autoClear: true
 *     });
 *
 * When using {@link Ext.Anim#run}, ensure you require {@link Ext.Anim} in your application. Either do this using {@link Ext#require}:
 *
 *     Ext.requires('Ext.Anim');
 *
 * when using {@link Ext#setup}:
 *
 *     Ext.setup({
 *         requires: ['Ext.Anim'],
 *         onReady: function() {
 *             //do something
 *         }
 *     });
 *
 * or when using {@link Ext#application}:
 *
 *     Ext.application({
 *         requires: ['Ext.Anim'],
 *         launch: function() {
 *             //do something
 *         }
 *     });
 *
 * @singleton
 */

/**
 * @cfg {Boolean} [disableAnimations=false]
 * `true` to disable animations.
 */

/**
 * @cfg {Object} from
 * An object of CSS values which the animation begins with. If you define a CSS property here, you must also
 * define it in the {@link #to} config.
 */

/**
 * @cfg {Object} to
 * An object of CSS values which the animation ends with. If you define a CSS property here, you must also
 * define it in the {@link #from} config.
 */

/**
 * @cfg {Number} [duration=250]
 * Time in milliseconds for the animation to last.
 */

/**
 * @cfg {Number} [delay=0] Time to delay before starting the animation.
 */

/**
 * @cfg {String} [easing="ease-in-out"]
 * Valid values are 'ease', 'linear', ease-in', 'ease-out', 'ease-in-out', or a cubic-bezier curve as defined by CSS.
 */

/**
 * @cfg {Boolean} [autoClear=true]
 * `true` to remove all custom CSS defined in the {@link #to} config when the animation is over.
 */

/**
 * @cfg {Boolean} [out=true]
 * `true` if you want the animation to slide out of the screen.
 */

/**
 * @cfg {String} direction
 * Valid values are: 'left', 'right', 'up', 'down', and `null`.
 */

/**
 * @cfg {Boolean} [reverse=false]
 * `true` to reverse the animation direction. For example, if the animation direction was set to 'left', it would
 * then use 'right'.
 */

/**
 * @cfg {Function} before
 * Code to execute before starting the animation.
 */

/**
 * @cfg {Function} after
 * Code to execute after the animation ends.
 */

/**
 * @cfg {Object} scope
 * Scope to run the {@link #before} function in.
 */

/**
 * Used to run an animation on a specific element. Use the config argument to customize the animation.
 * @param {Ext.Element/HTMLElement} el The element to animate.
 * @param {String} anim The animation type, defined in {@link Ext.anims}.
 * @param {Object} config The config object for the animation.
 * @method run
 */

/**
 * @class Ext.anims
 * Defines different types of animations.
 *
 * __Note:__ _flip_, _cube_, and _wipe_ animations do not work on Android.
 *
 * Please refer to {@link Ext.Anim} on how to use animations.
 * @singleton
 */

/**
 * @property fade
 * Fade Animation
 */

/**
 * @property slide
 * Slide Animation
 */

/**
 * @property pop
 * Pop Animation
 */

/**
 * @property flip
 * Flip Animation
 */

/**
 * @property cube
 * Cube Animation
 */

/**
 * @property wipe
 * Wipe Animation.
 * Because of the amount of calculations involved, this animation is best used on small display
 * changes or specifically for phone environments. Does not currently accept any parameters.
 */

/**
 * @property raw
 * Raw Animation.
 * Best used when the other types do not suite your needs. Set `from` and `to` as needed.
 */
