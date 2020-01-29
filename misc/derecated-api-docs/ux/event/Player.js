/**
 * @class Ext.ux.event.Player
 * @extends Ext.ux.event.Driver
 * This class manages the playback of an array of "event descriptors". For details on the
 * contents of an "event descriptor", see {@link Ext.ux.event.Recorder}. The events recorded by the
 * {@link Ext.ux.event.Recorder} class are designed to serve as input for this class.
 * 
 * The simplest use of this class is to instantiate it with an {@link #eventQueue} and call
 * {@link #method-start}. Like so:
 *
 *      var player = Ext.create('Ext.ux.event.Player', {
 *          eventQueue: [ ... ],
 *          speed: 2,  // play at 2x speed
 *          listeners: {
 *              stop: function () {
 *                  player = null; // all done
 *              }
 *          }
 *      });
 *
 *      player.start();
 *
 * A more complex use would be to incorporate keyframe generation after playing certain
 * events.
 *
 *      var player = Ext.create('Ext.ux.event.Player', {
 *          eventQueue: [ ... ],
 *          keyFrameEvents: {
 *              click: true
 *          },
 *          listeners: {
 *              stop: function () {
 *                  // play has completed... probably time for another keyframe...
 *                  player = null;
 *              },
 *              keyframe: onKeyFrame
 *          }
 *      });
 *
 *      player.start();
 *
 * If a keyframe can be handled immediately (synchronously), the listener would be:
 *
 *      function onKeyFrame () {
 *          handleKeyFrame();
 *      }
 *
 *  If the keyframe event is always handled asynchronously, then the event listener is only
 *  a bit more:
 *
 *      function onKeyFrame (p, eventDescriptor) {
 *          eventDescriptor.defer(); // pause event playback...
 *
 *          handleKeyFrame(function () {
 *              eventDescriptor.finish(); // ...resume event playback
 *          });
 *      }
 *
 * Finally, if the keyframe could be either handled synchronously or asynchronously (perhaps
 * differently by browser), a slightly more complex listener is required.
 *
 *      function onKeyFrame (p, eventDescriptor) {
 *          var async;
 *
 *          handleKeyFrame(function () {
 *              // either this callback is being called immediately by handleKeyFrame (in
 *              // which case async is undefined) or it is being called later (in which case
 *              // async will be true).
 *
 *              if (async) {
 *                  eventDescriptor.finish();
 *              } else {
 *                  async = false;
 *              }
 *          });
 *
 *          // either the callback was called (and async is now false) or it was not
 *          // called (and async remains undefined).
 *
 *          if (async !== false) {
 *              eventDescriptor.defer();
 *              async = true; // let the callback know that we have gone async
 *          }
 *      }
 */

/**
 * @cfg {Array} eventQueue The event queue to playback. This must be provided before
 * the {@link #method-start} method is called.
 */

/**
 * @cfg {Object} [keyFrameEvents=true] An object that describes the events that should generate
 * keyframe events. For example, `{ click: true }` would generate keyframe events after
 * each `click` event.
 */

/**
 * @cfg {Boolean} [pauseForAnimations=true] True to pause event playback during animations, false
 * to ignore animations. Default is true.
 */

/**
 * @cfg {Number} [speed=1.0] The playback speed multiplier. Default is 1.0 (to playback at the
 * recorded speed). A value of 2 would playback at 2x speed.
 */

/**
 * @event beforeplay
 * Fires before an event is played.
 * @param {Ext.ux.event.Player} this
 * @param {Object} eventDescriptor The event descriptor about to be played.
 */

/**
 * @event keyframe
 * Fires when this player reaches a keyframe. Typically, this is after events
 * like `click` are injected and any resulting animations have been completed.
 * @param {Ext.ux.event.Player} this
 * @param {Object} eventDescriptor The keyframe event descriptor.
 */
