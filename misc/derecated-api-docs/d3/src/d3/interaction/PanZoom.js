/**
 * @class Ext.d3.interaction.PanZoom
 * @extend Ext.d3.interaction.Abstract
 * @alias d3.interaction.panzoom
 * The 'panzoom' interaction allows to react to gestures in D3 components and interpret
 * them as pan and zoom actions.
 * One can then listen to the 'panzoom' event of the interaction or implement the
 * {@link Ext.d3.Component#onPanZoom} method and receive the translation and scaling
 * components that can be applied to the content.
 * The way in which pan/zoom gestures are interpreted is highly configurable,
 * and it's also possible to show a scroll indicator.
 */

/**
 * @cfg {Object} pan The pan interaction config. Set to `null` if panning is not desired.
 * @cfg {String} pan.gesture The pan gesture, must have 'start' and 'end' counterparts.
 * @cfg {Boolean} pan.constrain If `false`, the panning will be unconstrained,
 * even if {@link #contentRect} and {@link #viewportRect} configs are set.
 * @cfg {Object} pan.momentum Momentum scrolling config. Set to `null` to pan with no momentum.
 * @cfg {Number} pan.momentum.friction The magnitude of the friction force.
 * @cfg {Number} pan.momentum.spring Spring constant. Spring force will be proportional to the
 * degree of viewport bounds penetration (displacement from equilibrium position), as well as
 * this spring constant. See [Hooke's law](https://en.wikipedia.org/wiki/Hooke%27s_law).
 * @accessor
 */

/**
 * @cfg {Object} zoom The zoom interaction config. Set to `null` if zooming is not desired.
 * @cfg {String} zoom.gesture The zoom gesture, must have 'start' and 'end' counterparts.
 * @cfg {Number[]} zoom.extent Minimum and maximum zoom levels as an array of two numbers.
 * @cfg {Boolean} zoom.uniform Set to `false` to allow independent scaling in both directions.
 * @cfg {Object} zoom.mouseWheel Set to `null` if scaling with mouse wheel is not desired.
 * @cfg {Number} zoom.mouseWheel.factor How much to zoom in or out on each mouse wheel step.
 * @cfg {Object} zoom.doubleTap Set to `null` if zooming in on double tap is not desired.
 * @cfg {Number} zoom.doubleTap.factor How much to zoom in on double tap.
 * @accessor
 */

/**
 * A function that returns natural (before transformations) content position and dimensions.
 * If {@link #viewportRect} config is specified as well, constrains the panning,
 * so that the content is always visible (can't pan offscreen).
 * By default the panning is unconstrained.
 * The interaction needs to know the content's bounding box at any given time, as the content
 * can be very dynamic, e.g. animate at a time when panning or zooming action is performed.
 * @cfg {Function} [contentRect=null]
 * @return {Object} rect
 * @return {Number} rect.x
 * @return {Number} rect.y
 * @return {Number} rect.width
 * @return {Number} rect.height
 * @accessor
 */

/**
 * A function that returns viewport position and dimensions in component's coordinates.
 * If {@link #contentRect} config is specified as well, constrains the panning,
 * so that the content is always visible (can't pan offscreen).
 * By default the panning is unconstrained.
 * @cfg {Function} [viewportRect=null]
 * @return {Object} rect
 * @return {Number} rect.x
 * @return {Number} rect.y
 * @return {Number} rect.width
 * @return {Number} rect.height
 * @accessor
 */

/**
 * @cfg {Object} indicator The scroll indicator config. Set to `null` to disable.
 * @cfg {String} indicator.parent The name of the reference on the component to the element
 * that will be used as the scroll indicator container.
 * @accessor
 */
