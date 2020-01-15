/**
 * @class Ext.calendar.view.WeeksRenderer
 * @extend Ext.Base
 *
 * This class is used to generate the rendering parameters for an event
 * in a {@link Ext.calendar.view.Weeks}. The purpose of this class is
 * to provide the rendering logic insulated from the DOM.
 * 
 * @private
 */

/**
 * @cfg {Number} [days=null]
 * The number of days.
 */

/**
 * @cfg {Number} [index=null]
 * The index of this week.
 */

/**
 * @cfg {Number} [maxEvents=null]
 * The maximum number of events per day before overflow.
 * `null` to disable this.
 */

/**
 * @cfg {Boolean} [overflow=null]
 * `true` to calculate sizes as if overflow could occur.
 */

/**
 * @cfg {Date} [start=null]
 * The start of the week.
 */

/**
 * @cfg {Ext.calendar.view.Base} [view=null]
 * The view.
 */

/**
 * @method addIf
 * Add an event if it occurs within the range for this week.
 * @param {Ext.calendar.model.EventBase} event The event.
 */

/**
 * @method calculate
 * Indicates that all events are added and the positions can be calculated.
 */

/**
 * @method compress
 * Compress existing rows into consumable pieces for the view.
 * @param {Number} rowIdx The row index to compress.
 * @return {Object[]} A compressed set of config objects for the row.
 */

/**
 * @method hasEvents
 * Checks if this renderer has any events.
 * @return {Boolean} `true` if there are events.
 */
