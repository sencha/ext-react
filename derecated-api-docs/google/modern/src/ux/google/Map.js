/**
 * @class Ext.ux.google.Map
 * @extend Ext.Container
 * @xtype map
 * @xtype google-map
 * @mixins Ext.mixin.Mashup
 * Wraps a Google Map in an Ext.Component using the
 * [Google Maps API](http://code.google.com/apis/maps/documentation/v3/introduction.html).
 *
 * This component will automatically include the google maps API script from:
 * `//maps.google.com/maps/api/js`
 *
 */

/**
 * @event maprender
 * Fired when Map initially rendered.
 * @param {Ext.ux.google.Map} this
 * @param {google.maps.Map} map The rendered google.map.Map instance
 */

/**
 * @event centerchange
 * Fired when map is panned around.
 * @param {Ext.ux.google.Map} this
 * @param {google.maps.Map} map The rendered google.map.Map instance
 * @param {google.maps.LatLng} center The current LatLng center of the map
 */

/**
 * @event typechange
 * Fired when display type of the map changes.
 * @param {Ext.ux.google.Map} this
 * @param {google.maps.Map} map The rendered google.map.Map instance
 * @param {Number} mapType The current display type of the map
 */

/**
 * @event zoomchange
 * Fired when map is zoomed.
 * @param {Ext.ux.google.Map} this
 * @param {google.maps.Map} map The rendered google.map.Map instance
 * @param {Number} zoomLevel The current zoom level of the map
 */

/**
 * @event markerclick
 * Fired when the marker icon was clicked.
 * @param {Ext.ux.google.Map} map This map instance
 * @param {Object} info Information about this event
 * @param {Number} info.index The index of the marker record
 * @param {Ext.data.Model} info.record The record associated to the marker
 * @param {google.maps.Marker} info.marker The [Google Map marker](https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker)
 * @param {google.maps.MouseEvent} info.event The [Google Map event](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MouseEvent)
 */

/**
 * @event markerdblclick
 * Fired when the marker icon was double clicked.
 * @param {Ext.ux.google.Map} map This map instance
 * @param {Object} info Information about this event
 * @param {Number} info.index The index of the marker record
 * @param {Ext.data.Model} info.record The record associated to the marker
 * @param {google.maps.Marker} info.marker The [Google Map marker](https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker)
 * @param {google.maps.MouseEvent} info.event The [Google Map event](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MouseEvent)
 */

/**
 * @event markerdrag
 * Repeatedly fired while the user drags the marker.
 * @param {Ext.ux.google.Map} map This map instance
 * @param {Object} info Information about this event
 * @param {Number} info.index The index of the marker record
 * @param {Ext.data.Model} info.record The record associated to the marker
 * @param {google.maps.Marker} info.marker The [Google Map marker](https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker)
 * @param {google.maps.MouseEvent} info.event The [Google Map event](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MouseEvent)
 */

/**
 * @event markerdragend
 * Fired when the user stops dragging the marker.
 * @param {Ext.ux.google.Map} map This map instance
 * @param {Object} info Information about this event
 * @param {Number} info.index The index of the marker record
 * @param {Ext.data.Model} info.record The record associated to the marker
 * @param {google.maps.Marker} info.marker The [Google Map marker](https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker)
 * @param {google.maps.MouseEvent} info.event The [Google Map event](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MouseEvent)
 */

/**
 * @event markerdragstart
 * Fired when the user starts dragging the marker.
 * @param {Ext.ux.google.Map} map This map instance
 * @param {Object} info Information about this event
 * @param {Number} info.index The index of the marker record
 * @param {Ext.data.Model} info.record The record associated to the marker
 * @param {google.maps.Marker} info.marker The [Google Map marker](https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker)
 * @param {google.maps.MouseEvent} info.event The [Google Map event](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MouseEvent)
 */

