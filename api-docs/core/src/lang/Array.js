/**
 * @class Ext.Array
 * @singleton
 *
 * A set of useful static methods to deal with arrays; provide missing methods for
 * older browsers.
 */

/**
 * @method binarySearch
 * This method returns the index that a given item would be inserted into the
 * given (sorted) `array`. Note that the given `item` may or may not be in the
 * array. This method will return the index of where the item *should* be.
 *
 * For example:
 *
 *      var array = [ 'A', 'D', 'G', 'K', 'O', 'R', 'X' ];
 *      var index = Ext.Array.binarySearch(array, 'E');
 *
 *      console.log('index: ' + index);
 *      // logs "index: 2"
 *
 *      array.splice(index, 0, 'E');
 *
 *      console.log('array : ' + array.join(''));
 *      // logs "array: ADEGKORX"
 *
 * @param {Object[]} array The array to search.
 * @param {Object} item The item that you want to insert into the `array`.
 * @param {Number} [begin=0] The first index in the `array` to consider.
 * @param {Number} [end=array.length] The index that marks the end of the range
 * to consider. The item at this index is *not* considered.
 * @param {Function} [compareFn] The comparison function that matches the sort
 * order of the `array`. The default `compareFn` compares items using less-than
 * and greater-than operators.
 * @return {Number} The index for the given item in the given array based on
 * the current sorters.
 */

/**
 * @method each
 * Iterates an array or an iterable value and invoke the given callback function for each item.
 *
 *     var countries = ['Vietnam', 'Singapore', 'United States', 'Russia'];
 *
 *     Ext.Array.each(countries, function(name, index, countriesItSelf) {
 *         console.log(name);
 *     });
 *
 *     var sum = function() {
 *         var sum = 0;
 *
 *         Ext.Array.each(arguments, function(value) {
 *             sum += value;
 *         });
 *
 *         return sum;
 *     };
 *
 *     sum(1, 2, 3); // returns 6
 *
 * The iteration can be stopped by returning `false` from the callback function.
 * Returning `undefined` (i.e `return;`) will only exit the callback function and
 * proceed with the next iteration of the loop.
 *
 *     Ext.Array.each(countries, function(name, index, countriesItSelf) {
 *         if (name === 'Singapore') {
 *             return false; // break here
 *         }
 *     });
 *
 * {@link Ext#each Ext.each} is alias for {@link Ext.Array#each Ext.Array.each}
 *
 * @param {Array/NodeList/Object} iterable The value to be iterated. If this
 * argument is not iterable, the callback function is called once.
 * @param {Function} fn The callback function. If it returns `false`, the iteration
 * stops and this method returns the current `index`. Returning `undefined` (i.e
 * `return;`) will only exit the callback function and proceed with the next iteration
 * in the loop.
 * @param {Object} fn.item The item at the current `index` in the passed `array`
 * @param {Number} fn.index The current `index` within the `array`
 * @param {Array} fn.allItems The `array` itself which was passed as the first argument
 * @param {Boolean} fn.return Return `false` to stop iteration.
 * @param {Object} [scope] The scope (`this` reference) in which the specified function is executed.
 * @param {Boolean} [reverse=false] Reverse the iteration order (loop from the end to the beginning).
 * @return {Boolean} See description for the `fn` parameter.
 */

/**
 * @method findInsertionIndex
 * Calculates the the insertion index of a passed object into the passed Array according
 * to the passed comparator function. Note that the passed Array *MUST* already be ordered.
 * @param {Object} item The item to calculate the insertion index for.
 * @param {Array} The array into which the item is to be inserted.
 * @param {Function} comparatorFn The comparison function. Must return -1 or 0 or 1.
 * @param {Object} comparatorFn.lhs The left object to compare.
 * @param {Object} comparatorFn.rhs The right object to compare.
 * @param {Number} index The possible correct index to try first before a binary
 * search is instigated.
 */

/**
 * @method forEach
 * Iterates an array and invoke the given callback function for each item. Note that this will simply
 * delegate to the native `Array.prototype.forEach` method if supported. It doesn't support stopping the
 * iteration by returning `false` in the callback function like {@link Ext.Array#each}. However, performance
 * could be much better in modern browsers comparing with {@link Ext.Array#each}
 *
 * @param {Array} array The array to iterate.
 * @param {Function} fn The callback function.
 * @param {Object} fn.item The item at the current `index` in the passed `array`.
 * @param {Number} fn.index The current `index` within the `array`.
 * @param {Array}  fn.allItems The `array` itself which was passed as the first argument.
 * @param {Object} scope (Optional) The execution scope (`this`) in which the
 * specified function is executed.
 */

