/**
 * @class Ext.Version
 *
 * A utility class that wraps around a version number string and provides convenient methods
 * to perform comparisons. A version number is expressed in the following general format:
 *
 *     major[.minor[.patch[.build[release]]]]
 * 
 * The `Version` instance holds various readonly properties that contain the digested form
 * of the version string. The numeric components of `major`, `minor`, `patch` and `build`
 * as well as the textual suffix called `release`.
 * 
 * Not depicted in the above syntax are three possible prefixes used to control partial
 * matching. These are '^' (the default), '>' and '~'. These are discussed below.
 *
 * Examples:
 *
 *     var version = new Ext.Version('1.0.2beta'); // or maybe "1.0" or "1.2.3.4RC"
 *     console.log("Version is " + version); // Version is 1.0.2beta
 *
 *     console.log(version.getMajor()); // 1
 *     console.log(version.getMinor()); // 0
 *     console.log(version.getPatch()); // 2
 *     console.log(version.getBuild()); // 0
 *     console.log(version.getRelease()); // beta
 *
 * The understood values of `release` are assigned numberic equivalents for the sake of
 * comparison. The order of these from smallest to largest is as follows:
 *
 *  * `"dev"`
 *  * `"alpha"` or `"a"`
 *  * `"beta"` or `"b"`
 *  * `"RC"` or `"rc"`
 *  * `"#"`
 *  * `"pl"` or `"p"`
 *
 * Any other (unrecognized) suffix is consider greater than any of these.
 * 
 * ## Comparisons
 * There are two forms of comparison that are commonly needed: full and partial. Full
 * comparison is simpler and is also the default.
 * 
 * Example:
 *
 *     var version = new Ext.Version('1.0.2beta');
 *
 *     console.log(version.isGreaterThan('1.0.1')); // True
 *     console.log(version.isGreaterThan('1.0.2alpha')); // True
 *     console.log(version.isGreaterThan('1.0.2RC')); // False
 *     console.log(version.isGreaterThan('1.0.2')); // False
 *     console.log(version.isLessThan('1.0.2')); // True
 *
 *     console.log(version.match(1.0)); // True (using a Number)
 *     console.log(version.match('1.0.2')); // True (using a String)
 * 
 * These comparisons are ultimately implemented by {@link Ext.Version#compareTo compareTo}
 * which returns -1, 0 or 1 depending on whether the `Version' instance is less than, equal
 * to, or greater than the given "other" version.
 * 
 * For example:
 * 
 *      var n = version.compareTo('1.0.1');  // == 1  (because 1.0.2beta > 1.0.1)
 *      
 *      n = version.compareTo('1.1');  // == -1
 *      n = version.compareTo(version); // == 0
 * 
 * ### Partial Comparisons
 * By default, unspecified version number fields are filled with 0. In other words, the
 * version number fields are 0-padded on the right or a "lower bound". This produces the
 * most commonly used forms of comparsion:
 * 
 *      var ver = new Version('4.2');
 *
 *      n = ver.compareTo('4.2.1'); // == -1  (4.2 promotes to 4.2.0 and is less than 4.2.1)
 * 
 * There are two other ways to interpret comparisons of versions of different length. The
 * first of these is to change the padding on the right to be a large number (scuh as
 * Infinity) instead of 0. This has the effect of making the version an upper bound. For
 * example:
 * 
 *      var ver = new Version('^4.2'); // NOTE: the '^' prefix used
 *
 *      n = ver.compareTo('4.3'); // == -1  (less than 4.3)
 *      
 *      n = ver.compareTo('4.2'); // == 1   (greater than all 4.2's)
 *      n = ver.compareTo('4.2.1'); // == 1
 *      n = ver.compareTo('4.2.9'); // == 1
 * 
 * The second way to interpret this comparison is to ignore the extra digits, making the
 * match a prefix match. For example:
 * 
 *      var ver = new Version('~4.2'); // NOTE: the '~' prefix used
 *
 *      n = ver.compareTo('4.3'); // == -1
 *      
 *      n = ver.compareTo('4.2'); // == 0
 *      n = ver.compareTo('4.2.1'); // == 0
 * 
 * This final form can be useful when version numbers contain more components than are
 * important for certain comparisons. For example, the full version of Ext JS 4.2.1 is
 * "4.2.1.883" where 883 is the `build` number.
 * 
 * This is how to create a "partial" `Version` and compare versions to it:
 * 
 *      var version421ish = new Version('~4.2.1');
 *      
 *      n = version421ish.compareTo('4.2.1.883'); // == 0
 *      n = version421ish.compareTo('4.2.1.2'); // == 0
 *      n = version421ish.compareTo('4.2.1'); // == 0
 *
 *      n = version421ish.compareTo('4.2'); // == 1
 *
 * In the above example, '4.2.1.2' compares as equal to '4.2.1' because digits beyond the
 * given "4.2.1" are ignored. However, '4.2' is less than the '4.2.1' prefix; its missing
 * digit is filled with 0.
 */

