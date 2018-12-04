/**
 * @class Ext.d3.axis.Axis
 * @extend Ext.Base
 *
 * The d3.svg.axis component is used to display reference lines for D3 scales.
 * A thin wrapper around the d3.axis* and d3.scale* with an added ability to display
 * an axis title in the user specified position. This allows to configure axes declaratively
 * in any Ext component that uses them, instead of using D3's method chaining, which
 * would look quite alien in Ext views, as well as pose some technical and interoperability
 * issues (e.g. dependency management issues when views declared with Ext.define reference
 * `d3` directly).
 *
 * Note that this is a thin wrapper around the native D3 axis and scale, so when
 * any changes are applied directly to those D3 entities, for example
 * `ExtD3Axis.getScale().domain([30, 40])`, this class won't be nofied about such changes.
 * So it's up to the developer to account for them, like rerendering the axis `ExtD3Axis.render()`
 * or making sure that "nice" segmentation is preserved by chaining a call to `nice` after the
 * domain is set, e.g. `ExtD3Axis.getScale().domain([30, 40]).nice()`.
 *
 * The axis is designed to work with the {@link Ext.d3.svg.Svg} component.
 */

/**
 * @cfg {Object} axis
 * A config object to create a `d3.axis*` instance from.
 * A property name should represent an actual `d3.axis*` method,
 * while its value should represent method's parameter(s). In case a method takes multiple
 * parameters, the property name should be prefixed with the dollar sign, and the property
 * value should be an array of parameters. Additionally, the values should not reference
 * the global `d3` variable, as the `d3` dependency is unlikely to be loaded at the time
 * of component definition. So a value such as `d3.timeDay` should be made a string
 * `'d3.timeDay'` that does not have any dependencies and will be evaluated at a later time,
 * when `d3` is already loaded.
 * For example, this
 *
 *     d3.axisBottom().tickFormat(d3.timeFormat('%b %d'));
 *
 * is equivalent to this:
 *
 *     {
 *         orient: 'bottom',
 *         tickFormat: "d3.timeFormat('%b %d')"
 *     }
 *
 * Please see the D3's [SVG Axes](https://github.com/d3/d3-3.x-api-reference/blob/master/SVG-Axes.md)
 * documentation for more details.
 * @accessor
 */

/**
 * @cfg {Object} scale
 * A config object to create a `d3.scale*` instance from.
 * A property name should represent an actual `d3.scale*` method,
 * while its value should repsent method's parameter(s). In case a method takes multiple
 * parameters, the property name should be prefixed with the dollar sign, and the property
 * value should be an array of parameters. Additionally, the values should not reference
 * the global `d3` variable, as the `d3` dependency is unlikely to be loaded at the time
 * of component definition. So a value such as `d3.range(0, 100, 20)` should be made a string
 * `'d3.range(0, 100, 20)'` that does not have any dependencies and will be evaluated at a later time,
 * when `d3` is already loaded.
 * For example, this
 *
 *     d3.scaleLinear().range(d3.range(0, 100, 20));
 *
 * is equivalent to this:
 *
 *     {
 *         type: 'linear',
 *         range: 'd3.range(0, 100, 20)'
 *     }
 *
 * Please see the D3's [Scales](https://github.com/d3/d3-scale)
 * documentation for more details.
 * @accessor
 */

/**
 * @cfg {Object} [title=null]
 * @cfg {String} title.text Axis title text.
 * @cfg {String} [title.position='outside']
 * Controls the vertical placement of the axis title. Available options are:
 *
 *   - `'outside'`: axis title is placed on the tick side
 *   - `'inside'`: axis title is placed on the side with no ticks
 *
 * @cfg {String} [title.alignment='middle']
 * Controls the horizontal placement of the axis title. Available options are:
 *
 *   - `'middle'`, `'center'`: axis title is placed in the middle of the axis line
 *   - `'start'`, `'left'`: axis title is placed at the start of the axis line
 *   - `'end'`, `'right'`: axis title is placed at the end of the axis line
 *
 * @cfg {String} [title.padding='0.5em']
 * The gap between the title and axis labels.
 * @accessor
 */

/**
 * @cfg {SVGElement/d3.selection} [parent=null]
 * The parent group of the d3.svg.axis as either an SVGElement or a D3 selection.
 * @accessor
 */

/**
 * @cfg {Ext.d3.svg.Svg} [component=null]
 * The SVG component that owns this axis.
 * @accessor
 */
