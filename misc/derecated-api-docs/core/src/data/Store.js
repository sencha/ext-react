/**
 * @class Ext.data.Store
 * @extend Ext.data.ProxyStore
 * @alias store.store
 * @mixins Ext.data.LocalStore
 *
 * The Store class encapsulates a client side cache of {@link Ext.data.Model Model} objects. Stores load data via a
 * {@link Ext.data.proxy.Proxy Proxy}, and also provide functions for {@link #method-sort sorting}, {@link #filter filtering}
 * and querying the {@link Ext.data.Model model} instances contained within it.
 *
 * Creating a Store is easy - we just tell it the Model and the Proxy to use for loading and saving its data:
 *
 *      // Set up a model to use in our Store
 *      Ext.define('User', {
 *          extend: 'Ext.data.Model',
 *          fields: [
 *              {name: 'firstName', type: 'string'},
 *              {name: 'lastName',  type: 'string'},
 *              {name: 'age',       type: 'int'},
 *              {name: 'eyeColor',  type: 'string'}
 *          ]
 *      });
 *
 *      let myStore = new Ext.data.Store({
 *          model: 'User',
 *          proxy: {
 *              type: 'ajax',
 *              url: '/users.json',
 *              reader: {
 *                  type: 'json',
 *                  rootProperty: 'users'
 *              }
 *          },
 *          autoLoad: true
 *      });
 *
 * In the example above we configured an AJAX proxy to load data from the url '/users.json'. We told our Proxy to use a
 * {@link Ext.data.reader.Json JsonReader} to parse the response from the server into Model object - {@link
 * Ext.data.reader.Json see the docs on JsonReader} for details.
 *
 * ## Inline data
 *
 * Stores can also load data inline. Internally, Store converts each of the objects we pass in as {@link #cfg-data} into
 * Model instances:
 *
 *      new Ext.data.Store({
 *          model: 'User',
 *          data : [
 *              {firstName: 'Peter',   lastName: 'Venkman'},
 *              {firstName: 'Egon',    lastName: 'Spengler'},
 *              {firstName: 'Ray',     lastName: 'Stantz'},
 *              {firstName: 'Winston', lastName: 'Zeddemore'}
 *          ]
 *      });
 *
 * Loading inline data using the method above is great if the data is in the correct format already (e.g. it doesn't
 * need to be processed by a {@link Ext.data.reader.Reader reader}). If your inline data requires processing to decode
 * the data structure, use a {@link Ext.data.proxy.Memory MemoryProxy} instead (see the {@link Ext.data.proxy.Memory
 * MemoryProxy} docs for an example).
 *
 * Additional data can also be loaded locally using {@link #method-add}.
 * 
 * ## Dynamic Loading
 *
 * Stores can be dynamically updated by calling the {@link #method-load} method:
 *
 *     store.load({
 *         params: {
 *             group: 3,
 *             type: 'user'
 *         },
 *         callback: function(records, operation, success) {
 *             // do something after the load finishes
 *         },
 *         scope: this
 *     });
 *
 * Here a bunch of arbitrary parameters is passed along with the load request and a callback function is set
 * up to do something after the loading is over.
 *
 * ## Loading Nested Data
 *
 * Applications often need to load sets of associated data - for example a CRM system might load a User and her Orders.
 * Instead of issuing an AJAX request for the User and a series of additional AJAX requests for each Order, we can load
 * a nested dataset and allow the Reader to automatically populate the associated models. Below is a brief example, see
 * the {@link Ext.data.reader.Reader} intro docs for a full explanation:
 *
 *      let store = new Ext.data.Store({
 *          autoLoad: true,
 *          model: "User",
 *          proxy: {
 *              type: 'ajax',
 *              url: 'users.json',
 *              reader: {
 *                  type: 'json',
 *                  rootProperty: 'users'
 *              }
 *          }
 *      });
 *
 * Which would consume a response like this:
 *
 *      {
 *          "users": [{
 *              "id": 1,
 *              "name": "Peter",
 *              "orders": [{
 *                  "id": 10,
 *                  "total": 10.76,
 *                  "status": "invoiced"
 *             },{
 *                  "id": 11,
 *                  "total": 13.45,
 *                  "status": "shipped"
 *             }]
 *          }]
 *      }
 *
 * See the {@link Ext.data.reader.Reader} intro docs for a full explanation.
 *
 * ## Filtering and Sorting
 *
 * Stores can be sorted and filtered - in both cases either remotely or locally. The {@link #cfg-sorters} and
 * {@link #cfg-filters} are held inside {@link Ext.util.Collection Collection} instances to make them easy to manage.
 * Usually it is sufficient to either just specify sorters and filters in the Store configuration or call {@link #method-sort}
 * or {@link #filter}:
 *
 *      let store = new Ext.data.Store({
 *          model: 'User',
 *          sorters: [{
 *              property: 'age',
 *              direction: 'DESC'
 *          }, {
 *              property: 'firstName',
 *              direction: 'ASC'
 *          }],
 *
 *          filters: [{
 *              property: 'firstName',
 *              value: /Peter/
 *          }]
 *      });
 *
 * The new Store will keep the configured sorters and filters in the Collection instances mentioned above. By
 * default, sorting and filtering are both performed locally by the Store - see {@link #remoteSort} and
 * {@link #remoteFilter} to allow the server to perform these operations instead.
 *
 * Filtering and sorting after the Store has been instantiated is also easy. Calling {@link #filter} adds another filter
 * to the Store and automatically filters the dataset (calling {@link #filter} with no arguments simply re-applies all
 * existing filters).
 *
 *     store.filter('eyeColor', 'Brown');
 *
 * Change the sorting at any time by calling {@link #method-sort}:
 *
 *     store.sort('height', 'ASC');
 *
 * Note that all existing sorters will be removed in favor of the new sorter data (if {@link #method-sort} is called with no
 * arguments, the existing sorters are just reapplied instead of being removed). To keep existing sorters and add new
 * ones, just add them to the Collection:
 *
 *     store.sorters.add(new Ext.util.Sorter({
 *         property : 'shoeSize',
 *         direction: 'ASC'
 *     }));
 *
 *     store.sort();
 *
 * ## Registering with StoreManager
 *
 * Any Store that is instantiated with a {@link #storeId} will automatically be registered with the {@link
 * Ext.data.StoreManager StoreManager}. This makes it easy to reuse the same store in multiple views:
 *
 *     //this store can be used several times
 *     new Ext.data.Store({
 *         model: 'User',
 *         storeId: 'usersStore'
 *     });
 *
 *     new Ext.List({
 *         store: 'usersStore',
 *         //other config goes here
 *     });
 *
 *     new Ext.view.View({
 *         store: 'usersStore',
 *         //other config goes here
 *     });
 *
 * ## Further Reading
 *
 * Stores are backed up by an ecosystem of classes that enables their operation. To gain a full understanding of these
 * pieces and how they fit together, see:
 *
 *   - {@link Ext.data.proxy.Proxy Proxy} - overview of what Proxies are and how they are used
 *   - {@link Ext.data.Model Model} - the core class in the data package
 *   - {@link Ext.data.reader.Reader Reader} - used by any subclass of {@link Ext.data.proxy.Server ServerProxy} to read a response
 */

