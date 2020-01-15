/**
 * @class Ext.Media
 * @extend Ext.Component
 * @xtype media
 *
 * Provides a base class for audio/visual controls. Should not be used directly.
 *
 * Please see the {@link Ext.Audio} and {@link Ext.Video} classes for more information.
 * @private
 */

/**
 * @event play
 * Fires whenever the media is played.
 * @param {Ext.Media} this
 */

/**
 * @event pause
 * Fires whenever the media is paused.
 * @param {Ext.Media} this
 * @param {Number} time The time at which the media was paused at in seconds.
 */

/**
 * @event ended
 * Fires whenever the media playback has ended.
 * @param {Ext.Media} this
 * @param {Number} time The time at which the media ended at in seconds.
 */

/**
 * @event stop
 * Fires whenever the media is stopped.
 * The `pause` event will also fire after the `stop` event if the media is currently playing.
 * The `timeupdate` event will also fire after the `stop` event regardless of playing status.
 * @param {Ext.Media} this
 */

/**
 * @event volumechange
 * Fires whenever the volume is changed.
 * @param {Ext.Media} this
 * @param {Number} volume The volume level from 0 to 1.
 */

/**
 * @event mutedchange
 * Fires whenever the muted status is changed.
 * The volumechange event will also fire after the `mutedchange` event fires.
 * @param {Ext.Media} this
 * @param {Boolean} muted The muted status.
 */

/**
 * @event timeupdate
 * Fires when the media is playing every 15 to 250ms.
 * @param {Ext.Media} this
 * @param {Number} time The current time in seconds.
 */

/**
 * @cfg {String} [url='']
 * Location of the media to play.
 * @accessor
 */

/**
 * @cfg {Boolean} enableControls
 * Set this to `false` to turn off the native media controls.
 * Defaults to `false` when you are on Android, as it doesn't support controls.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoResume=false]
 * Will automatically start playing the media when the container is activated.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoPause=true]
 * Will automatically pause the media when the container is deactivated.
 * @accessor
 */

/**
 * @cfg {Boolean} [preload=true]
 * Will begin preloading the media immediately.
 * @accessor
 */

/**
 * @cfg {Boolean} [loop=false]
 * Will loop the media forever.
 * @accessor
 */

/**
 * @cfg {Ext.Element} [media=null]
 * A reference to the underlying audio/video element.
 * @accessor
 */

/**
 * @cfg {Number} [volume=1]
 * The volume of the media from 0.0 to 1.0.
 * @accessor
 */

/**
 * @cfg {Boolean} [muted=false]
 * Whether or not the media is muted. This will also set the volume to zero.
 * @accessor
 */