/**
 * @method compareTo
 * Compares this version instance to the specified `other` version.
 *
 * @param {String/Number/Ext.Version} other The other version to which to compare.
 * @return {Number} -1 if this version is less than the target version, 1 if this
 * version is greater, and 0 if they are equal.
 */

/**
 * @method getMajor
 * Returns the major component value.
 * @return {Number}
 */

/**
 * @method getMinor
 * Returns the minor component value.
 * @return {Number}
 */

/**
 * @method getPatch
 * Returns the patch component value.
 * @return {Number}
 */

/**
 * @method getBuild
 * Returns the build component value.
 * @return {Number}
 */

/**
 * @method getRelease
 * Returns the release component text (e.g., "beta").
 * @return {String}
 */

/**
 * @method getReleaseValue
 * Returns the release component value for comparison purposes.
 * @return {Number/String}
 */

/**
 * @method
 * Returns whether this version if greater than the supplied argument
 * @param {String/Number} target The version to compare with
 * @return {Boolean} `true` if this version if greater than the target, `false` otherwise
 */

/**
 * @method isGreaterThanOrEqual
 * Returns whether this version if greater than or equal to the supplied argument
 * @param {String/Number} target The version to compare with
 * @return {Boolean} `true` if this version if greater than or equal to the target, `false` otherwise
 */

/**
 * @method isLessThan
 * Returns whether this version if smaller than the supplied argument
 * @param {String/Number} target The version to compare with
 * @return {Boolean} `true` if this version if smaller than the target, `false` otherwise
 */

/**
 * @method isLessThanOrEqual
 * Returns whether this version if less than or equal to the supplied argument
 * @param {String/Number} target The version to compare with
 * @return {Boolean} `true` if this version if less than or equal to the target, `false` otherwise
 */

/**
 * @method equals
 * Returns whether this version equals to the supplied argument
 * @param {String/Number} target The version to compare with
 * @return {Boolean} `true` if this version equals to the target, `false` otherwise
 */

/**
 * @method match
 * Returns whether this version matches the supplied argument. Example:
 *
 *     var version = new Ext.Version('1.0.2beta');
 *     console.log(version.match(1)); // true
 *     console.log(version.match(1.0)); // true
 *     console.log(version.match('1.0.2')); // true
 *     console.log(version.match('1.0.2RC')); // false
 *
 * @param {String/Number} target The version to compare with
 * @return {Boolean} `true` if this version matches the target, `false` otherwise
 */

/**
 * @method toArray
 * Returns this format: [major, minor, patch, build, release]. Useful for comparison.
 * @return {Number[]}
 */

/**
 * @method getShortVersion
 * Returns shortVersion version without dots and release
 * @return {String}
 */

/**
 * @method gt
 * Convenient alias to {@link Ext.Version#isGreaterThan isGreaterThan}
 * @param {String/Number/Ext.Version} target
 * @return {Boolean}
 */

/**
 * @method lt
 * Convenient alias to {@link Ext.Version#isLessThan isLessThan}
 * @param {String/Number/Ext.Version} target
 * @return {Boolean}
 */

/**
 * @method gtEq
 * Convenient alias to {@link Ext.Version#isGreaterThanOrEqual isGreaterThanOrEqual}
 * @param {String/Number/Ext.Version} target
 * @return {Boolean}
 */

/**
 * @method ltEq
 * Convenient alias to {@link Ext.Version#isLessThanOrEqual isLessThanOrEqual}
 * @param {String/Number/Ext.Version} target
 * @return {Boolean}
 */

/**
 * @method getComponentValue
 * Converts a version component to a comparable value
 *
 * @static
 * @param {Object} value The value to convert
 * @return {Object}
 */

/**
 * @method compare
 * Compare 2 specified versions by ensuring the first parameter is a `Version`
 * instance and then calling the `compareTo` method.
 *
 * @static
 * @param {String} current The current version to compare to
 * @param {String} target The target version to compare to
 * @return {Number} Returns -1 if the current version is smaller than the target version, 1 if greater, and 0 if they're equivalent
 */

/**
 * @class Ext
 */

