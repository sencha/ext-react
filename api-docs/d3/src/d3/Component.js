/**
 * @class Ext.d3.Component
 * @extend Ext.d3.ComponentBase
 * Abstract class for D3 Components: {@link Ext.d3.canvas.Canvas} and {@link Ext.d3.svg.Svg}.
 *
 * Notes:
 *
 * Unlike the Charts package with its Draw layer, the D3 package does not provide
 * an abstraction layer and the user is expected to deal with the SVG and Canvas
 * directly.
 *
 * D3 package supports IE starting from version 9, as neither Canvas nor SVG
 * are supported by prior IE versions.
 */

/**
 * The store with data to render.
 * @cfg {Ext.data.Store} [store=null]
 * @accessor
 */

/**
 * @cfg {String} [componentCls='']
 * The CSS class used by a subclass of the D3 Component.
 * Normally, the lower-cased name of a subclass.
 *
 * @accessor
 */

/**
 * @cfg {Array} [interactions=[]]
 * The list of interaction configs for this D3 component.
 * D3 package interactions are very similar to native D3 behaviors.
 * However, D3 behaviors, as well as event system, is incompatible
 * with ExtJS event system. D3 package interactions may also support
 * certain features that D3 behaviors lack, like like kinetic scrolling,
 * elastic borders and scroll indicators (see the {@link Ext.d3.interaction.PanZoom panzoom}
 * interaction for more information).
 * @accessor
 */

/**
 * @cfg {Object} transitions
 * A map of transition configs. For example:
 *
 *     transitions: {
 *         select: {
 *             duration: 500,
 *             ease: 'cubicInOut'
 *         },
 *         zoom: {
 *             name: 'zoom',
 *             duration: 1000
 *         },
 *         ...
 *     }
 *
 * A class would define the defaults for its transitions, and a user only needs
 * to set the `transitions` config of an instance to disable a transition, e.g.:
 *
 *     transitions: {
 *         // transitions are enabled by default, `true` should never be used here
 *         select: false
 *     }
 *
 * or alter its config:
 *
 *     transitions: {
 *         select: {
 *             // the `duration` stays the same,
 *             // only the easing function is altered
 *             ease: 'bounceOut'
 *         }
 *     }
 *
 * The transitions defined this way are merely configs. To create an actual transition
 * from one of these configs, use the {@link #createTransition} method. For example:
 *
 *     this.createTransition('select')
 *
 * A transition object can optionally specify a name, if it's different from
 * the key in the `transitions` config. For example:
 *
 *     transitions: {
 *         layout: {
 *             name: 'foo',
 *             duration: 500
 *         }
 *     }
 *
 * Otherwise the name will be set automatically, for example:
 *
 *     transition.name = this.getId() + '-' + key
 *
 * Transition names (whether explicitly given or not) are prefixed by component ID
 * to prevent transitions with the same name but on a different component from
 * cancelling each other out.
 *
 * However, transitions with the same name on the same component will still cancel
 * each other out, if created via {@link #createTransition} on the same selection
 * or with no selection provided.
 *
 * `duration`, `ease` and `name` properties of transition objects in this config
 * are reserved, and will be used to configure a `d3.transition` instance.
 * However, transition objects may also have other properties that are related to
 * this transition. For example:
 *
 *     transitions: {
 *         select: {
 *             duration: 500,
 *             ease: 'cubicInOut',
 *             targetScale: 1.1
 *         }
 *     }
 *
 * The `targetScale` property here won't be consumed by a `d3.transition` instance;
 * instead a component can make use of it in whichever way it sees fit to animate
 * the selected element.
 * @accessor
 */
