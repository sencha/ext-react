/**
 * @class Ext.Date
 * This class defines some basic methods for handling dates.
 *
 * The date parsing and formatting syntax contains a subset of
 * [PHP's `date()` function](http://www.php.net/date), and the formats that are
 * supported will provide results equivalent to their PHP versions.
 *
 * The following is a list of all currently supported formats:
 *
 *      Format      Description                                                               Example returned values
 *      ------      -----------------------------------------------------------------------   -----------------------
 *        d         Day of the month, 2 digits with leading zeros                             01 to 31
 *        D         A short textual representation of the day of the week                     Mon to Sun
 *        j         Day of the month without leading zeros                                    1 to 31
 *        l         A full textual representation of the day of the week                      Sunday to Saturday
 *        N         ISO-8601 numeric representation of the day of the week                    1 (for Monday) through 7 (for Sunday)
 *        S         English ordinal suffix for the day of the month, 2 characters             st, nd, rd or th. Works well with j
 *        w         Numeric representation of the day of the week                             0 (for Sunday) to 6 (for Saturday)
 *        z         The day of the year (starting from 0)                                     0 to 364 (365 in leap years)
 *        W         ISO-8601 week number of year, weeks starting on Monday                    01 to 53
 *        F         A full textual representation of a month, such as January or March        January to December
 *        m         Numeric representation of a month, with leading zeros                     01 to 12
 *        M         A short textual representation of a month                                 Jan to Dec
 *        n         Numeric representation of a month, without leading zeros                  1 to 12
 *        t         Number of days in the given month                                         28 to 31
 *        L         Whether it&#39;s a leap year                                                  1 if it is a leap year, 0 otherwise.
 *        o         ISO-8601 year number (identical to (Y), but if the ISO week number (W)    Examples: 1998 or 2004
 *                  belongs to the previous or next year, that year is used instead)
 *        Y         A full numeric representation of a year, 4 digits                         Examples: 1999 or 2003
 *        y         A two digit representation of a year                                      Examples: 99 or 03
 *        a         Lowercase Ante meridiem and Post meridiem                                 am or pm
 *        A         Uppercase Ante meridiem and Post meridiem                                 AM or PM
 *        g         12-hour format of an hour without leading zeros                           1 to 12
 *        G         24-hour format of an hour without leading zeros                           0 to 23
 *        h         12-hour format of an hour with leading zeros                              01 to 12
 *        H         24-hour format of an hour with leading zeros                              00 to 23
 *        i         Minutes, with leading zeros                                               00 to 59
 *        s         Seconds, with leading zeros                                               00 to 59
 *        u         Decimal fraction of a second                                              Examples:
 *                  (minimum 1 digit, arbitrary number of digits allowed)                     001 (i.e. 0.001s) or
 *                                                                                            100 (i.e. 0.100s) or
 *                                                                                            999 (i.e. 0.999s) or
 *                                                                                            999876543210 (i.e. 0.999876543210s)
 *        O         Difference to Greenwich time (GMT) in hours and minutes                   Example: +1030
 *        P         Difference to Greenwich time (GMT) with colon between hours and minutes   Example: -08:00
 *        T         Timezone abbreviation of the machine running the code                     Examples: EST, MDT, PDT ...
 *        Z         Timezone offset in seconds (negative if west of UTC, positive if east)    -43200 to 50400
 *        c         ISO 8601 date represented as the local time with an offset to UTC appended.
 *                  Notes:                                                                    Examples:
 *                  1) If unspecified, the month / day defaults to the current month / day,   1991 or
 *                     the time defaults to midnight, while the timezone defaults to the      1992-10 or
 *                     browser's timezone. If a time is specified, it must include both hours 1993-09-20 or
 *                     and minutes. The "T" delimiter, seconds, milliseconds and timezone     1994-08-19T16:20+01:00 or
 *                     are optional.                                                          1995-07-18T17:21:28-02:00 or
 *                  2) The decimal fraction of a second, if specified, must contain at        1996-06-17T18:22:29.98765+03:00 or
 *                     least 1 digit (there is no limit to the maximum number                 1997-05-16T19:23:30,12345-0400 or
 *                     of digits allowed), and may be delimited by either a '.' or a ','      1998-04-15T20:24:31.2468Z or
 *                  Refer to the examples on the right for the various levels of              1999-03-14T20:24:32Z or
 *                  date-time granularity which are supported, or see                         2000-02-13T21:25:33
 *                  http://www.w3.org/TR/NOTE-datetime for more info.                         2001-01-12 22:26:34
 *        C         An ISO date string as implemented by the native Date object's             1962-06-17T09:21:34.125Z
 *                  [Date.toISOString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString)
 *                  method. This outputs the numeric part with *UTC* hour and minute
 *                  values, and indicates this by appending the `'Z'` timezone
 *                  identifier.
 *        U         Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)                1193432466 or -2138434463
 *        MS        Microsoft AJAX serialized dates                                           \/Date(1238606590509)\/ (i.e. UTC milliseconds since epoch) or
 *                                                                                            \/Date(1238606590509+0800)\/
 *        time      A javascript millisecond timestamp                                        1350024476440
 *        timestamp A UNIX timestamp (same as U)                                              1350024866            
 *
 * Example usage (note that you must escape format specifiers with '\\' to render them as character literals):
 *
 *     // Sample date:
 *     // 'Wed Jan 10 2007 15:05:01 GMT-0600 (Central Standard Time)'
 *     
 *     var dt = new Date('1/10/2007 03:05:01 PM GMT-0600');
 *     console.log(Ext.Date.format(dt, 'Y-m-d'));                          // 2007-01-10
 *     console.log(Ext.Date.format(dt, 'F j, Y, g:i a'));                  // January 10, 2007, 3:05 pm
 *     console.log(Ext.Date.format(dt, 'l, \\t\\he jS \\of F Y h:i:s A')); // Wednesday, the 10th of January 2007 03:05:01 PM
 *
 * Here are some standard date/time patterns that you might find helpful.  They
 * are not part of the source of Ext.Date, but to use them you can simply copy this
 * block of code into any script that is included after Ext.Date and they will also become
 * globally available on the Date object.  Feel free to add or remove patterns as needed in your code.
 *
 *     Ext.Date.patterns = {
 *         ISO8601Long:"Y-m-d H:i:s",
 *         ISO8601Short:"Y-m-d",
 *         ShortDate: "n/j/Y",
 *         LongDate: "l, F d, Y",
 *         FullDateTime: "l, F d, Y g:i:s A",
 *         MonthDay: "F d",
 *         ShortTime: "g:i A",
 *         LongTime: "g:i:s A",
 *         SortableDateTime: "Y-m-d\\TH:i:s",
 *         UniversalSortableDateTime: "Y-m-d H:i:sO",
 *         YearMonth: "F, Y"
 *     };
 *
 * Example usage:
 *
 *     var dt = new Date();
 *     console.log(Ext.Date.format(dt, Ext.Date.patterns.ShortDate));
 *
 * Developer-written, custom formats may be used by supplying both a formatting and a parsing function
 * which perform to specialized requirements. The functions are stored in {@link #parseFunctions} and {@link #formatFunctions}.
 * @singleton
 */