/**
 * @cfg {Object[]/Ext.data.Model[]} [data=undefined]
 * Array of Model instances or data objects to load locally. See "Inline data"
 * above for details.
 * @accessor
 */

/**
* @cfg {Boolean} [clearRemovedOnLoad=true]
* `true` to clear anything in the {@link #removed} record collection when the store loads.
 * @accessor
*/

/**
* @cfg {Boolean} [clearOnPageLoad=true]
* True to empty the store when loading another page via {@link #loadPage},
* {@link #nextPage} or {@link #previousPage}. Setting to false keeps existing records, allowing
* large data sets to be loaded one page at a time but rendered all together.
 * @accessor
*/

/**
 * @cfg {Ext.data.Session} [session=null]
 * The session for this store. By specifying a session, it ensures any records that are
 * added to this store are also included in the session. This store does not become a member
 * of the session itself.
 *
 * @since  5.0.0
 * @accessor
 */

/**
 * @method constructor
 * @constructor
 * Creates the store.
 * @param {Object} [config] Config object.
 */

/**
 * @event beforeprefetch
 * Fires before a prefetch occurs. Return `false` to cancel.
 * @param {Ext.data.Store} this
 * @param {Ext.data.operation.Operation} operation The associated operation.
 */

/**
 * @event groupchange
 * Fired whenever the grouping in the grid changes.
 * @param {Ext.data.Store} store The store.
 * @param {Ext.util.Grouper} grouper The grouper object.
 */

