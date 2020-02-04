/**
 * @class Ext.util.Filter
 * Represents a filter that can be applied to a {@link Ext.util.MixedCollection MixedCollection}. Can either simply
 * filter on a property/value pair or pass in a filter function with custom logic. Filters are always used in the
 * context of MixedCollections, though {@link Ext.data.Store Store}s frequently create them when filtering and searching
 * on their records. Example usage:
 *
 *     // Set up a fictional MixedCollection containing a few people to filter on
 *     var allNames = new Ext.util.MixedCollection();
 *     allNames.addAll([
 *         { id: 1, name: 'Peter',  age: 25 },
 *         { id: 2, name: 'Egon',   age: 37 },
 *         { id: 3, name: 'Ray',    age: 32 },
 *         { id: 4, name: 'Winston',age: 26 }
 *     ]);
 *
 *     var ageFilter = new Ext.util.Filter({
 *         property: 'age',
 *         value   : 32
 *     });
 *
 *     var longNameFilter = new Ext.util.Filter({
 *         filterFn: function(item) {
 *             return item.name.length > 4;
 *         }
 *     });
 *
 *     // a new MixedCollection with the 2 names longer than 4 characters
 *     var longNames = allNames.filter(longNameFilter);
 *
 *     // a new MixedCollection with the 1 person of age 32:
 *     var youngFolk = allNames.filter(ageFilter);
 */

/**
 * @cfg {String} [property=null]
 * The property to filter on. Required unless a {@link #filterFn} is passed.
 * @accessor
 */

/**
 * @cfg {RegExp/Mixed} [value=null]
 * The value you want to match against. Required unless a {@link #filterFn} is passed.
 *
 * Can be a regular expression which will be used as a matcher or any other value
 * such as an object or an array of objects. This value is compared using the configured
 * {@link #operator}.
 * @accessor
 */

/**
 * @cfg {Function} filterFn
 * A custom filter function which is passed each item in the {@link Ext.util.MixedCollection} in turn. Should return
 * `true` to accept each item or `false` to reject it.
 * @accessor
 */

/**
 * @cfg {String} [id]
 * An identifier by which this Filter is indexed in a {@link Ext.data.Store#cfg-filters Store's filters collection}
 *
 * Identified Filters may be individually removed from a Store's filter set by using {@link Ext.data.Store#removeFilter}.
 *
 * Anonymous Filters may be removed en masse by passing `null` to {@link Ext.data.Store#removeFilter}.
 * @accessor
 */

/**
 * @cfg {Boolean} [anyMatch=false]
 * True to allow any match - no regex start/end line anchors will be added.
 * @accessor
 */

/**
 * @cfg {Boolean} [exactMatch=false]
 * True to force exact match (^ and $ characters added to the regex). Ignored if anyMatch is true.
 * @accessor
 */

/**
 * @cfg {Boolean} [caseSensitive=false]
 * True to make the regex case sensitive (adds 'i' switch to regex).
 * @accessor
 */

/**
 * @cfg {Boolean} [disabled=false]
 * Setting this property to `true` disables this individual Filter so that it no longer contributes to a {@link Ext.data.Store#cfg-filters Store's filter set}
 *
 * When disabled, the next time the store is filtered, the Filter plays no part in filtering and records eliminated by it may rejoin the dataset.
 * @accessor
 */

/**
 * @cfg {Boolean} [disableOnEmpty=false]
 * `true` to not have this filter participate in the filtering process when the {@link #value} of
 * this the filter is empty according to {@link Ext#isEmpty}.
 *
 * @since 5.1.0
 * @accessor
 */

/**
 * @cfg {String} [operator]
 * The operator to use to compare the {@link #cfg-property} to this Filter's {@link #cfg-value}
 *
 * Possible values are:
 *
 *    * `<`
 *    * `<=`
 *    * `=`
 *    * `>=`
 *    * `>`
 *    * `!=`
 *    * `in`
 *    * `notin`
 *    * `like`
 *    * /=
 *
 * The `in` and `notin` operator expects this filter's {@link #cfg-value} to be an array and matches
 * values that are present in that array.
 *
 * The `like` operator matches values that contain this filter's {@link #cfg-value} as a
 * substring.
 *
 * The `'*='` operator uses the {@link #cfg-value} as the source for a `RegExp` and tests whether the
 * candidate value matches the regular expression.
 * @accessor
 */

/**
 * @cfg {String} [root=null]
 * Optional root property. This is mostly useful when filtering a Store, in which case we set the root to 'data' to
 * make the filter pull the {@link #property} out of the data object of each item
 * @accessor
 */

/**
 * @cfg {Function} [serializer]
 * A function to post-process any serialization. Accepts a filter state object
 * containing `property`, `value` and `operator` properties, and may either
 * mutate it, or return a completely new representation. Returning a falsey
 * value does not modify the representation.
 * @since 6.2.0
 * @accessor
 */

/**
 * @cfg {Object} [scope]
 * The context (`this` property) in which the filtering function is called. Defaults
 * to this Filter object.
 */

/**
 * @method createFilterFn
 * @static
 * Creates a single filter function which encapsulates the passed Filter array or
 * Collection.
 * @param {Ext.util.Filter[]/Ext.util.Collection} filters The filters from which to
 * create a filter function.
 * @return {Function} A function, which when passed a candidate object returns `true`
 * if the candidate passes all the specified Filters.
 */

/**
 * @method isEqual
 * @static
 * Checks if two filters have the same properties (Property, Operator and Value).
 *
 * @param {Ext.util.Filter} filter1 The first filter to be compared
 * @param {Ext.util.Filter} filter2 The second filter to be compared
 * @return {Boolean} `true` if they have the same properties.
 * @since 6.2.0
 */

/**
 * @method constructor
 * @constructor
 * Creates new Filter.
 * @param {Object} config Config object
 */

/**
 * @method getState
 * Returns this filter's state.
 * @return {Object}
 */

/**
 * @method serialize
 * Returns this filter's serialized state. This is used when transmitting this filter
 * to a server.
 * @return {Object}
 */