/**
 * @method indexOf
 * Get the index of the provided `item` in the given `array`, a supplement for the
 * missing arrayPrototype.indexOf in Internet Explorer.
 *
 * @param {Array} array The array to check.
 * @param {Object} item The item to find.
 * @param {Number} from (Optional) The index at which to begin the search.
 * @return {Number} The index of item in the array (or -1 if it is not found).
 */

/**
 * @method contains
 * Checks whether or not the given `array` contains the specified `item`.
 *
 * @param {Array} array The array to check.
 * @param {Object} item The item to find.
 * @return {Boolean} `true` if the array contains the item, `false` otherwise.
 */

/**
 * @method toArray
 * Converts any iterable (numeric indices and a length property) into a true array.
 *
 *     function test() {
 *         var args = Ext.Array.toArray(arguments),
 *             fromSecondToLastArgs = Ext.Array.toArray(arguments, 1);
 *
 *         alert(args.join(' '));
 *         alert(fromSecondToLastArgs.join(' '));
 *     }
 *
 *     test('just', 'testing', 'here'); // alerts 'just testing here';
 *                                      // alerts 'testing here';
 *
 *     Ext.Array.toArray(document.getElementsByTagName('div')); // will convert the NodeList into an array
 *     Ext.Array.toArray('splitted'); // returns ['s', 'p', 'l', 'i', 't', 't', 'e', 'd']
 *     Ext.Array.toArray('splitted', 0, 3); // returns ['s', 'p', 'l']
 *
 * {@link Ext#toArray Ext.toArray} is alias for {@link Ext.Array#toArray Ext.Array.toArray}
 *
 * @param {Object} iterable the iterable object to be turned into a true Array.
 * @param {Number} [start=0] a zero-based index that specifies the start of extraction.
 * @param {Number} [end=-1] a 1-based index that specifies the end of extraction.
 * @return {Array}
 */

/**
 * @method pluck
 * Plucks the value of a property from each item in the Array. Example:
 *
 *     Ext.Array.pluck(Ext.query("p"), "className"); // [el1.className, el2.className, ..., elN.className]
 *
 * @param {Array/NodeList} array The Array of items to pluck the value from.
 * @param {String} propertyName The property name to pluck from each element.
 * @return {Array} The value from each item in the Array.
 */

/**
 * @method map
 * Creates a new array with the results of calling a provided function on every element in this array.
 *
 * @param {Array} array
 * @param {Function} fn Callback function for each item.
 * @param {Mixed} fn.item Current item.
 * @param {Number} fn.index Index of the item.
 * @param {Array} fn.array The whole array that's being iterated.
 * @param {Object} [scope] Callback function scope
 * @return {Array} results
 */

/**
 * @method every
 * Executes the specified function for each array element until the function returns a falsy value.
 * If such an item is found, the function will return `false` immediately.
 * Otherwise, it will return `true`.
 *
 * @param {Array} array
 * @param {Function} fn Callback function for each item.
 * @param {Mixed} fn.item Current item.
 * @param {Number} fn.index Index of the item.
 * @param {Array} fn.array The whole array that's being iterated.
 * @param {Object} scope Callback function scope.
 * @return {Boolean} `treu` if no false value is returned by the callback function.
 */

/**
 * @method some
 * Executes the specified function for each array element until the function returns a truthy value.
 * If such an item is found, the function will return `true` immediately. Otherwise, it will return `false`.
 *
 * @param {Array} array
 * @param {Function} fn Callback function for each item.
 * @param {Mixed} fn.item Current item.
 * @param {Number} fn.index Index of the item.
 * @param {Array} fn.array The whole array that's being iterated.
 * @param {Object} scope Callback function scope.
 * @return {Boolean} `true` if the callback function returns a truthy value.
 */

/**
 * @method equals
 * Shallow compares the contents of 2 arrays using strict equality.
 * @param {Array} array1
 * @param {Array} array2
 * @return {Boolean} `true` if the arrays are equal.
 */

/**
 * @method clean
 * Filter through an array and remove empty item as defined in {@link Ext#isEmpty Ext.isEmpty}.
 *
 * See {@link Ext.Array#filter}
 *
 * @param {Array} array
 * @return {Array} results
 */

