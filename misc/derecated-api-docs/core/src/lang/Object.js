/**
 * @class Ext.Object
 *
 * A collection of useful static methods to deal with objects.
 *
 * @singleton
 */

/**
 * @method chain
 * Returns a new object with the given object as the prototype chain. This method is
 * designed to mimic the ECMA standard `Object.create` method and is assigned to that
 * function when it is available.
 *
 * **NOTE** This method does not support the property definitions capability of the
 * `Object.create` method. Only the first argument is supported.
 *
 * @param {Object} object The prototype chain for the new object.
 */

/**
 * @method clear
 * This method removes all keys from the given object.
 * @param {Object} object The object from which to remove all keys.
 * @return {Object} The given object.
 */

/**
 * @method freeze
 * Freezes the given object making it immutable. This operation is by default shallow
 * and does not effect objects referenced by the given object.
 *
 * @param {Object} obj The object to freeze.
 * @param {Boolean} [deep=false] Pass `true` to freeze sub-objects recursively.
 * @return {Object} The given object `obj`.
 */

/**
 * @method toQueryObjects
 * Converts a `name` - `value` pair to an array of objects with support for nested structures. Useful to construct
 * query strings. For example:
 *
 *     var objects = Ext.Object.toQueryObjects('hobbies', ['reading', 'cooking', 'swimming']);
 *
 *     // objects then equals:
 *     [
 *         { name: 'hobbies', value: 'reading' },
 *         { name: 'hobbies', value: 'cooking' },
 *         { name: 'hobbies', value: 'swimming' },
 *     ];
 *
 *     var objects = Ext.Object.toQueryObjects('dateOfBirth', {
 *         day: 3,
 *         month: 8,
 *         year: 1987,
 *         extra: {
 *             hour: 4
 *             minute: 30
 *         }
 *     }, true); // Recursive
 *
 *     // objects then equals:
 *     [
 *         { name: 'dateOfBirth[day]', value: 3 },
 *         { name: 'dateOfBirth[month]', value: 8 },
 *         { name: 'dateOfBirth[year]', value: 1987 },
 *         { name: 'dateOfBirth[extra][hour]', value: 4 },
 *         { name: 'dateOfBirth[extra][minute]', value: 30 },
 *     ];
 *
 * @param {String} name
 * @param {Object/Array} value
 * @param {Boolean} [recursive=false] True to traverse object recursively
 * @return {Object[]}
 */

/**
 * @method toQueryString
 * Takes an object and converts it to an encoded query string.
 *
 * Non-recursive:
 *
 *     Ext.Object.toQueryString({foo: 1, bar: 2}); // returns "foo=1&bar=2"
 *     Ext.Object.toQueryString({foo: null, bar: 2}); // returns "foo=&bar=2"
 *     Ext.Object.toQueryString({'some price': '$300'}); // returns "some%20price=%24300"
 *     Ext.Object.toQueryString({date: new Date(2011, 0, 1)}); // returns "date=%222011-01-01T00%3A00%3A00%22"
 *     Ext.Object.toQueryString({colors: ['red', 'green', 'blue']}); // returns "colors=red&colors=green&colors=blue"
 *
 * Recursive:
 *
 *     Ext.Object.toQueryString({
 *         username: 'Jacky',
 *         dateOfBirth: {
 *             day: 1,
 *             month: 2,
 *             year: 1911
 *         },
 *         hobbies: ['coding', 'eating', 'sleeping', ['nested', 'stuff']]
 *     }, true); // returns the following string (broken down and url-decoded for ease of reading purpose):
 *     // username=Jacky
 *     //    &dateOfBirth[day]=1&dateOfBirth[month]=2&dateOfBirth[year]=1911
 *     //    &hobbies[0]=coding&hobbies[1]=eating&hobbies[2]=sleeping&hobbies[3][0]=nested&hobbies[3][1]=stuff
 *
 * @param {Object} object The object to encode
 * @param {Boolean} [recursive=false] Whether or not to interpret the object in recursive format.
 * (PHP / Ruby on Rails servers and similar).
 * @return {String} queryString
 */

/**
 * @method fromQueryString
 * Converts a query string back into an object.
 *
 * Non-recursive:
 *
 *     Ext.Object.fromQueryString("foo=1&bar=2"); // returns {foo: '1', bar: '2'}
 *     Ext.Object.fromQueryString("foo=&bar=2"); // returns {foo: '', bar: '2'}
 *     Ext.Object.fromQueryString("some%20price=%24300"); // returns {'some price': '$300'}
 *     Ext.Object.fromQueryString("colors=red&colors=green&colors=blue"); // returns {colors: ['red', 'green', 'blue']}
 *
 * Recursive:
 *
 *     Ext.Object.fromQueryString(
 *         "username=Jacky&"+
 *         "dateOfBirth[day]=1&dateOfBirth[month]=2&dateOfBirth[year]=1911&"+
 *         "hobbies[0]=coding&hobbies[1]=eating&hobbies[2]=sleeping&"+
 *         "hobbies[3][0]=nested&hobbies[3][1]=stuff", true);
 *
 *     // returns
 *     {
 *         username: 'Jacky',
 *         dateOfBirth: {
 *             day: '1',
 *             month: '2',
 *             year: '1911'
 *         },
 *         hobbies: ['coding', 'eating', 'sleeping', ['nested', 'stuff']]
 *     }
 *
 * @param {String} queryString The query string to decode
 * @param {Boolean} [recursive=false] Whether or not to recursively decode the string. This format is supported by
 * PHP / Ruby on Rails servers and similar.
 * @return {Object}
 */

