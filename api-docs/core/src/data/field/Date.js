/**
 * @class Ext.data.field.Date
 * @extend Ext.data.field.Field
 * @alias data.field.date
 *
 * This class provides Date specific processing for fields.
 *
 * In previous releases this functionality was integral to the `Field` base class.
 */

/**
 * @cfg {String} dateFormat
 *
 * Serves as a default for the {@link #dateReadFormat} and {@link #dateWriteFormat} config options. This
 * will be used in place of those other configurations if not specified.
 *
 * A format string for the {@link Ext.Date#parse Ext.Date.parse} function, or "timestamp" if the value provided by
 * the Reader is a UNIX timestamp, or "time" if the value provided by the Reader is a javascript millisecond
 * timestamp. See {@link Ext.Date}.
 *
 * It is quite important to note that while this config is optional, it will default to using the base
 * JavaScript Date object's `parse` function if not specified, rather than {@link Ext.Date#parse Ext.Date.parse}.
 * This can cause unexpected issues, especially when converting between timezones, or when converting dates that
 * do not have a timezone specified. The behavior of the native `Date.parse` is implementation-specific, and
 * depending on the value of the date string, it might return the UTC date or the local date. __For this reason
 * it is strongly recommended that you always specify an explicit date format when parsing dates.__
 */

/**
 * @cfg {String} dateReadFormat
 * Used when converting received data into a Date when the {@link #type} is specified as `"date"`.
 * This configuration takes precedence over {@link #dateFormat}.
 * See {@link #dateFormat} for more information.
 */

/**
 * @cfg {String} dateWriteFormat
 * Provides a custom format when serializing dates with a {@link Ext.data.writer.Writer}.
 * If this is not specified, the {@link #dateFormat} will be used. If no `dateFormat`
 * is specified, 'timestamp' format is used.
 *
 * See the {@link Ext.data.writer.Writer} docs for more information on writing dates.
 *
 * **Note** It is not possible to use the standard date serialization pathway or {@link Ext#USE_NATIVE_JSON native browser JSON production}
 * to use a {@link Ext.data.JsonWriter JsonWriter} to send Microsoft formated
 * "JSON" dates.
 *
 * To use a {@link Ext.data.JsonWriter JsonWriter} to write dates in a JSON packet in
 * the form `"\/Date(1357372800000)\/"` configure the field like this:
 *
 *    {
 *        type: 'date',
 *        dateFormat: 'MS',     // To parse incoming dates from server correctly
 *        serialize: null       // Avoid formatting or conversion by the Writer
 *    }
 *
 * Then override the `Ext.JSON` date serialize function:
 *
 *    Ext.JSON.encodeDate = function (d) {
 *        return '"' + Ext.Date.format(d, 'MS') + '"';
 *    };
 */

/**
 * @cfg {Boolean} useStrict
 * @since 6.2.0
 * Used to manually set strict date parsing on a per-field basis. If no `useStrict`
 * is specified, will use value of {@link Ext.Date.useStrict} to determine how to
 * process dates.
 */
