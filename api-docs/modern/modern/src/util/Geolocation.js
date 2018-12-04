/**
 * @class Ext.util.Geolocation
 * @extend Ext.Evented
 * Provides a cross browser class for retrieving location information.
 *
 * Based on the [Geolocation API Specification](http://dev.w3.org/geo/api/spec-source.html)
 *
 * When instantiated, by default this class immediately begins tracking location information,
 * firing a {@link #locationupdate} event when new location information is available.  To disable this
 * location tracking (which may be battery intensive on mobile devices), set {@link #autoUpdate} to `false`.
 *
 * When this is done, only calls to {@link #updateLocation} will trigger a location retrieval.
 *
 * A {@link #locationerror} event is raised when an error occurs retrieving the location, either due to a user
 * denying the application access to it, or the browser not supporting it.
 *
 * The below code shows a GeoLocation making a single retrieval of location information.
 *
 *     var geo = Ext.create('Ext.util.Geolocation', {
 *         autoUpdate: false,
 *         listeners: {
 *             locationupdate: function(geo) {
 *                 alert('New latitude: ' + geo.getLatitude());
 *             },
 *             locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
 *                 if(bTimeout){
 *                     alert('Timeout occurred.');
 *                 } else {
 *                     alert('Error occurred.');
 *                 }
 *             }
 *         }
 *     });
 *     geo.updateLocation();
 */

/**
 * @event locationerror
 * Raised when a location retrieval operation failed.
 *
 * In the case of calling updateLocation, this event will be raised only once.
 *
 * If {@link #autoUpdate} is set to `true`, this event could be raised repeatedly.
 * The first error is relative to the moment {@link #autoUpdate} was set to `true`
 * (or this {@link Ext.util.Geolocation} was initialized with the {@link #autoUpdate} config option set to `true`).
 * Subsequent errors are relative to the moment when the device determines that it's position has changed.
 * @param {Ext.util.Geolocation} this
 * @param {Boolean} timeout
 * Boolean indicating a timeout occurred
 * @param {Boolean} permissionDenied
 * Boolean indicating the user denied the location request
 * @param {Boolean} locationUnavailable
 * Boolean indicating that the location of the device could not be determined.
 * For instance, one or more of the location providers used in the location acquisition
 * process reported an internal error that caused the process to fail entirely.
 * @param {String} message An error message describing the details of the error encountered.
 *
 * This attribute is primarily intended for debugging and should not be used
 * directly in an application user interface.
 * @accessor
 */

/**
 * @event locationupdate
 * Raised when a location retrieval operation has been completed successfully.
 * @param {Ext.util.Geolocation} this
 * Retrieve the current location information from the GeoLocation object by using the read-only
 * properties: {@link #latitude}, {@link #longitude}, {@link #accuracy},
 * {@link #altitude}, {@link #altitudeAccuracy}, {@link #heading}, and {@link #speed}.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoUpdate=true]
 * When set to `true`, continually monitor the location of the device (beginning immediately)
 * and fire {@link #locationupdate} and {@link #locationerror} events.
 * @accessor
 */

/**
 * @cfg {Number} [frequency=10000]
 * The frequency of each update if {@link #autoUpdate} is set to `true`.
 * @accessor
 */

/**
 * @cfg {Boolean} [allowHighAccuracy=false]
 * When set to `true`, provide a hint that the application would like to receive
 * the best possible results. This may result in slower response times or increased power consumption.
 * The user might also deny this capability, or the device might not be able to provide more accurate
 * results than if this option was set to `false`.
 * @accessor
 */

/**
 * @cfg {Number} [timeout=Infinity]
 * The maximum number of milliseconds allowed to elapse between a location update operation
 * and the corresponding {@link #locationupdate} event being raised.  If a location was not successfully
 * acquired before the given timeout elapses (and no other internal errors have occurred in this interval),
 * then a {@link #locationerror} event will be raised indicating a timeout as the cause.
 *
 * Note that the time that is spent obtaining the user permission is **not** included in the period
 * covered by the timeout.  The `timeout` attribute only applies to the location acquisition operation.
 *
 * In the case of calling `updateLocation`, the {@link #locationerror} event will be raised only once.
 *
 * If {@link #autoUpdate} is set to `true`, the {@link #locationerror} event could be raised repeatedly.
 * The first timeout is relative to the moment {@link #autoUpdate} was set to `true`
 * (or this {@link Ext.util.Geolocation} was initialized with the {@link #autoUpdate} config option set to `true`).
 * Subsequent timeouts are relative to the moment when the device determines that it's position has changed.
 * @accessor
 */

/**
 * @cfg {Number} [maximumAge=0]
 * This option indicates that the application is willing to accept cached location information whose age
 * is no greater than the specified time in milliseconds. If `maximumAge` is set to 0, an attempt to retrieve
 * new location information is made immediately.
 *
 * Setting the `maximumAge` to Infinity returns a cached position regardless of its age.
 *
 * If the device does not have cached location information available whose age is no
 * greater than the specified `maximumAge`, then it must acquire new location information.
 *
 * For example, if location information no older than 10 minutes is required, set this property to 600000.
 * @accessor
 */

