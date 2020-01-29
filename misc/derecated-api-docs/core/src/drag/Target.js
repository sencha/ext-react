/**
 * @class Ext.drag.Target
 * @extend Ext.drag.Item
 * A wrapper around a DOM element that allows it to receive drops.
 *
 * ## Validity of drag operations
 *
 * There are certain conditions that govern whether a {@link Ext.drag.Source source}
 * and a target can interact. By default (without configuration), all {@link Ext.drag.Source sources}
 * and targets can interact with each other, the conditions are evaluated in this order:
 *
 * ### {@link #isDisabled Disabled State}
 * If the target is disabled, the {@link Ext.drag.Source source}
 * cannot interact with it.
 *
 * ### {@link #groups Groups}
 * Both the {@link Ext.drag.Source source} and target can belong to multiple groups.
 * They may interact if:
 * - Neither has a group
 * - Both have one (or more) of the same group
 *
 * ### {@link #accepts Accept}
 * This method is called each time a {@link Ext.drag.Source source} enters this
 * target. If the method returns `false`, the drag is not considered valid.
 *
 * ## Asynchronous drop processing
 *
 *  When the drop completes, the {@link #drop} event will fire, however the underlying data
 * may not be ready to be consumed. By returning a {@link Ext.Promise Promise} from the data,
 * it allows either:
 * - The data to be fetched (either from a remote source or generated if expensive).
 * - Any validation to take place before the drop is finalized.
 *
 * Once the promise is {@link Ext.Promise#resolve resolved} or {@link Ext.Promise#resolve rejected},
 * further processing can be completed.
 *
 * Validation example:
 *
 *
 *      var confirmSource = new Ext.drag.Source({
 *          element: dragEl,
 *          describe: function(info) {
 *              // Provide the data up front
 *              info.setData('records', theRecords);
 *          }
 *      });
 *
 *      var confirmTarget = new Ext.drag.Target({
 *          element: dropEl,
 *          listeners: {
 *              drop: function(target, info) {
 *                  Ext.MessageBox.confirm('Really', 'Are you sure?', function(btn) {
 *                      if (btn === 'yes') {
 *                          info.getData('records').then(function(data) {
 *                              // Process the data
 *                          });
 *                      }
 *                  });
 *              }
 *          }
 *      });
 *
 *
 * Remote data example:
 *
 *      var fetchSource = new Ext.drag.Source({
 *          element: dragEl,
 *          // The resulting drag data will be a binary blob
 *          // of image data, we don't want to fetch it up front, so
 *          // pass a callback to be executed when data is requested.
 *          describe: function(info) {
 *              info.setData('image', function() {
 *                  return Ext.Ajax.request({
 *                      url: 'data.json'
 *                      // some options
 *                  }).then(function(result) {
 *                      var imageData;
 *                      // Do some post-processing
 *                      return imageData;
 *                  }, function() {
 *                      return Ext.Promise.reject('Something went wrong!');
 *                  });
 *              });
 *          }
 *      });
 *
 *      var fetchTarget = new Ext.drag.Target({
 *          element: dropEl,
 *          accepts: function(info) {
 *              return info.types.indexOf('image') > -1;
 *          },
 *          listeners: {
 *              drop: function(target, info) {
 *                  info.getData('image').then(function() {
 *                      // All good, show the image
 *                  }, function() {
 *                      // Handle failure case
 *                  });
 *              }
 *          }
 *      });
 *
 */

/**
 * @cfg {String} [invalidCls='']
 * A class to add to the {@link #element} when an
 * invalid drag is over this target.
 * @accessor
 */

/**
 * @cfg {String} [validCls='']
 * A class to add to the {@link #element} when an
 * invalid drag is over this target.
 */

/**
 * @cfg {Function} accepts
 * See {@link #method-accepts}.
 */

/**
 * @event beforedrop
 * Fires before a valid drop occurs. Return `false` to prevent the drop from
 * completing.
 *
 * @param {Ext.drag.Target} this This target.
 * @param {Ext.drag.Info} info The drag info.
 */

/**
 * @event drop
 * Fires when a valid drop occurs.
 *
 * @param {Ext.drag.Target} this This target.
 * @param {Ext.drag.Info} info The drag info.
 */

/**
 * @event dragenter
 * Fires when a drag enters this target.
 *
 * @param {Ext.drag.Target} this This target.
 * @param {Ext.drag.Info} info The drag info.
 */

/**
 * @event dragleave
 * Fires when a source leaves this target.
 *
 * @param {Ext.drag.Target} this This target.
 * @param {Ext.drag.Info} info The drag info.
 */

/**
 * @event dragmove
 * Fires when a drag moves while inside this target.
 *
 * @param {Ext.drag.Target} this This target.
 * @param {Ext.drag.Info} info The drag info.
 */

/**
 * @method disable
 * @inheritdoc
 */

/**
 * @method enable
 * @inheritdoc
 */