/**
 * @method setVersion
 * Set version number for the given package name.
 *
 * @param {String} packageName The package name, e.g. 'core', 'touch', 'ext'.
 * @param {String/Ext.Version} version The version, e.g. '1.2.3alpha', '2.4.0-dev'.
 * @return {Ext}
 */

/**
 * @method getVersion
 * Get the version number of the supplied package name; will return the version of
 * the framework.
 *
 * @param {String} [packageName] The package name, e.g., 'core', 'touch', 'ext'.
 * @return {Ext.Version} The version.
 */

/**
 * @method checkVersion
 * This method checks the registered package versions against the provided version
 * `specs`. A `spec` is either a string or an object indicating a boolean operator.
 * This method accepts either form or an array of these as the first argument. The
 * second argument applies only when the first is an array and indicates whether
 * all `specs` must match or just one.
 *
 * ## Package Version Specifications
 * The string form of a `spec` is used to indicate a version or range of versions
 * for a particular package. This form of `spec` consists of three (3) parts:
 *
 *  * Package name followed by "@". If not provided, the framework is assumed.
 *  * Minimum version.
 *  * Maximum version.
 *
 * At least one version number must be provided. If both minimum and maximum are
 * provided, these must be separated by a "-".
 *
 * Some examples of package version specifications:
 *
 *      4.2.2           (exactly version 4.2.2 of the framework)
 *      4.2.2+          (version 4.2.2 or higher of the framework)
 *      4.2.2-          (version 4.2.2 or higher of the framework)
 *      4.2.1 - 4.2.3   (versions from 4.2.1 up to 4.2.3 of the framework)
 *      - 4.2.2         (any version up to version 4.2.1 of the framework)
 *
 *      foo@1.0         (exactly version 1.0 of package "foo")
 *      foo@1.0-1.3     (versions 1.0 up to 1.3 of package "foo")
 *
 * **NOTE:** This syntax is the same as that used in Sencha Cmd's package
 * requirements declarations.
 *
 * ## Boolean Operator Specifications
 * Instead of a string, an object can be used to describe a boolean operation to
 * perform on one or more `specs`. The operator is either **`and`** or **`or`**
 * and can contain an optional **`not`**.
 *
 * For example:
 *
 *      {
 *          not: true,  // negates boolean result
 *          and: [
 *              '4.2.2',
 *              'foo@1.0.1 - 2.0.1'
 *          ]
 *      }
 *
 * Each element of the array can in turn be a string or object spec. In other
 * words, the value is passed to this method (recursively) as the first argument
 * so these two calls are equivalent:
 *
 *      Ext.checkVersion({
 *          not: true,  // negates boolean result
 *          and: [
 *              '4.2.2',
 *              'foo@1.0.1 - 2.0.1'
 *          ]
 *      });
 *
 *      !Ext.checkVersion([
 *              '4.2.2',
 *              'foo@1.0.1 - 2.0.1'
 *          ], true);
 *
 * ## Examples
 *
 *      // A specific framework version
 *      Ext.checkVersion('4.2.2');
 *
 *      // A range of framework versions:
 *      Ext.checkVersion('4.2.1-4.2.3');
 *
 *      // A specific version of a package:
 *      Ext.checkVersion('foo@1.0.1');
 *
 *      // A single spec that requires both a framework version and package
 *      // version range to match:
 *      Ext.checkVersion({
 *          and: [
 *              '4.2.2',
 *              'foo@1.0.1-1.0.2'
 *          ]
 *      });
 *
 *      // These checks can be nested:
 *      Ext.checkVersion({
 *          and: [
 *              '4.2.2',  // exactly version 4.2.2 of the framework *AND*
 *              {
 *                  // either (or both) of these package specs:
 *                  or: [
 *                      'foo@1.0.1-1.0.2',
 *                      'bar@3.0+'
 *                  ]
 *              }
 *          ]
 *      });
 *
 * ## Version Comparisons
 * Version comparsions are assumed to be "prefix" based. That is to say, `"foo@1.2"`
 * matches any version of "foo" that has a major version 1 and a minor version of 2.
 *
 * This also applies to ranges. For example `"foo@1.2-2.2"` matches all versions
 * of "foo" from 1.2 up to 2.2 regardless of the specific patch and build.
 *
 * ## Use in Overrides
 * This methods primary use is in support of conditional overrides on an
 * `Ext.define` declaration.
 *
 * @param {String/Array/Object} specs A version specification string, an object
 * containing `or` or `and` with a value that is equivalent to `specs` or an array
 * of either of these.
 * @param {Boolean} [matchAll=false] Pass `true` to require all specs to match.
 * @return {Boolean} True if `specs` matches the registered package versions.
 */