/**
 * @event prefetch
 * Fires whenever records have been prefetched.
 * @param {Ext.data.Store} this
 * @param {Ext.data.Model[]} records An array of records.
 * @param {Boolean} successful `true` if the operation was successful.
 * @param {Ext.data.operation.Operation} operation The associated operation.
 */

/**
 * @event filterchange
 * Fired whenever the filter set changes.
 * @param {Ext.data.Store} store The store.
 * @param {Ext.util.Filter[]} filters The array of Filter objects.
 */

/**
 * @method getData
 * Returns the store's records.
 *
 * **Note:** If your store has been filtered, getData() will return a filtered
 * collection.  Use `getData().{@link Ext.util.Collection#getSource getSource()}` to
 * fetch all unfiltered records.
 *
 * @return {Ext.util.Collection} An Ext.util.Collection of records
 * (an empty Collection if no records are held by the store).
 */

/**
 * @method setData
 * Loads an array of data directly into the Store.
 *
 * setData() is ideal if your data's format is already in its appropriate format (e.g. it doesn't need to be
 * processed by a reader). If your data's structure requires processing, use a
 * {@link Ext.data.proxy.Memory MemoryProxy} or {@link #loadRawData}.
 *
 * Use {@link #loadData}, {@link #method-add}, or {@link #insert} if records need to be
 * appended to the current recordset.
 *
 * @param {Ext.data.Model[]/Object[]} data Array of data to load. Any non-model instances will be cast
 * into model instances first.
 */

/**
 * @method insert
 * @inheritdoc Ext.data.LocalStore#insert
 */

/**
 * @method add
 * @inheritdoc Ext.data.LocalStore#add
 */

/**
 * @method addSorted
 * (Local sort only) Inserts the passed Record into the Store at the index where it
 * should go based on the current sort information.
 *
 * @param {Ext.data.Record} record
 */

/**
 * @method remove
 * Removes the specified record(s) from the Store, firing the {@link #event-remove}
 * event for the removed records.
 *
 * After all records have been removed a single `datachanged` is fired.
 *
 * @param {Ext.data.Model/Ext.data.Model[]/Number/Number[]} records Model instance or
 * array of instances to remove or an array of indices from which to remove records.
 * @param isMove (private)
 * @param silent (private)
 */

/**
 * @method removeAt
 * Removes the model instance(s) at the given index
 * @param {Number} index The record index
 * @param {Number} [count=1] The number of records to delete
 */

/**
 * @method removeAll
 * Removes all unfiltered items from the store.  Filtered records will not be removed.
 * Individual record `{@link #event-remove}` events are not fired by this method.
 *
 * @param {Boolean} [silent=false] Pass `true` to prevent the `{@link #event-clear}` event from being fired.
 * @return {Ext.data.Model[]} The removed records.
 */

/**
 * @method loadData
 * Loads an array of data straight into the Store.
 *
 * Using this method is great if the data is in the correct format already (e.g. it doesn't need to be
 * processed by a reader). If your data requires processing to decode the data structure, use a
 * {@link Ext.data.proxy.Memory MemoryProxy} or {@link #loadRawData}.
 *
 * @param {Ext.data.Model[]/Object[]} data Array of data to load. Any non-model instances will be cast
 * into model instances first.
 * @param {Boolean} [append=false] `true` to add the records to the existing records in the store, `false`
 * to remove the old ones first.
 */

