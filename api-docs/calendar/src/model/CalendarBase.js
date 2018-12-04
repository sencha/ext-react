/**
 * @class Ext.calendar.model.CalendarBase
 * @extend Ext.Mixin
 * A mixin that provides some base behaviors for calendars. The default
 * implementation is {@link Ext.calendar.model.Calendar}. To provide
 * a custom implementation, this mixin should be used and the remaining
 * parts of the API need to be implemented.
 */

/**
 * @cfg {Object} eventStoreDefaults
 * Defaults to use for the {@link #events} store.
 * @accessor
 */

/**
 * @method events
 * Get the events store for this calendar.
 * @return {Ext.calendar.store.Events} The events.
 */

/**
 * @method getAssignedColor
 * Get the assigned color for this calendar. Used when a {@link #getColor color}
 * is not specified.
 * @return {String} The color.
 *
 * @abstract
 */

/**
 * @method getBaseColor
 * Get the base color for this calendar. Uses {@link #getColor} or {@link #getAssignedColor}.
 * If not specified, a color is used from the default theme.
 * @return {String} The color.
 */

/**
 * @method getColor
 * Gets a specified color for this calendar.
 * @return {String} The color.
 *
 * @abstract
 */

/**
 * @method getDescription
 * Gets the description for this calendar.
 * @return {String} The description.
 *
 * @abstract
 */

/**
 * @method getEditable
 * Gets the editable state for this calendar.
 * @return {Boolean} The editable state.
 *
 * @abstract
 */

/**
 * @method getHidden
 * Gets the hidden state for this calendar.
 * @return {Boolean} The hidden state.
 *
 * @abstract
 */

/**
 * @method getTitle
 * Gets the title for this calendar.
 * @return {String} The title.
 *
 * @abstract
 */

/**
 * @method setAssignedColor
 * Set the assigned color for this calendar.
 * @param {String} color The assigned color.
 *
 * @abstract
 */

/**
 * @method setColor
 * Set the color for this calendar.
 * @param {String} color The color.
 *
 * @abstract
 */

/**
 * @method setDescription
 * Set the description for this calendar.
 * @param {String} description The description.
 *
 * @abstract
 */

/**
 * @method setEditable
 * Set the editable state for this calendar.
 * @param {Boolean} editable The editable state.
 *
 * @abstract
 */

/**
 * @method setHidden
 * Set the hidden state for this calendar.
 * @param {Boolean} hidden The hidden state.
 *
 * @abstract
 */

/**
 * @method setTitle
 * Set the title for this calendar.
 * @param {String} title The title.
 *
 * @abstract
 */