/**
 * @method unique
 * Returns a new array with unique items.
 *
 * @param {Array} array
 * @return {Array} results
 */

/**
 * @method filter
 * Creates a new array with all of the elements of this array for which
 * the provided filtering function returns a truthy value.
 *
 * @param {Array} array
 * @param {Function} fn Callback function for each item.
 * @param {Mixed} fn.item Current item.
 * @param {Number} fn.index Index of the item.
 * @param {Array} fn.array The whole array that's being iterated.
 * @param {Object} scope Callback function scope.
 * @return {Array} results
 */

/**
 * @method findBy
 * Returns the first item in the array which elicits a truthy return value from the
 * passed selection function.
 * @param {Array} array The array to search
 * @param {Function} fn The selection function to execute for each item.
 * @param {Mixed} fn.item The array item.
 * @param {Number} fn.index The index of the array item.
 * @param {Object} scope (optional) The scope (<code>this</code> reference) in which the
 * function is executed. Defaults to the array
 * @return {Object} The first item in the array which returned true from the selection
 * function, or null if none was found.
 */

/**
 * @method from
 * Converts a value to an array if it's not already an array; returns:
 *
 * - An empty array if given value is `undefined` or `null`
 * - Itself if given value is already an array
 * - An array copy if given value is {@link Ext#isIterable iterable} (arguments, NodeList and alike)
 * - An array with one item which is the given value, otherwise
 *
 * @param {Object} value The value to convert to an array if it's not already is an array.
 * @param {Boolean} [newReference] `true` to clone the given array and return a new reference if necessary.
 * @return {Array} array
 */

/**
 * @method remove
 * Removes the specified item from the array if it exists.
 *
 * @param {Array} array The array.
 * @param {Object} item The item to remove.
 * @return {Array} The passed array.
 */

/**
 * @method removeAt
 * Removes item/s at the specified index.
 *
 * @param {Array} array The array.
 * @param {Number} index The index of the item to be removed.
 * @param {Number} [count=1] The number of items to be removed.
 * @return {Array} The passed array.
 */

/**
 * @method include
 * Push an item into the array only if the array doesn't contain it yet.
 *
 * @param {Array} array The array.
 * @param {Object} item The item to include.
 */

/**
 * @method clone
 * Clone a flat array without referencing the previous one. Note that this is different
 * from `Ext.clone` since it doesn't handle recursive cloning. It's simply a convenient, easy-to-remember method
 * for `Array.prototype.slice.call(array)`.
 *
 * @param {Array} array The array.
 * @return {Array} The clone array.
 */

/**
 * @method merge
 * Merge multiple arrays into one with unique items.
 *
 * {@link Ext.Array#union} is alias for {@link Ext.Array#merge}
 *
 * @param {Array} array1
 * @param {Array} array2
 * @param {Array} etc
 * @return {Array} merged
 */

/**
 * @method intersect
 * Merge multiple arrays into one with unique items that exist in all of the arrays.
 *
 * @param {Array} array1
 * @param {Array} array2
 * @param {Array} etc
 * @return {Array} intersect
 */

/**
 * @method difference
 * Perform a set difference A-B by subtracting all items in array B from array A.
 *
 * @param {Array} arrayA
 * @param {Array} arrayB
 * @return {Array} difference
 */

/**
 * This method applies the `reduceFn` function against an accumulator and each
 * value of the `array` (from left-to-right) to reduce it to a single value.
 *
 * If no `initialValue` is specified, the first element of the array is used as
 * the initial value. For example:
 *
 *      function reducer (previous, value, index) {
 *          console.log('[' + index + ']: (' + previous + ',' + value + '}');
 *          return previous * 10 + value;
 *      }
 *
 *      v = Ext.Array.reduce([2, 3, 4], reducer);
 *      console.log('v = ' + v);
 *
 *      > [1]: (2, 3)
 *      > [2]: (23, 4)
 *      > v = 234
 *
 *      v = Ext.Array.reduce([2, 3, 4], reducer, 1);
 *      console.log('v = ' + v);
 *
 *      > [0]: (1, 2)
 *      > [1]: (12, 3)
 *      > [2]: (123, 4)
 *      > v = 1234
 *
 * @param {Array} array The array to process.
 * @param {Function} reduceFn The reducing callback function.
 * @param {Mixed} reduceFn.previous The previous value.
 * @param {Mixed} reduceFn.value The current value.
 * @param {Number} reduceFn.index The index in the array of the current `value`.
 * @param {Array} reduceFn.array The array to being processed.
 * @param {Mixed} [initialValue] The starting value.
 * @return {Mixed} The reduced value.
 * @method reduce
 * @since 6.0.0
 */