/**
 * @method getElapsed
 * Returns the number of milliseconds between two dates.
 * @param {Date} dateA The first date.
 * @param {Date} [dateB=new Date()] (optional) The second date.
 * @return {Number} The difference in milliseconds
 */

/**
 * @property {Boolean} [useStrict=false]
 * Global flag which determines if strict date parsing should be used.
 * Strict date parsing will not roll-over invalid dates, which is the
 * default behavior of JavaScript Date objects.
 * (see {@link #parse} for more information)
*/

/**
 * @method parseFunctions
 * An object hash in which each property is a date parsing function. The property name is the
 * format string which that function parses.
 *
 * This object is automatically populated with date parsing functions as
 * date formats are requested for Ext standard formatting strings.
 *
 * Custom parsing functions may be inserted into this object, keyed by a name which from then on
 * may be used as a format string to {@link #parse}.
 *
 * Example:
 *
 *     Ext.Date.parseFunctions['x-date-format'] = myDateParser;
 *
 *  A parsing function should return a Date object, and is passed the following parameters:
 *
 * - `date`: {@link String} - The date string to parse.
 * - `strict`: {@link Boolean} - `true` to validate date strings while parsing
 * (i.e. prevent JavaScript Date "rollover"). __The default must be `false`.__
 * Invalid date strings should return `null` when parsed.
 *
 * To enable Dates to also be _formatted_ according to that format, a corresponding
 * formatting function must be placed into the {@link #formatFunctions} property.
 * @property parseFunctions
 * @type Object
 */