/**
 * @method each
 * Iterates through an object and invokes the given callback function for each iteration.
 * The iteration can be stopped by returning `false` in the callback function. For example:
 *
 *     var person = {
 *         name: 'Jacky'
 *         hairColor: 'black'
 *         loves: ['food', 'sleeping', 'wife']
 *     };
 *
 *     Ext.Object.each(person, function(key, value, myself) {
 *         console.log(key + ":" + value);
 *
 *         if (key === 'hairColor') {
 *             return false; // stop the iteration
 *         }
 *     });
 *
 * @param {Object} object The object to iterate
 * @param {Function} fn The callback function.
 * @param {String} fn.key
 * @param {Object} fn.value
 * @param {Object} fn.object The object itself
 * @param {Object} [scope] The execution scope (`this`) of the callback function
 */

/**
 * @method eachValue
 * Iterates through an object and invokes the given callback function for each iteration.
 * The iteration can be stopped by returning `false` in the callback function. For example:
 *
 *     var items = {
 *         1: 'Hello',
 *         2: 'World'
 *     };
 *
 *     Ext.Object.eachValue(items, function (value) {
 *         console.log("Value: " + value);
 *     });
 *
 * This will log 'Hello' and 'World' in no particular order. This method is useful
 * in cases where the keys are not important to the processing, just the values.
 *
 * @param {Object} object The object to iterate
 * @param {Function} fn The callback function.
 * @param {Object} fn.value The value of
 * @param {Object} [scope] The execution scope (`this`) of the callback function
 */

/**
 * @method merge
 * Merges any number of objects recursively without referencing them or their children.
 *
 *     var extjs = {
 *         companyName: 'Ext JS',
 *         products: ['Ext JS', 'Ext GWT', 'Ext Designer'],
 *         isSuperCool: true,
 *         office: {
 *             size: 2000,
 *             location: 'Palo Alto',
 *             isFun: true
 *         }
 *     };
 *
 *     var newStuff = {
 *         companyName: 'Sencha Inc.',
 *         products: ['Ext JS', 'Ext GWT', 'Ext Designer', 'Sencha Touch', 'Sencha Animator'],
 *         office: {
 *             size: 40000,
 *             location: 'Redwood City'
 *         }
 *     };
 *
 *     var sencha = Ext.Object.merge(extjs, newStuff);
 *
 *     // extjs and sencha then equals to
 *     {
 *         companyName: 'Sencha Inc.',
 *         products: ['Ext JS', 'Ext GWT', 'Ext Designer', 'Sencha Touch', 'Sencha Animator'],
 *         isSuperCool: true,
 *         office: {
 *             size: 40000,
 *             location: 'Redwood City',
 *             isFun: true
 *         }
 *     }
 *
 * @param {Object} destination The object into which all subsequent objects are merged.
 * @param {Object...} object Any number of objects to merge into the destination.
 * @return {Object} merged The destination object with all passed objects merged in.
 */

/**
 * @method getAllKeys
 * Returns all keys of the given object as an array.
 *
 * @param {Object} object
 * @return {String[]} An array of keys from the object or any of its prototypes.
 */

/**
 * @method getKey
 * Returns the first matching key corresponding to the given value.
 * If no matching value is found, null is returned.
 *
 *     var person = {
 *         name: 'Jacky',
 *         loves: 'food'
 *     };
 *
 *     alert(Ext.Object.getKey(person, 'food')); // alerts 'loves'
 *
 * @param {Object} object
 * @param {Object} value The value to find
 */

/**
 * @method getValues
 * Gets all values of the given object as an array.
 *
 *     var values = Ext.Object.getValues({
 *         name: 'Jacky',
 *         loves: 'food'
 *     }); // ['Jacky', 'food']
 *
 * @param {Object} object
 * @return {Array} An array of values from the object
 */

/**
 * @method getKeys
 * Returns the `hasOwnProperty` keys of the given object as an array.
 *
 *     var values = Ext.Object.getKeys({
 *         name: 'Jacky',
 *         loves: 'food'
 *     }); // ['name', 'loves']
 *
 * @param {Object} object
 * @return {String[]} An array of keys from the object
 *
 */

/**
 * @method getSize
 * Gets the total number of this object's own properties
 *
 *     var size = Ext.Object.getSize({
 *         name: 'Jacky',
 *         loves: 'food'
 *     }); // size equals 2
 *
 * @param {Object} object
 * @return {Number} size
 */

/**
 * @method isEmpty
 * Checks if there are any properties on this object.
 * @param {Object} object
 * @return {Boolean} `true` if there no properties on the object.
 */

/**
 * @method equals
 * Shallow compares the contents of 2 objects using strict equality. Objects are
 * considered equal if they both have the same set of properties and the
 * value for those properties equals the other in the corresponding object.
 *
 *     // Returns true
 *     Ext.Object.equals({
 *         foo: 1,
 *         bar: 2
 *     }, {
 *         foo: 1,
 *         bar: 2
 *     });
 *
 * @param {Object} object1
 * @param {Object} object2
 * @return {Boolean} `true` if the objects are equal.
 */

/**
 * A convenient alias method for {@link Ext.Object#merge}.
 *
 * @member Ext
 * @method merge
 * @inheritdoc Ext.Object#merge
 */