/**
 * Returns a shallow copy of a part of an array. This is equivalent to the native
 * call `Array.prototype.slice.call(array, begin, end)`. This is often used when "array"
 * is "arguments" since the arguments object does not supply a slice method but can
 * be the context object to `Array.prototype.slice`.
 *
 * @param {Array} array The array (or arguments object).
 * @param {Number} begin The index at which to begin. Negative values are offsets from
 * the end of the array.
 * @param {Number} end The index at which to end. The copied items do not include
 * end. Negative values are offsets from the end of the array. If end is omitted,
 * all items up to the end of the array are copied.
 * @return {Array} The copied piece of the array.
 * @method slice
 */

/**
 * @method sort
 * Sorts the elements of an Array in a stable manner (equivalently keyed values do not move relative to each other).
 * By default, this method sorts the elements alphabetically and ascending.
 * **Note:** This method modifies the passed array, in the same manner as the
 * native javascript Array.sort.
 *
 * @param {Array} array The array to sort.
 * @param {Function} [sortFn] The comparison function.
 * @param {Mixed} sortFn.a The first item to compare.
 * @param {Mixed} sortFn.b The second item to compare.
 * @param {Number} sortFn.return `-1` if a < b, `1` if a > b, otherwise `0`.
 * @return {Array} The sorted array.
 */

/**
 * @method flatten
 * Recursively flattens into 1-d Array. Injects Arrays inline.
 *
 * @param {Array} array The array to flatten
 * @return {Array} The 1-d array.
 */

/**
 * @method min
 * Returns the minimum value in the Array.
 *
 * @param {Array/NodeList} array The Array from which to select the minimum value.
 * @param {Function} comparisonFn (optional) a function to perform the comparison which determines minimization.
 * If omitted the "<" operator will be used.
 * __Note:__ gt = 1; eq = 0; lt = -1
 * @param {Mixed} comparisonFn.min Current minimum value.
 * @param {Mixed} comparisonFn.item The value to compare with the current minimum.
 * @return {Object} minValue The minimum value.
 */

/**
 * @method max
 * Returns the maximum value in the Array.
 *
 * @param {Array/NodeList} array The Array from which to select the maximum value.
 * @param {Function} comparisonFn (optional) a function to perform the comparison which determines maximization.
 * If omitted the ">" operator will be used.
 * __Note:__ gt = 1; eq = 0; lt = -1
 * @param {Mixed} comparisonFn.max Current maximum value.
 * @param {Mixed} comparisonFn.item The value to compare with the current maximum.
 * @return {Object} maxValue The maximum value.
 */

/**
 * @method mean
 * Calculates the mean of all items in the array.
 *
 * @param {Array} array The Array to calculate the mean value of.
 * @return {Number} The mean.
 */

/**
 * @method sum
 * Calculates the sum of all items in the given array.
 *
 * @param {Array} array The Array to calculate the sum value of.
 * @return {Number} The sum.
 */

/**
 * @method toMap
 * Creates a map (object) keyed by the elements of the given array. The values in
 * the map are the index+1 of the array element. For example:
 *
 *      var map = Ext.Array.toMap(['a','b','c']);
 *
 *      // map = { a: 1, b: 2, c: 3 };
 *
 * Or a key property can be specified:
 *
 *      var map = Ext.Array.toMap([
 *              { name: 'a' },
 *              { name: 'b' },
 *              { name: 'c' }
 *          ], 'name');
 *
 *      // map = { a: 1, b: 2, c: 3 };
 *
 * Lastly, a key extractor can be provided:
 *
 *      var map = Ext.Array.toMap([
 *              { name: 'a' },
 *              { name: 'b' },
 *              { name: 'c' }
 *          ], function (obj) { return obj.name.toUpperCase(); });
 *
 *      // map = { A: 1, B: 2, C: 3 };
 *
 * @param {Array} array The Array to create the map from.
 * @param {String/Function} [getKey] Name of the object property to use
 * as a key or a function to extract the key.
 * @param {Object} [scope] Value of `this` inside callback specified for `getKey`.
 * @return {Object} The resulting map.
 */