/**
 * An object hash in which each property is a date formatting function. The property name is the
 * format string which corresponds to the produced formatted date string.
 *
 * This object is automatically populated with date formatting functions as
 * date formats are requested for Ext standard formatting strings.
 *
 * Custom formatting functions may be inserted into this object, keyed by a name which from then on
 * may be used as a format string to {@link #format}.
 *
 * Example:
 *
 *     Ext.Date.formatFunctions['x-date-format'] = myDateFormatter;
 *
 * A formatting function should return a string representation of the Date object which
 * is the scope (this) of the function.
 *
 * To enable date strings to also be _parsed_ according to that format, a corresponding
 * parsing function must be placed into the {@link #parseFunctions} property.
 * @property formatFunctions
 * @type Object
 */

/**
 * @property {String} [MILLI="ms"]
 * Date interval constant.
 */

/**
 * @property {String} [SECOND="s"]
 * Date interval constant.
 */

/**
 * @property {String} [MINUTE="mi"]
 * Date interval constant.
 * @type String
 */

/**
 * @property {String} [HOUR="h"]
 * Date interval constant.
 */

/**
 * @property {String} [DAY="d"]
 * Date interval constant.
 */

/**
 * @property {String} [MONTH="mo"]
 * Date interval constant.
 */

/**
 * @property {String} [YEAR="y"]
 * Date interval constant.
 */

/**
 * @property {Number} [DAYS_IN_WEEK=7]
 * The number of days in a week.
 */

/**
 * @property {Number} [MONTHS_IN_YEAR=12]
 * The number of months in a year.
 */

/**
 * @property {Number} [MONTHS_IN_YEAR=31]
 * The maximum number of days in a month.
 */

/**
 * An object hash containing default date values used during date parsing.
 *
 * The following properties are available:
 *
 * - `y`: {@link Number} - The default year value. Defaults to `undefined`.
 * - `m`: {@link Number} - The default 1-based month value. Defaults to `undefined`.
 * - `d`: {@link Number} - The default day value. Defaults to `undefined`.
 * - `h`: {@link Number} - The default hour value. Defaults to `undefined`.
 * - `i`: {@link Number} - The default minute value. Defaults to `undefined`.
 * - `s`: {@link Number} - The default second value. Defaults to `undefined`.
 * - `ms`: {@link Number} - The default millisecond value. Defaults to `undefined`.
 *
 * Override these properties to customize the default date values used by the {@link #parse} method.
 *
 * __Note:__ In countries which experience Daylight Saving Time (i.e. DST), the `h`, `i`, `s`
 * and `ms` properties may coincide with the exact time in which DST takes effect.
 * It is the responsibility of the developer to account for this.
 *
 * Example Usage:
 *
 *     // set default day value to the first day of the month
 *     Ext.Date.defaults.d = 1;
 *
 *     // parse a February date string containing only year and month values.
 *     // setting the default day value to 1 prevents weird date rollover issues
 *     // when attempting to parse the following date string on, for example, March 31st 2009.
 *     Ext.Date.parse('2009-02', 'Y-m'); // returns a Date object representing February 1st 2009.
 *
 * @property defaults
 * @type Object
 */

/**
 * @property {String[]} dayNames
 * An array of textual day names.
 * Override these values for international dates.
 *
 * Example:
 *
 *     Ext.Date.dayNames = [
 *         'SundayInYourLang',
 *         'MondayInYourLang'
 *         // ...
 *     ];
 * @locale
 */

/**
 * @property {String[]} monthNames
 * An array of textual month names.
 * Override these values for international dates.
 *
 * Example:
 *
 *     Ext.Date.monthNames = [
 *         'JanInYourLang',
 *         'FebInYourLang'
 *         // ...
 *     ];
 * @locale
 */

