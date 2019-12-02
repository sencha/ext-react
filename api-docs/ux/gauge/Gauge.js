/**
 * @class Ext.ux.Gauge
 * @extend Ext.Gadget
 * @xtype gauge
 *
 * Displays a value within the given interval as a gauge.
 */

/**
 * @cfg {Number/String} [padding=10]
 * Gauge sector padding in pixels or percent of
 * width/height, whichever is smaller.
 * @accessor
 */

/**
 * @cfg {Number} [trackStart=135]
 * The angle in the [0, 360) interval at which the gauge's track sector starts.
 * E.g. 0 for 3 o-clock, 90 for 6 o-clock, 180 for 9 o-clock, 270 for noon.
 * @accessor
 */

/**
 * @cfg {Number} [trackLength=270]
 * The angle in the (0, 360] interval to add to the {@link #trackStart} angle
 * to determine the angle at which the track ends.
 * @accessor
 */

/**
 * @cfg {Number} [angleOffset=0]
 * The angle at which the {@link #minValue} starts in case of a circular gauge.
 * @accessor
 */

/**
 * @cfg {Number} [minValue=0]
 * The minimum value that the gauge can represent.
 * @accessor
 */

/**
 * @cfg {Number} [maxValue=100]
 * The maximum value that the gauge can represent.
 * @accessor
 */

/**
 * @cfg {Number} [value=50]
 * The current value of the gauge.
 * @accessor
 */

/**
 * @cfg {Boolean} [clockwise=true]
 * `true` - {@link #cfg!value} increments in a clockwise fashion
 * `false` - {@link #cfg!value} increments in an anticlockwise fashion
 * @accessor
 */

/**
 * @cfg {Ext.XTemplate} textTpl The template for the text in the center of the gauge.
 * The available data values are:
 * - `value` - The {@link #cfg!value} of the gauge.
 * - `percent` - The value as a percentage between 0 and 100.
 * - `minValue` - The value of the {@link #cfg!minValue} config.
 * - `maxValue` - The value of the {@link #cfg!maxValue} config.
 * - `delta` - The delta between the {@link #cfg!minValue} and {@link #cfg!maxValue}.
 * @accessor
 */

/**
 * @cfg {String} [textAlign='c-c']
 * If the gauge has a donut hole, the text will be centered inside it.
 * Otherwise, the text will be centered in the middle of the gauge's
 * bounding box. This config allows to alter the position of the text
 * in the latter case. See the docs for the `align` option to the
 * {@Ext.util.Region#alignTo} method for possible ways of alignment
 * of the text to the guage's bounding box.
 * @accessor
 */

/**
 * @cfg {Object} trackStyle Track sector styles.
 * @cfg {String/Object[]} trackStyle.fill Track sector fill color. Defaults to CSS value.
 * It's also possible to have a linear gradient fill that starts at the top-left corner
 * of the gauge and ends at its bottom-right corner, by providing an array of color stop
 * objects. For example:
 *
 *     trackStyle: {
 *         fill: [{
 *             offset: 0,
 *             color: 'green',
 *             opacity: 0.8
 *         }, {
 *             offset: 1,
 *             color: 'gold'
 *         }]
 *     }
 *
 * @cfg {Number} trackStyle.fillOpacity Track sector fill opacity. Defaults to CSS value.
 * @cfg {String} trackStyle.stroke Track sector stroke color. Defaults to CSS value.
 * @cfg {Number} trackStyle.strokeOpacity Track sector stroke opacity. Defaults to CSS value.
 * @cfg {Number} trackStyle.strokeWidth Track sector stroke width. Defaults to CSS value.
 * @cfg {Number/String} [trackStyle.outerRadius='100%'] The outer radius of the track sector.
 * For example:
 *
 *     outerRadius: '90%',      // 90% of the maximum radius
 *     outerRadius: 100,        // radius of 100 pixels
 *     outerRadius: '70% + 5',  // 70% of the maximum radius plus 5 pixels
 *     outerRadius: '80% - 10', // 80% of the maximum radius minus 10 pixels
 *
 * @cfg {Number/String} [trackStyle.innerRadius='50%'] The inner radius of the track sector.
 * See the `trackStyle.outerRadius` config documentation for more information.
 * @cfg {Boolean} [trackStyle.round=false] Whether to round the track sector edges or not.
 * @accessor
 */

/**
 * @cfg {Object} valueStyle Value sector styles.
 * @cfg {String/Object[]} valueStyle.fill Value sector fill color. Defaults to CSS value.
 * See the `trackStyle.fill` config documentation for more information.
 * @cfg {Number} valueStyle.fillOpacity Value sector fill opacity. Defaults to CSS value.
 * @cfg {String} valueStyle.stroke Value sector stroke color. Defaults to CSS value.
 * @cfg {Number} valueStyle.strokeOpacity Value sector stroke opacity. Defaults to CSS value.
 * @cfg {Number} valueStyle.strokeWidth Value sector stroke width. Defaults to CSS value.
 * @cfg {Number/String} [valueStyle.outerRadius='100% - 4'] The outer radius of the value sector.
 * See the `trackStyle.outerRadius` config documentation for more information.
 * @cfg {Number/String} [valueStyle.innerRadius='50% + 4'] The inner radius of the value sector.
 * See the `trackStyle.outerRadius` config documentation for more information.
 * @cfg {Boolean} [valueStyle.round=false] Whether to round the value sector edges or not.
 * @accessor
 */

/**
 * @cfg {Object/Boolean} [animation=true]
 * The animation applied to the gauge on changes to the {@link #value}
 * and the {@link #angleOffset} configs. Defaults to 1 second animation
 * with the  'out' easing.
 * @cfg {Number} animation.duration The duraction of the animation.
 * @cfg {String} animation.easing The easing function to use for the animation.
 * Possible values are:
 * - `linear` - no easing, no acceleration
 * - `in` - accelerating from zero velocity
 * - `out` - (default) decelerating to zero velocity
 * - `inOut` - acceleration until halfway, then deceleration
 * @accessor
 */


/**
 * @since 6.6.0
 *
 * Example usage:
 *
 *      @example
 *      import React, { Component } from 'react';
 *      import { ExtReact, SliderField, Gauge, FormPanel } from '@sencha/ext-react-modern';
 *      export default class GaugeExample extends Component {
 *          constructor() {
 *              super();
 *              this.state = {
 *                  value: 40
 *              }
 *          }
 *          updateGauges(slider, value) {
 *              this.setState({ value })
 *          }
 *          render() {
 *              const { value } = this.state;
 *              return (
 *                  <ExtReact>
 *                      <FormPanel shadow layout="vbox" maxWidth={350}>
 *                          <SliderField label="Value" onChange={this.updateGauges.bind(this)} value={value}/>
 *                          <Gauge flex={1} value={value}/>
 *                          <Gauge flex={1} value={value} trackStart={180} trackLength={360}/>
 *                      </FormPanel>
 *                  </ExtReact>
 *              )
 *          }
 *      }
 */