/**
 * @class Ext.calendar.form.Base
 * @extend Ext.Mixin
 *
 * Defines the API used by {@link Ext.calendar.view.Base} for showing
 * forms to add and edit events. A default implementation is provided by
 * {@link Ext.calendar.form.Add} and {@link Ext.calendar.form.Edit}.
 */

/**
 * @cfg {Ext.calendar.model.EventBase} [event=null]
 * The data for this form.
 * @accessor
 */

/**
 * @cfg {Ext.calendar.view.Base} [view=null]
 * The view form this form.
 * @accessor
 */

/**
 * @event cancel
 * Fired when this form is dismissed with no change.
 * @param {Ext.calendar.form.Base} this This form.
 */

/**
 * @event drop
 * Fired when a drop action is taken on this form.
 * @param {Ext.calendar.form.Base} this This form.
 */

/**
 * @event save
 * Fired when a create/edit has been made on this form.
 * @param {Ext.calendar.form.Base} this This form.
 * @param {Object} context The context.
 * @param {Object} context.data The data to be pushed into
 * the model via {@link Ext.calendar.model.EventBase#setData setData}.
 */