/**
 * @property {Object} monthNumbers
 * An object hash of zero-based JavaScript month numbers (with short month names as keys).
 *
 * __Note:__ keys are case-sensitive.
 *
 * Override these values for international dates.
 *
 * Example:
 *
 *     Ext.Date.monthNumbers = {
 *         'LongJanNameInYourLang': 0,
 *         'ShortJanNameInYourLang':0,
 *         'LongFebNameInYourLang':1,
 *         'ShortFebNameInYourLang':1
 *         // ...
 *     };
 * @locale
 */

/**
 * @property {String} [defaultFormat="m/d/Y"]
 * The date format string that the {@link Ext.util.Format#dateRenderer}
 * and {@link Ext.util.Format#date} functions use.  See {@link Ext.Date} for details.
 *
 * This may be overridden in a locale file.
 * @locale
 */

/**
 * @property {Number} [firstDayOfWeek=0]
 * The day on which the week starts. `0` being Sunday, through `6` being Saturday.
 *
 * This may be overridden in a locale file.
 * @locale
 */

/**
 * @property {Number[]} [weekendDays=[0,6]]
 * The days on which weekend falls. `0` being Sunday, through `6` being Saturday.
 *
 * This may be overridden in a locale file.
 * @locale
 */

/**
 * @method getShortMonthName
 * Get the short month name for the given month number.
 * Override this function for international dates.
 * @param {Number} month A zero-based JavaScript month number.
 * @return {String} The short month name.
 * @locale
 */

/**
 * @method getShortDayName
 * Get the short day name for the given day number.
 * Override this function for international dates.
 * @param {Number} day A zero-based JavaScript day number.
 * @return {String} The short day name.
 * @locale
 */

/**
 * @method getMonthNumber
 * Get the zero-based JavaScript month number for the given short/full month name.
 * Override this function for international dates.
 * @param {String} name The short/full month name.
 * @return {Number} The zero-based JavaScript month number.
 * @locale
 */

/**
 * @method formatContainsHourInfo
 * Checks if the specified format contains hour information
 * @param {String} format The format to check
 * @return {Boolean} True if the format contains hour information
 */

/**
 * @method formatContainsDateInfo
 * Checks if the specified format contains information about
 * anything other than the time.
 * @param {String} format The format to check
 * @return {Boolean} True if the format contains information about
 * date/day information.
 */

/**
 * @method unescapeFormat
 * Removes all escaping for a date format string. In date formats,
 * using a '\' can be used to escape special characters.
 * @param {String} format The format to unescape
 * @return {String} The unescaped format
 */

/**
 * @property {Object} formatCodes
 * The base format-code to formatting-function hashmap used by the {@link #format} method.
 * Formatting functions are strings (or functions which return strings) which
 * will return the appropriate value when evaluated in the context of the Date object
 * from which the {@link #format} method is called.
 * Add to / override these mappings for custom date formatting.
 *
 * __Note:__ `Ext.Date.format()` treats characters as literals if an appropriate mapping cannot be found.
 *
 * Example:
 *
 *     Ext.Date.formatCodes.x = "Ext.util.Format.leftPad(this.getDate(), 2, '0')";
 *     console.log(Ext.Date.format(new Date(), 'X'); // returns the current day of the month
 */

/**
 * @method isValid
 * Checks if the passed Date parameters will cause a JavaScript Date "rollover".
 * @param {Number} year 4-digit year.
 * @param {Number} month 1-based month-of-year.
 * @param {Number} day Day of month.
 * @param {Number} hour (optional) Hour.
 * @param {Number} minute (optional) Minute.
 * @param {Number} second (optional) Second.
 * @param {Number} millisecond (optional) Millisecond.
 * @return {Boolean} `true` if the passed parameters do not cause a Date "rollover", `false` otherwise.
 */

