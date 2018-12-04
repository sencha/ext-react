/**
 * @class Ext.panel.Date
 * @extend Ext.Panel
 * @xtype datepanel
 * Ext.panel.Date is a date picker. This class is used to allow browsing and selection of valid
 * dates in a popup, but may also be used with other components.
 */

/**
 * @cfg {Number} [panes=1]
 * Number of calendar panes to display in the picker.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoConfirm=false] When set to `true`, clicking or tapping on
 * a date cell in the calendar will confirm selection and dismiss the picker.
 * When set to `false`, user will have to click OK button after selecting the date.
 * @accessor
 */

/**
 * @cfg {Boolean} [showFooter] Set to `true` to always show footer bar with OK,
 * Cancel, and Today buttons. If this config is not provided, footer will be shown
 * or hidden automatically depending on {@link #autoConfirm}.
 * @accessor
 */

/**
 * @cfg {Boolean} [showTodayButton] Set to `true` to show the Today button. Location
 * will depend on {@link #showFooter} config: if the footer is shown, Today button
 * will be placed in the footer; otherwise the button will be placed in picker header.
 * @accessor
 */

/**
 * @cfg {Boolean} [animation=true]
 * Set to `false` to disable animations.
 * @accessor
 */

/**
 * @cfg {Date[]/String[]/RegExp[]} [specialDates] An array of Date objects, strings, or
 * RegExp patterns designating special dates like holidays. These dates will have
 * 'x-special-day' CSS class added to their cells, allowing for visually distinct styling.
 *
 * If you want to disallow selecting these dates you would need to include them in
 * {@link #disabledDates} config as well.
 * @accessor
 */

/**
 * @cfg {Number[]} [disabledDays]
 * An array of days to disable, 0-based. For example, [0, 6] disables
 * Sunday and Saturday.
 * @accessor
 */

/**
 * @cfg {Date[]/String[]/RegExp} disabledDates
 * An array of dates to disable. This array can contain Date objects, stringified dates
 * in {@link #format}, or RegExp patterns that would match strings in {@link #format}.
 * Date objects can be used to disable specific dates, while strings will be used to build
 * a regular expression to match dates against.
 * Some examples:
 *
 *   - ['03/08/2003', new Date(2003, 8, 16)] would disable those exact dates
 *   - ['03/08', '09/16'] would disable those days for every year
 *   - ['^03/08'] would only match the beginning (useful if you are using short years)
 *   - [/03\/..\/2006/] would disable every day in March 2006
 *   - /^03/ would disable every day in every March
 *
 * Note that the format of the dates included in the array should exactly match the
 * {@link #format} config.
 * @accessor
 */

/**
 * @cfg {Date/String} [minDate]
 * Minimum allowable date as Date object or a string in {@link #format}.
 * @accessor
 */

/**
 * @cfg {Date/String} [maxDate]
 * Maximum allowable date as Date object or a string in {@link #format}.
 * @accessor
 */

/**
 * @cfg {Boolean} [showBeforeMinDate=false]
 * Set to `true` to allow navigating
 * to months preceding {@link #minDate}. This has no effect when `minDate` is not set.
 * @accessor
 */

/**
 * @cfg {Boolean} [showAfterMaxDate=false]
 * Set to `true` to allow navigating
 * to months coming after {@link #maxDate}. This has no effect when `maxDate` is not set.
 * @accessor
 */

/**
 * @cfg {Date} [value=false]
 * Initial value of this picker. Defaults to today.
 * @accessor
 */

/**
 * @cfg {Date} [focusedDate]
 * Date to receive focus when the picker is focused
 * for the first time. Subsequent navigation via keyboard will update this value.
 *
 * This config cannot be null. Default is today.
 * @accessor
 */

/**
 * @cfg {Boolean} hideCaptions
 * Set to `true` to hide calendar pane captions displaying
 * the month and year shown in each pane.
 * @accessor
 */

/**
 * @cfg {String} [nextText="Next Month (Control+Right)"]
 * The next month navigation button tooltip.
 * @locale
 */

/**
 * @cfg {String} [prevText="Previous Month (Control+Left)"]
 * The previous month navigation button tooltip.
 * @locale
 * @accessor
 */

/**
 * @cfg {Number} [startDay]
 * Day index at which the week should begin, 0-based.
 *
 * Defaults to the value of {@link Ext.Date.firstDayOfWeek}.
 * @locale
 * @accessor
 */

/**
 * @cfg {Number[]} [weekendDays] Array of weekend day indices, 0-based.
 *
 * Defaults to the value of {@link Ext.Date.weekendDays}
 * @locale
 * @accessor
 */

/**
 * @cfg {String} format
 * The default date format string which can be overriden for localization support.
 * The format must be valid according to {@link Ext.Date#parse}
 * (defaults to {@link Ext.Date#defaultFormat}).
 * @locale
 * @accessor
 */

/**
 * @cfg {String} [paneCaptionFormat="F Y"]
 * Date format for calendar pane captions.
 * @accessor
 */

/**
 * @cfg {String} monthYearFormat
 * The date format for the header month.
 * @locale
 * @accessor
 */

/**
 * @cfg {String} dateCellFormat The date format to use for date cells,
 * compatible with {@link Ext.Date#format} method.
 * This format usually includes only day of month information.
 * @locale
 * @accessor
 */

/**
 * @cfg {Function} [handler] A function that will handle the select event of this picker.
 * The function will receive the following parameters:
 *
 * @params {Ext.picker.Calendar} handler.this The Picker instance
 * @params {Date} handler.date The selected date
 */

/**
 * @cfg {Object} [scope] The scope in which {@link #handler} function will be called.
 */

/**
 * @cfg {Function} [transformCellCls] A function that will be called during cell rendering
 * to allow modifying CSS classes applied to the cell.
 *
 * @param {Date} transformCellCls.date Date for which a cell is being rendered.
 * @param {String[]} transformCellCls.classes Array of standard CSS classes for this cell,
 * including class names for {@link #specialDates}, {@link #disabledDates}, etc.
 * You can add custom classes or remove some standard class names as desired.
 */
