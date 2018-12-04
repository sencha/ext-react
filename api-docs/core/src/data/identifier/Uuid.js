/**
 * @class Ext.data.identifier.Uuid
 * @extend Ext.data.identifier.Generator
 * @alias data.identifier.uuid
 *
 * This class generates UUID's according to RFC 4122. This class has a default id property.
 * This means that a single instance is shared unless the id property is overridden. Thus,
 * two {@link Ext.data.Model} instances configured like the following share one generator:
 *
 *     Ext.define('MyApp.data.MyModelX', {
 *         extend: 'Ext.data.Model',
 *         identifier: 'uuid'
 *     });
 *
 *     Ext.define('MyApp.data.MyModelY', {
 *         extend: 'Ext.data.Model',
 *         identifier: 'uuid'
 *     });
 *
 * This allows all models using this class to share a commonly configured instance.
 *
 * # Using Version 1 ("Sequential") UUID's
 *
 * If a server can provide a proper timestamp and a "cryptographic quality random number"
 * (as described in RFC 4122), the shared instance can be configured as follows:
 *
 *     Ext.data.identifier.Uuid.Global.reconfigure({
 *         version: 1,
 *         clockSeq: clock, // 14 random bits
 *         salt: salt,      // 48 secure random bits (the Node field)
 *         timestamp: ts    // timestamp per Section 4.1.4
 *     });
 *
 *     // or these values can be split into 32-bit chunks:
 *
 *     Ext.data.identifier.Uuid.Global.reconfigure({
 *         version: 1,
 *         clockSeq: clock,
 *         salt: { lo: saltLow32, hi: saltHigh32 },
 *         timestamp: { lo: timestampLow32, hi: timestamptHigh32 }
 *     });
 *
 * This approach improves the generator's uniqueness by providing a valid timestamp and
 * higher quality random data. Version 1 UUID's should not be used unless this information
 * can be provided by a server and care should be taken to avoid caching of this data.
 *
 * See [http://www.ietf.org/rfc/rfc4122.txt](http://www.ietf.org/rfc/rfc4122.txt) for details.
 */

/**
 * @cfg id
 * The id for this generator instance. By default all model instances share the same
 * UUID generator instance. By specifying an id other then 'uuid', a unique generator instance
 * will be created for the Model.
 * @accessor
 */

/**
 * @cfg {Number} [version=4]
 * The Version of UUID. Supported values are:
 *
 *  * 1 : Time-based, "sequential" UUID. To use this type of generator, you must also
 *  specify the `salt`, `timestamp` and `clock` properties. For details on the values
 *  and how a server should produce them, see RFC 4122. Use of this type of generator
 *  produces values that are easier to read since they are sequential, but requires
 *  some care to initialize properly and still ensure their uniqueness.
 *
 *  * 4 : Pseudo-random UUID. This is the simplest form and requires no configuration
 *  and hence is the default type.
 */

/**
 * @cfg {Number/Object} [salt]
 * This value is a 48-bit number. This can be a number or an object with `hi` and `lo`
 * properties where `lo` is the low 32-bits and `hi` is the upper 16 bits.
 *
 * Only applicable when `version` is set to `1`.
 */

/**
 * @cfg {Number/Object} [timestamp]
 * When created, this value is a 60-bit number. This can be a number or an object with
 * `hi` and `lo` properties where `lo` is the low 32-bits and `hi` is the upper 28 bits.
 *
 * Only applicable when `version` is set to `1`.
 */

/**
 * @cfg {Number} [clockSeq]
 * A clock value to help avoid duplicates.
 *
 * Only applicable when `version` is set to `1`.
 */

/**
 * @method reconfigure
 * Reconfigures this generator given new config properties. The only values that this
 * changes are `version` and, if `version` is 1, its related config properties.
 */