/**
 * @method loadRawData
 * Loads data via the bound Proxy's reader
 *
 * Use this method if you are attempting to load data and want to utilize the configured data reader.
 *
 * As of 4.2, this method will no longer fire the {@link #event-load} event.
 *
 * @param {Object[]} data The full JSON object you'd like to load into the Data store.
 * @param {Boolean} [append=false] `true` to add the records to the existing records in the store, `false`
 * to remove the old ones first.
 *
 * @return {Boolean} `true` if the reader processed the records correctly. See {@link Ext.data.reader.Reader#successProperty}.
 * If the reader did not process the records, nothing will be added.
 */

/**
 * @method loadRecords
 * Loads an array of {@link Ext.data.Model model} instances into the store, fires the datachanged event. This should only usually
 * be called internally when loading from the {@link Ext.data.proxy.Proxy Proxy}, when adding records manually use {@link #method-add} instead
 * @param {Ext.data.Model[]} records The array of records to load
 * @param {Object} options
 * @param {Boolean} [options.addRecords=false] Pass `true` to add these records to the existing records, `false` to remove the Store's existing records first.
 */

/**
 * @method loadPage
 * Loads a given 'page' of data by setting the start and limit values appropriately. Internally this just causes a normal
 * load operation, passing in calculated 'start' and 'limit' params.
 * @param {Number} page The number of the page to load.
 * @param {Object} [options] See options for {@link #method-load}.
 */

/**
 * @method nextPage
 * Loads the next 'page' in the current data set
 * @param {Object} options See options for {@link #method-load}
 */

/**
 * @method previousPage
 * Loads the previous 'page' in the current data set
 * @param {Object} options See options for {@link #method-load}
 */

/**
 * @method commitChanges
 * Commits all Records with {@link #getModifiedRecords outstanding changes}. To handle updates for changes,
 * subscribe to the Store's {@link #event-update update event}, and perform updating when the third parameter is
 * Ext.data.Record.COMMIT.
 */

/**
 * @method rejectChanges
 * {@link Ext.data.Model#reject Rejects} outstanding changes on all {@link #getModifiedRecords modified records}
 * and re-insert any records that were removed locally. Any phantom records will be removed.
 */

/**
 * @method each
 * @inheritdoc Ext.data.LocalStore#each
 */

/**
 * @method collect
 * @inheritdoc Ext.data.LocalStore#collect
 */

/**
 * @method getById
 * @inheritdoc Ext.data.LocalStore#getById
 */

/**
 * @method getByInternalId
 * @inheritdoc Ext.data.LocalStore#getByInternalId
 */

/**
 * @method indexOf
 * @inheritdoc Ext.data.LocalStore#indexOf
 */

/**
 * @method indexOfId
 * @inheritdoc Ext.data.LocalStore#indexOfId
 */

/**
 * @method queryBy
 * @inheritdoc Ext.data.LocalStore#queryBy
 */

/**
 * @method query
 * @inheritdoc Ext.data.LocalStore#query
 */

/**
 * @method first
 * @inheritdoc Ext.data.LocalStore#first
 */

/**
 * @method last
 * @inheritdoc Ext.data.LocalStore#last
 */

/**
 * @method sum
 * @inheritdoc Ext.data.LocalStore#sum
 */

/**
 * @method count
 * @inheritdoc Ext.data.LocalStore#count
 */

/**
 * @method min
 * @inheritdoc Ext.data.LocalStore#min
 */

/**
 * @method max
 * @inheritdoc Ext.data.LocalStore#max
 */

/**
 * @method average
 * @inheritdoc Ext.data.LocalStore#average
 */

/**
 * @method aggregate
 * @inheritdoc Ext.data.LocalStore#aggregate
 */