/**
 * @method toValueMap
 * Creates a map (object) keyed by a property of elements of the given array. The values in
 * the map are the array element. For example:
 *
 *      var map = Ext.Array.toValueMap(['a','b','c']);
 *
 *      // map = { a: 'a', b: 'b', c: 'c' };
 *
 * Or a key property can be specified:
 *
 *      var map = Ext.Array.toValueMap([
 *              { name: 'a' },
 *              { name: 'b' },
 *              { name: 'c' }
 *          ], 'name');
 *
 *      // map = { a: {name: 'a'}, b: {name: 'b'}, c: {name: 'c'} };
 *
 * Lastly, a key extractor can be provided:
 *
 *      var map = Ext.Array.toValueMap([
 *              { name: 'a' },
 *              { name: 'b' },
 *              { name: 'c' }
 *          ], function (obj) { return obj.name.toUpperCase(); });
 *
 *      // map = { A: {name: 'a'}, B: {name: 'b'}, C: {name: 'c'} };
 *
 * @param {Array} array The Array to create the map from.
 * @param {String/Function} [getKey] Name of the object property to use
 * as a key or a function to extract the key.
 * @param {Object} [scope] Value of this inside callback. This parameter is only
 * passed when `getKey` is a function. If `getKey` is not a function, the 3rd
 * argument is `arrayify`.
 * @param {Number} [arrayify] Pass `1` to create arrays for all map entries
 * or `2` to create arrays for map entries that have 2 or more items with the
 * same key. This only applies when `getKey` is specified. By default the map will
 * hold the last entry with a given key.
 * @return {Object} The resulting map.
 */

/**
 * @method erase
 * Removes items from an array. This is functionally equivalent to the splice method
 * of Array, but works around bugs in IE8's splice method and does not copy the
 * removed elements in order to return them (because very often they are ignored).
 *
 * @param {Array} array The Array on which to replace.
 * @param {Number} index The index in the array at which to operate.
 * @param {Number} removeCount The number of items to remove at index.
 * @return {Array} The array passed.
 */

/**
 * @method insert
 * Inserts items in to an array.
 *
 * @param {Array} array The Array in which to insert.
 * @param {Number} index The index in the array at which to operate.
 * @param {Array} items The array of items to insert at index.
 * @return {Array} The array passed.
 */

/**
 * @method replace
 * Replaces items in an array. This is functionally equivalent to the splice method
 * of Array, but works around bugs in IE8's splice method and is often more convenient
 * to call because it accepts an array of items to insert rather than use a variadic
 * argument list.
 *
 * @param {Array} array The Array on which to replace.
 * @param {Number} index The index in the array at which to operate.
 * @param {Number} removeCount The number of items to remove at index (can be 0).
 * @param {Array} insert (optional) An array of items to insert at index.
 * @return {Array} The array passed.
 *
 */

/**
 * @method splice
 * Replaces items in an array. This is equivalent to the splice method of Array, but
 * works around bugs in IE8's splice method. The signature is exactly the same as the
 * splice method except that the array is the first argument. All arguments following
 * removeCount are inserted in the array at index.
 *
 * @param {Array} array The Array on which to replace.
 * @param {Number} index The index in the array at which to operate.
 * @param {Number} removeCount The number of items to remove at index (can be 0).
 * @param {Object...} elements The elements to add to the array. If you don't specify
 * any elements, splice simply removes elements from the array.
 * @return {Array} An array containing the removed items.
 */

/**
 * @method push
 * Pushes new items onto the end of an Array.
 *
 * Passed parameters may be single items, or arrays of items. If an Array is found in the argument list, all its
 * elements are pushed into the end of the target Array.
 *
 * @param {Array} target The Array onto which to push new items
 * @param {Object...} elements The elements to add to the array. Each parameter may
 * be an Array, in which case all the elements of that Array will be pushed into the end of the
 * destination Array.
 * @return {Array} An array containing all the new items push onto the end.
 *
 */
        
/**
 * @method numericSortFn
 * A function used to sort an array by numeric value. By default, javascript array values
 * are coerced to strings when sorting, which can be problematic when using numeric values. To
 * ensure that the values are sorted numerically, this method can be passed to the sort method:
 *
 *     Ext.Array.sort(myArray, Ext.Array.numericSortFn);
 */

/**
 * @method each
 * @member Ext
 * @inheritdoc Ext.Array#each
 */

/**
 * @method union
 * @member Ext.Array
 * @inheritdoc Ext.Array#merge
 */

/**
 * @method toArray
 * @member Ext
 * @inheritdoc Ext.Array#toArray
 */