/**
 * @method parse
 * Parses the passed string using the specified date format.
 * Note that this function expects normal calendar dates, meaning that months are 1-based (i.e. 1 = January).
 * The {@link #defaults} hash will be used for any date value (i.e. year, month, day, hour, minute, second or millisecond)
 * which cannot be found in the passed string. If a corresponding default date value has not been specified in the {@link #defaults} hash,
 * the current date's year, month, day or DST-adjusted zero-hour time value will be used instead.
 * Keep in mind that the input date string must precisely match the specified format string
 * in order for the parse operation to be successful (failed parse operations return a
 * `null` value).
 *
 * Example:
 *
 *     //dt = Fri May 25 2007 (current date)
 *     var dt = new Date();
 *
 *     //dt = Thu May 25 2006 (today&#39;s month/day in 2006)
 *     dt = Ext.Date.parse("2006", "Y");
 *
 *     //dt = Sun Jan 15 2006 (all date parts specified)
 *     dt = Ext.Date.parse("2006-01-15", "Y-m-d");
 *
 *     //dt = Sun Jan 15 2006 15:20:01
 *     dt = Ext.Date.parse("2006-01-15 3:20:01 PM", "Y-m-d g:i:s A");
 *
 *     // attempt to parse Sun Feb 29 2006 03:20:01 in strict mode
 *     dt = Ext.Date.parse("2006-02-29 03:20:01", "Y-m-d H:i:s", true); // returns null
 *
 * @param {String} input The raw date string.
 * @param {String} format The expected date string format.
 * @param {Boolean} [strict=false] (optional) `true` to validate date strings while parsing (i.e. prevents JavaScript Date "rollover").
 * Invalid date strings will return `null` when parsed.
 * @return {Date/null} The parsed Date, or `null` if an invalid date string.
 */

/**
 * @method isEqual
 * Compares if two dates are equal by comparing their values.
 * @param {Date} date1
 * @param {Date} date2
 * @return {Boolean} `true` if the date values are equal
 */

/**
 * @method format
 * Formats a date given the supplied format string.
 * @param {Date} date The date to format
 * @param {String} format The format string
 * @return {String} The formatted date or an empty string if date parameter is not a JavaScript Date object
 */

/**
 * @method getTimezone
 * Get the timezone abbreviation of the current date (equivalent to the format specifier 'T').
 *
 * __Note:__ The date string returned by the JavaScript Date object's `toString()` method varies
 * between browsers (e.g. FF vs IE) and system region settings (e.g. IE in Asia vs IE in America).
 * For a given date string e.g. "Thu Oct 25 2007 22:55:35 GMT+0800 (Malay Peninsula Standard Time)",
 * `getTimezone()` first tries to get the timezone abbreviation from between a pair of parentheses
 * (which may or may not be present), failing which it proceeds to get the timezone abbreviation
 * from the GMT offset portion of the date string.
 *
 *     var dt = new Date('9/17/2011');
 *     console.log(Ext.Date.getTimezone(dt));
 *
 * @param {Date} date The date
 * @return {String} The abbreviated timezone name (e.g. 'CST', 'PDT', 'EDT', 'MPST' ...).
 */

/**
 * @method getGMTOffset
 * Get the offset from GMT of the current date (equivalent to the format specifier 'O').
 *
 *     var dt = new Date('9/17/2011');
 *     console.log(Ext.Date.getGMTOffset(dt));
 *
 * @param {Date} date The date
 * @param {Boolean} [colon=false] `true` to separate the hours and minutes with a colon.
 * @return {String} The 4-character offset string prefixed with + or - (e.g. '-0600').
 */

/**
 * @method getDayOfYear
 * Get the numeric day number of the year, adjusted for leap year.
 *
 *     var dt = new Date('9/17/2011');
 *     console.log(Ext.Date.getDayOfYear(dt)); // 259
 *
 * @param {Date} date The date
 * @return {Number} 0 to 364 (365 in leap years).
 */

/**
 * @method getWeekOfYear
 * Get the numeric ISO-8601 week number of the year.
 * (equivalent to the format specifier 'W', but without a leading zero).
 *
 *     var dt = new Date('9/17/2011');
 *     console.log(Ext.Date.getWeekOfYear(dt)); // 37
 *
 * @param {Date} date The date.
 * @return {Number} 1 to 53.
 */

/**
 * @method isLeapYear
 * Checks if the current date falls within a leap year.
 *
 *     var dt = new Date('1/10/2011');
 *     console.log(Ext.Date.isLeapYear(dt)); // false
 *
 * @param {Date} date The date
 * @return {Boolean} `true` if the current date falls within a leap year, `false` otherwise.
 */