/**
 * @event markermousedown
 * Fired for a mousedown on the marker.
 * @param {Ext.ux.google.Map} map This map instance
 * @param {Object} info Information about this event
 * @param {Number} info.index The index of the marker record
 * @param {Ext.data.Model} info.record The record associated to the marker
 * @param {google.maps.Marker} info.marker The [Google Map marker](https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker)
 * @param {google.maps.MouseEvent} info.event The [Google Map event](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MouseEvent)
 */

/**
 * @event markermouseout
 * Fired when the mouse leaves the area of the marker icon.
 * @param {Ext.ux.google.Map} map This map instance
 * @param {Object} info Information about this event
 * @param {Number} info.index The index of the marker record
 * @param {Ext.data.Model} info.record The record associated to the marker
 * @param {google.maps.Marker} info.marker The [Google Map marker](https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker)
 * @param {google.maps.MouseEvent} info.event The [Google Map event](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MouseEvent)
 */

/**
 * @event markermouseover
 * Fired when the mouse enters the area of the marker icon.
 * @param {Ext.ux.google.Map} map This map instance
 * @param {Object} info Information about this event
 * @param {Number} info.index The index of the marker record
 * @param {Ext.data.Model} info.record The record associated to the marker
 * @param {google.maps.Marker} info.marker The [Google Map marker](https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker)
 * @param {google.maps.MouseEvent} info.event The [Google Map event](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MouseEvent)
 */

/**
 * @event markermouseup
 * Fired for a mouseup on the marker.
 * @param {Ext.ux.google.Map} map This map instance
 * @param {Object} info Information about this event
 * @param {Number} info.index The index of the marker record
 * @param {Ext.data.Model} info.record The record associated to the marker
 * @param {google.maps.Marker} info.marker The [Google Map marker](https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker)
 * @param {google.maps.MouseEvent} info.event The [Google Map event](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MouseEvent)
 */

/**
 * @event markerrightclick
 * Fired for a rightclick on the marker.
 * @param {Ext.ux.google.Map} map This map instance
 * @param {Object} info Information about this event
 * @param {Number} info.index The index of the marker record
 * @param {Ext.data.Model} info.record The record associated to the marker
 * @param {google.maps.Marker} info.marker The [Google Map marker](https://developers.google.com/maps/documentation/javascript/3.exp/reference#Marker)
 * @param {google.maps.MouseEvent} info.event The [Google Map event](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MouseEvent)
 */

/**
 * @cfg {Boolean/Ext.util.Geolocation} [useCurrentLocation=false]
 * Pass in true to center the map based on the geolocation coordinates or pass a
 * {@link Ext.util.Geolocation GeoLocation} config to have more control over your GeoLocation options
 * @accessor
 */

/**
 * @cfg {google.maps.Map} [map=null]
 * The wrapped map.
 * @accessor
 */

/**
 * @cfg {Ext.util.Geolocation} [geo=null]
 * Geolocation provider for the map.
 * @accessor
 */

/**
 * @cfg {Object} [mapOptions]
 * MapOptions as specified by the Google Documentation:
 * [http://code.google.com/apis/maps/documentation/v3/reference.html](http://code.google.com/apis/maps/documentation/v3/reference.html)
 * @accessor
 */

/**
 * @cfg {Object} [mapListeners=null]
 * Listeners for any Google Maps events specified by the Google Documentation:
 * [http://code.google.com/apis/maps/documentation/v3/reference.html](http://code.google.com/apis/maps/documentation/v3/reference.html)
 *
 * @accessor
 */

/**
 * @cfg {Ext.data.Store/Object/Ext.data.Model[]/Ext.ux.google.map.Marker} [markers=null]
 * Can be either a Store instance, a configuration object that will be turned into a
 * store, an array of model or a single model (in which case a store will be created).
 * The Store is used to populate the set of markers that will be rendered in the map.
 * Marker options are read through the {@link #markerTemplate} config.
 */

/**
 * @cfg {Object/Ext.util.ObjectTemplate} [markerTemplate]
 * This is a template used to produce marker options from the {@link #markers} records.
 * See {@link Ext.ux.google.map.Marker} for details.
 * @accessor
 */
