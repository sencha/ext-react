/**
 * @class Ext.Promise
 *
 * This class provides an API compatible implementation of the ECMAScript 6 Promises API
 * (providing an implementation as necessary for browsers that do not natively support the
 * `Promise` class).
 *
 * This class will use the native `Promise` implementation if one is available. The
 * native implementation, while standard, does not provide all of the features of the
 * Ext JS Promises implementation.
 *
 * To use the Ext JS enhanced Promises implementation, see `{@link Ext.Deferred}` for
 * creating enhanced promises and additional static utility methods.
 *
 * Typical usage:
 *
 *      function getAjax (url) {
 *          // The function passed to Ext.Promise() is called immediately to start
 *          // the asynchronous action.
 *          //
 *          return new Ext.Promise(function (resolve, reject) {
 *              Ext.Ajax.request({
 *                  url: url,
 *
 *                  success: function (response) {
 *                      // Use the provided "resolve" method to deliver the result.
 *                      //
 *                      resolve(response.responseText);
 *                  },
 *
 *                  failure: function (response) {
 *                      // Use the provided "reject" method to deliver error message.
 *                      //
 *                      reject(response.status);
 *                  }
 *              });
 *          });
 *      }
 *
 *      getAjax('http://stuff').then(function (content) {
 *          // content is responseText of ajax response
 *      });
 *
 * To adapt the Ext JS `{@link Ext.data.Store store}` to use a Promise, you might do
 * something like this:
 *
 *      loadCompanies: function() {
 *          var companyStore = this.companyStore;
 *
 *          return new Ext.Promise(function (resolve, reject) {
 *              companyStore.load({
 *                  callback: function(records, operation, success) {
 *                      if (success) {
 *                          // Use the provided "resolve" method  to drive the promise:
 *                          resolve(records);
 *                      }
 *                      else {
 *                          // Use the provided "reject" method  to drive the promise:
 *                          reject("Error loading Companies.");
 *                      }
 *                  }
 *              });
 *          });
 *      }
 *
 * @since 6.0.0
 */