/**
 * @method getFirstDayOfMonth
 * Get the first day of the current month, adjusted for leap year.  The returned value
 * is the numeric day index within the week (0-6) which can be used in conjunction with
 * the {@link #monthNames} array to retrieve the textual day name.
 *
 *    var dt = new Date('1/10/2007'),
 *        firstDay = Ext.Date.getFirstDayOfMonth(dt);
 *
 *    console.log(Ext.Date.dayNames[firstDay]); // output: 'Monday'
 *
 * @param {Date} date The date
 * @return {Number} The day number (0-6).
 */

/**
 * @method getLastDayOfMonth
 * Get the last day of the current month, adjusted for leap year.  The returned value
 * is the numeric day index within the week (0-6) which can be used in conjunction with
 * the {@link #monthNames} array to retrieve the textual day name.
 *
 *    var dt = new Date('1/10/2007'),
 *        lastDay = Ext.Date.getLastDayOfMonth(dt);
 *
 *    console.log(Ext.Date.dayNames[lastDay]); // output: 'Wednesday'
 *
 * @param {Date} date The date
 * @return {Number} The day number (0-6).
 */

/**
 * @method getFirstDayOfMonth
 * Get the date of the first day of the month in which this date resides.
 * @param {Date} date The date
 * @return {Date}
 */

/**
 * @method getLastDayOfMonth
 * Get the date of the last day of the month in which this date resides.
 * @param {Date} date The date
 * @return {Date}
 */

/**
 * @method getDaysInMonth
 * Get the number of days in the current month, adjusted for leap year.
 * @param {Date} date The date
 * @return {Number} The number of days in the month.
 */

/**
 * @method getSuffix
 * Get the English ordinal suffix of the current day (equivalent to the format specifier 'S').
 * @param {Date} date The date
 * @return {String} 'st, 'nd', 'rd' or 'th'.
 * @locale
 */

/**
 * @method clone
 * Creates and returns a new Date instance with the exact same date value as the called instance.
 * Dates are copied and passed by reference, so if a copied date variable is modified later, the original
 * variable will also be changed.  When the intention is to create a new variable that will not
 * modify the original instance, you should create a clone.
 *
 * Example of correctly cloning a date:
 *
 *     //wrong way:
 *     var orig = new Date('10/1/2006');
 *     var copy = orig;
 *     copy.setDate(5);
 *     console.log(orig);  // returns 'Thu Oct 05 2006'!
 *
 *     //correct way:
 *     var orig = new Date('10/1/2006'),
 *         copy = Ext.Date.clone(orig);
 *     copy.setDate(5);
 *     console.log(orig);  // returns 'Thu Oct 01 2006'
 *
 * @param {Date} date The date.
 * @return {Date} The new Date instance.
 */

/**
 * @method isDST
 * Checks if the current date is affected by Daylight Saving Time (DST).
 * @param {Date} date The date
 * @return {Boolean} `true` if the current date is affected by DST.
 */

/**
 * @method clearTime
 * Attempts to clear all time information from this Date by setting the time to midnight of the same day,
 * automatically adjusting for Daylight Saving Time (DST) where applicable.
 *
 * __Note:__ DST timezone information for the browser's host operating system is assumed to be up-to-date.
 * @param {Date} date The date
 * @param {Boolean} [clone=false] `true` to create a clone of this date, clear the time and return it.
 * @return {Date} this or the clone.
 */

/**
 * @method add
 * Provides a convenient method for performing basic date arithmetic. This method
 * does not modify the Date instance being called - it creates and returns
 * a new Date instance containing the resulting date value.
 *
 * Examples:
 *
 *     // Basic usage:
 *     var dt = Ext.Date.add(new Date('10/29/2006'), Ext.Date.DAY, 5);
 *     console.log(dt); // returns 'Fri Nov 03 2006 00:00:00'
 *
 *     // Negative values will be subtracted:
 *     var dt2 = Ext.Date.add(new Date('10/1/2006'), Ext.Date.DAY, -5);
 *     console.log(dt2); // returns 'Tue Sep 26 2006 00:00:00'
 *
 *      // Decimal values can be used:
 *     var dt3 = Ext.Date.add(new Date('10/1/2006'), Ext.Date.DAY, 1.25);
 *     console.log(dt3); // returns 'Mon Oct 02 2006 06:00:00'
 *
 * @param {Date} date The date to modify
 * @param {String} interval A valid date interval enum value.
 * @param {Number} value The amount to add to the current date.
 * @param {Boolean} [preventDstAdjust=false] `true` to prevent adjustments when crossing
 * daylight savings boundaries.
 * @return {Date} The new Date instance.
 */

