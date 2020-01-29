/**
 * @class Ext.ux.ajax.SimManager
 * @singleton
 * This singleton manages simulated Ajax responses. This allows application logic to be
 * written unaware that its Ajax calls are being handled by simulations ("simlets"). This
 * is currently done by hooking {@link Ext.data.Connection} methods, so all users of that
 * class (and {@link Ext.Ajax} since it is a derived class) qualify for simulation.
 *
 * The requires hooks are inserted when either the {@link #init} method is called or the
 * first {@link Ext.ux.ajax.Simlet} is registered. For example:
 *
 *      Ext.onReady(function () {
 *          initAjaxSim();
 *
 *          // normal stuff
 *      });
 *
 *      function initAjaxSim () {
 *          Ext.ux.ajax.SimManager.init({
 *              delay: 300
 *          }).register({
 *              '/app/data/url': {
 *                  type: 'json',  // use JsonSimlet (type is like xtype for components)
 *                  data: [
 *                      { foo: 42, bar: 'abc' },
 *                      ...
 *                  ]
 *              }
 *          });
 *      }
 *
 * As many URL's as desired can be registered and associated with a {@link Ext.ux.ajax.Simlet}. To make
 * non-simulated Ajax requests once this singleton is initialized, add a `nosim:true` option
 * to the Ajax options:
 *
 *      Ext.Ajax.request({
 *          url: 'page.php',
 *          nosim: true, // ignored by normal Ajax request
 *          params: {
 *              id: 1
 *          },
 *          success: function(response){
 *              var text = response.responseText;
 *              // process server response here
 *          }
 *      });
 */

/**
 * @cfg {Ext.ux.ajax.Simlet} defaultSimlet
 * The {@link Ext.ux.ajax.Simlet} instance to use for non-matching URL's. By default, this will
 * return 404. Set this to null to use real Ajax calls for non-matching URL's.
 */

/**
 * @cfg {String} [defaultType="basic"]
 * The default `type` to apply to generic {@link Ext.ux.ajax.Simlet} configuration objects. The
 * default is 'basic'.
 */

/**
 * @cfg {Number} [delay=150]
 * The number of milliseconds to delay before delivering a response to an async request.
 */
