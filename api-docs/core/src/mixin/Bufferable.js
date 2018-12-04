/**
 * @class Ext.mixin.Bufferable
 * @extend Ext.Mixin
 * This class makes buffered methods simple and also handles cleanup on `destroy`.
 *
 *      Ext.define('Foo', {
 *          mixins: [
 *              'Ext.mixin.Bufferable'
 *          ],
 *
 *          bufferableMethods: {
 *              // Provides a "foobar" method that calls "doFoobar" with the
 *              // most recent arguments but delayed by 50ms from the last
 *              // call. Calls to "foobar" made during the 50ms wait restart
 *              // the timer and replace the arguments.
 *
 *              foobar: 50
 *          },
 *
 *          method: function () {
 *              this.foobar(42);  // call doFoobar in 50ms
 *
 *              if (this.isFoobarPending) {
 *                  // test if "foobar" is pending
 *              }
 *
 *              this.flushFoobar();  // actually, call it now
 *
 *              this.cancelFoobar(); // or never mind
 *          },
 *
 *          doFoobar: function () {
 *              // time to do the "foobar" thing
 *          }
 *      });
 *
 * @since 6.5.0
 * @private
 */