/**
 * @method subtract
 * Provides a convenient method for performing basic date arithmetic. This method
 * does not modify the Date instance being called - it creates and returns
 * a new Date instance containing the resulting date value.
 *
 * Examples:
 *
 *     // Basic usage:
 *     var dt = Ext.Date.subtract(new Date('10/29/2006'), Ext.Date.DAY, 5);
 *     console.log(dt); // returns 'Tue Oct 24 2006 00:00:00'
 *
 *     // Negative values will be added:
 *     var dt2 = Ext.Date.subtract(new Date('10/1/2006'), Ext.Date.DAY, -5);
 *     console.log(dt2); // returns 'Fri Oct 6 2006 00:00:00'
 *
 *      // Decimal values can be used:
 *     var dt3 = Ext.Date.subtract(new Date('10/1/2006'), Ext.Date.DAY, 1.25);
 *     console.log(dt3); // returns 'Fri Sep 29 2006 06:00:00'
 *
 * @param {Date} date The date to modify
 * @param {String} interval A valid date interval enum value.
 * @param {Number} value The amount to subtract from the current date.
 * @param {Boolean} [preventDstAdjust=false] `true` to prevent adjustments when crossing
 * daylight savings boundaries.
 * @return {Date} The new Date instance.
 */

/**
 * @method between
 * Checks if a date falls on or between the given start and end dates.
 * @param {Date} date The date to check
 * @param {Date} start Start date
 * @param {Date} end End date
 * @return {Boolean} `true` if this date falls on or between the given start and end dates.
 */

/**
 * @method isWeekend
 * Checks if the date is a weekend day. Uses {@link #weekendDays}.
 * @param {Date} date The date.
 * @return {Boolean} `true` if the day falls on a weekend.
 *
 * @since 6.2.0
 */

/**
 * @method utcToLocal
 * Converts the passed UTC date into a local date.
 * For example, if the passed date is:
 * `Wed Jun 01 2016 00:10:00 GMT+1000 (AUS Eastern Standard Time)`, then
 * the returned date will be `Wed Jun 01 2016 00:00:00 GMT+1000 (AUS Eastern Standard Time)`.
 * @param {Date} d The date to convert.
 * @return {Date} The date as a local. Does not modify the passed date.
 *
 * @since 6.2.0
 */

/**
 * @method localeToUtc
 * Converts the passed local date into a UTC date.
 * For example, if the passed date is:
 * `Wed Jun 01 2016 00:00:00 GMT+1000 (AUS Eastern Standard Time)`, then
 * the returned date will be `Wed Jun 01 2016 10:00:00 GMT+1000 (AUS Eastern Standard Time)`.
 * @param {Date} d The date to convert.
 * @return {Date} The date as UTC. Does not modify the passed date.
 *
 * @since 6.2.0
 */

/**
 * @method utc
 * Create a UTC date.
 * @param {Number} year The year.
 * @param {Number} month The month.
 * @param {Number} day The day.
 * @param {Number} [hour=0] The hour.
 * @param {Number} [min=0] The minutes.
 * @param {Number} [s=0] The seconds.
 * @param {Number} [ms=0] The milliseconds.
 * @return {Date} The UTC date.
 *
 * @since 6.2.0
 */

/**
 * @method diff
 * Calculate how many units are there between two time.
 * @param {Date} min The first time.
 * @param {Date} max The second time.
 * @param {String} unit The unit. This unit is compatible with the date interval constants.
 * @return {Number} The maximum number n of units that min + n * unit <= max.
 */

/**
 * @method align
 * Align the date to `unit`.
 * @param {Date} date The date to be aligned.
 * @param {String} unit The unit. This unit is compatible with the date interval constants.
 * @param {Number} step
 * @return {Date} The aligned date.
 */
