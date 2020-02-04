/**
 * @class Ext.calendar.EventBase
 * @extend Ext.Gadget
 *
 * A base class for an event widget. A default implementation is provided
 * by {@link Ext.calendar.Event}. This class should be extended to
 * provide a custom implementation.
 * @abstract
 */

/**
 * @cfg {String} [defaultTitle='(New Event)']
 * The default title to use when one is not specified.
 * @accessor
 */

/**
 * @cfg {Date} [endDate=null]
 * The end date for this event (as UTC). Will be set automatically if
 * a {@link #model} is passed. May be set independently
 * of any attached {@link #model}.
 * @accessor
 */

/**
 * @cfg {String} [mode=null]
 * The display mode for this event. Possible options are:
 * - `weekspan`
 * - `weekinline`
 * - `day`
 * @accessor
 */

/**
 * @cfg {Ext.calendar.model.EventBase} [model=null]
 * A backing model for this widget.
 * @accessor
 */

/**
 * @cfg {Ext.calendar.theme.Palette} [palette=null]
 * A color palette for this event.
 * @accessor
 */

/**
 * @cfg {Boolean} [resize=false]
 * `true` to allow this event to be resized via the UI.
 * @accessor
 */

/**
 * @cfg {Date} [startDate=null]
 * The start date for this event (as UTC). Will be set automatically if
 * a {@link #model} is passed. May be set independently
 * of any attached {@link #model}.
 * @accessor
 */

/**
 * @cfg {String} [title='']
 * The title for this event. Will be set automatically if
 * a {@link #model} is passed.
 * @accessor
 */

/**
 * @cfg touchAction
 * @inheritdoc Ext.Widget#cfg-touchAction
 * @accessor
 */

/**
 * @cfg {Ext.calendar.view.Base} [view=null]
 * The view for this event.
 * @accessor
 */
