/**
 * @class Ext.mixin.Progressable
 * @extend Ext.Mixin
 * A Progressable mixin.
 * @private
 */

/**
 * @cfg {Number} [minProgressInput=0]
 * Minimum input value for this indicator
 * @accessor
 */

/**
 * @cfg {Number} [maxProgressInput=1]
 * Maximum input value for this indicator
 * @accessor
 */

/**
 * @cfg {Number} [minProgressOutput=0]
 * Minimum output value for this indicator
 * @accessor
 */

/**
 * @cfg {Number} [maxProgressOutput=100]
 * Maximum output value for this indicator
 * @accessor
 */

/**
 * @cfg {Boolean} [dynamic=true]
 *
 * When false this indicator will only receive progressStart and progressEnd commands, no progressUpdate commands will be sent.
 * @accessor
 */

/**
 * @cfg {String} state
 *
 * Current state of the progressIndicator. Should be used for switching progress states like download to upload.
 * @accessor
 */
