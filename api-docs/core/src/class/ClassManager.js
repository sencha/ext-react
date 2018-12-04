/**
 * @class Ext.ClassManager
 *
 * Ext.ClassManager manages all classes and handles mapping from string class name to
 * actual class objects throughout the whole framework. It is not generally accessed directly, rather through
 * these convenient shorthands:
 *
 * - {@link Ext#define Ext.define}
 * - {@link Ext#create Ext.create}
 * - {@link Ext#widget Ext.widget}
 * - {@link Ext#getClass Ext.getClass}
 * - {@link Ext#getClassName Ext.getClassName}
 *
 * # Basic syntax:
 *
 *     Ext.define(className, properties);
 *
 * in which `properties` is an object represent a collection of properties that apply to the class. See
 * {@link Ext.ClassManager#create} for more detailed instructions.
 *
 *     Ext.define('Person', {
 *          name: 'Unknown',
 *
 *          constructor: function(name) {
 *              if (name) {
 *                  this.name = name;
 *              }
 *          },
 *
 *          eat: function(foodType) {
 *              alert("I'm eating: " + foodType);
 *
 *              return this;
 *          }
 *     });
 *
 *     var aaron = new Person("Aaron");
 *     aaron.eat("Sandwich"); // alert("I'm eating: Sandwich");
 *
 * Ext.Class has a powerful set of extensible {@link Ext.Class#registerPreprocessor pre-processors} which takes care of
 * everything related to class creation, including but not limited to inheritance, mixins, configuration, statics, etc.
 *
 * # Inheritance:
 *
 *     Ext.define('Developer', {
 *          extend: 'Person',
 *
 *          constructor: function(name, isGeek) {
 *              this.isGeek = isGeek;
 *
 *              // Apply a method from the parent class' prototype
 *              this.callParent([name]);
 *          },
 *
 *          code: function(language) {
 *              alert("I'm coding in: " + language);
 *
 *              this.eat("Bugs");
 *
 *              return this;
 *          }
 *     });
 *
 *     var jacky = new Developer("Jacky", true);
 *     jacky.code("JavaScript"); // alert("I'm coding in: JavaScript");
 *                               // alert("I'm eating: Bugs");
 *
 * See {@link Ext.Base#callParent} for more details on calling superclass' methods
 *
 * # Mixins:
 *
 *     Ext.define('CanPlayGuitar', {
 *          playGuitar: function() {
 *             alert("F#...G...D...A");
 *          }
 *     });
 *
 *     Ext.define('CanComposeSongs', {
 *          composeSongs: function() { ... }
 *     });
 *
 *     Ext.define('CanSing', {
 *          sing: function() {
 *              alert("For he's a jolly good fellow...")
 *          }
 *     });
 *
 *     Ext.define('Musician', {
 *          extend: 'Person',
 *
 *          mixins: {
 *              canPlayGuitar: 'CanPlayGuitar',
 *              canComposeSongs: 'CanComposeSongs',
 *              canSing: 'CanSing'
 *          }
 *     })
 *
 *     Ext.define('CoolPerson', {
 *          extend: 'Person',
 *
 *          mixins: {
 *              canPlayGuitar: 'CanPlayGuitar',
 *              canSing: 'CanSing'
 *          },
 *
 *          sing: function() {
 *              alert("Ahem....");
 *
 *              this.mixins.canSing.sing.call(this);
 *
 *              alert("[Playing guitar at the same time...]");
 *
 *              this.playGuitar();
 *          }
 *     });
 *
 *     var me = new CoolPerson("Jacky");
 *
 *     me.sing(); // alert("Ahem...");
 *                // alert("For he's a jolly good fellow...");
 *                // alert("[Playing guitar at the same time...]");
 *                // alert("F#...G...D...A");
 *
 * # Config:
 *
 *     Ext.define('SmartPhone', {
 *          config: {
 *              hasTouchScreen: false,
 *              operatingSystem: 'Other',
 *              price: 500
 *          },
 *
 *          isExpensive: false,
 *
 *          constructor: function(config) {
 *              this.initConfig(config);
 *          },
 *
 *          applyPrice: function(price) {
 *              this.isExpensive = (price > 500);
 *
 *              return price;
 *          },
 *
 *          applyOperatingSystem: function(operatingSystem) {
 *              if (!(/^(iOS|Android|BlackBerry)$/i).test(operatingSystem)) {
 *                  return 'Other';
 *              }
 *
 *              return operatingSystem;
 *          }
 *     });
 *
 *     var iPhone = new SmartPhone({
 *          hasTouchScreen: true,
 *          operatingSystem: 'iOS'
 *     });
 *
 *     iPhone.getPrice(); // 500;
 *     iPhone.getOperatingSystem(); // 'iOS'
 *     iPhone.getHasTouchScreen(); // true;
 *
 *     iPhone.isExpensive; // false;
 *     iPhone.setPrice(600);
 *     iPhone.getPrice(); // 600
 *     iPhone.isExpensive; // true;
 *
 *     iPhone.setOperatingSystem('AlienOS');
 *     iPhone.getOperatingSystem(); // 'Other'
 *
 * # Statics:
 *
 *     Ext.define('Computer', {
 *          statics: {
 *              factory: function(brand) {
 *                 // 'this' in static methods refer to the class itself
 *                  return new this(brand);
 *              }
 *          },
 *
 *          constructor: function() { ... }
 *     });
 *
 *     var dellComputer = Computer.factory('Dell');
 *
 * Also see {@link Ext.Base#statics} and {@link Ext.Base#self} for more details on accessing
 * static properties within class methods
 *
 * @singleton
 */

/**
 * @cfg xtype
 * @member Ext.Class
 * @inheritdoc Ext.Component#cfg-xtype
 */

/**
 * @cfg {String} override
 * @member Ext.Class
 * Overrides members of the specified `target` class.
 *
 * **NOTE:** the overridden class must have been defined using
 * {@link Ext#define Ext.define} in order to use the `override` config.
 *
 * Methods defined on the overriding class will not automatically call the methods of
 * the same name in the ancestor class chain.  To call the parent's method of the
 * same name you must call {@link Ext.Base#callParent callParent}.  To skip the
 * method of the overridden class and call its parent you will instead call
 * {@link Ext.Base#callSuper callSuper}.
 *
 * See {@link Ext#define Ext.define} for additional usage examples.
 */

/**
 * @cfg {Object} platformConfig
 * Allows setting config values for a class based on specific platforms. The value
 * of this config is an object whose properties are "rules" and whose values are
 * objects containing config values.
 *
 * For example:
 *
 *      Ext.define('App.view.Foo', {
 *          extend: 'Ext.panel.Panel',
 *
 *          platformConfig: {
 *              desktop: {
 *                  title: 'Some Rather Descriptive Title'
 *              },
 *
 *              '!desktop': {
 *                  title: 'Short Title'
 *              }
 *          }
 *      });
 *
 * In the above, "desktop" and "!desktop" are (mutually exclusive) rules. Whichever
 * evaluates to `true` will have its configs applied to the class. In this case, only
 * the "title" property, but the object can contain any number of config properties.
 * In this case, the `platformConfig` is evaluated as part of the class and there is
 * no cost for each instance created.
 *
 * The rules are evaluated expressions in the context of the platform tags contained
 * in `{@link Ext#platformTags Ext.platformTags}`. Any properties of that object are
 * implicitly usable (as shown above).
 *
 * If a `platformConfig` specifies a config value, it will replace any values declared
 * on the class itself.
 *
 * Use of `platformConfig` on instances is handled by the config system when classes
 * call `{@link Ext.Base#initConfig initConfig}`. For example:
 *
 *      Ext.create({
 *          xtype: 'panel',
 *
 *          platformConfig: {
 *              desktop: {
 *                  title: 'Some Rather Descriptive Title'
 *              },
 *
 *              '!desktop': {
 *                  title: 'Short Title'
 *              }
 *          }
 *      });
 *
 * The following is equivalent to the above:
 *
 *      if (Ext.platformTags.desktop) {
 *          Ext.create({
 *              xtype: 'panel',
 *              title: 'Some Rather Descriptive Title'
 *          });
 *      } else {
 *          Ext.create({
 *              xtype: 'panel',
 *              title: 'Short Title'
 *          });
 *      }
 *
 * To adjust configs based on dynamic conditions, see `{@link Ext.mixin.Responsive}`.
 */

/**
 * @cfg {String/String[]} alias
 * @member Ext.Class
 * List of short aliases for class names. An alias consists of a namespace and a name
 * concatenated by a period as &#60;namespace&#62;.&#60;name&#62;
 *
 *  - **namespace** - The namespace describes what kind of alias this is and must be
 *  all lowercase.
 *  - **name** - The name of the alias which allows the lazy-instantiation via the
 *  alias. The name shouldn't contain any periods.
 *
 * A list of namespaces and the usages are:
 *
 *  - **feature** - {@link Ext.grid.Panel Grid} features
 *  - **plugin** - Plugins
 *  - **store** - {@link Ext.data.Store}
 *  - **widget** - Components
 *
 * Most useful for defining xtypes for widgets:
 *
 *     Ext.define('MyApp.CoolPanel', {
 *         extend: 'Ext.panel.Panel',
 *         alias: ['widget.coolpanel'],
 *         title: 'Yeah!'
 *     });
 *
 *     // Using Ext.create
 *     Ext.create('widget.coolpanel');
 *
 *     // Using the shorthand for defining widgets by xtype
 *     Ext.widget('panel', {
 *         items: [
 *             {xtype: 'coolpanel', html: 'Foo'},
 *             {xtype: 'coolpanel', html: 'Bar'}
 *         ]
 *     });
 */

/**
 * @cfg {Boolean} singleton
 * @member Ext.Class
 * When set to true, the class will be instantiated as singleton.  For example:
 *
 *     Ext.define('Logger', {
 *         singleton: true,
 *         log: function(msg) {
 *             console.log(msg);
 *         }
 *     });
 *
 *     Logger.log('Hello');
 */

/**
 * @cfg {String/String[]} alternateClassName
 * @member Ext.Class
 * Defines alternate names for this class.  For example:
 *
 *     Ext.define('Developer', {
 *         alternateClassName: ['Coder', 'Hacker'],
 *         code: function(msg) {
 *             alert('Typing... ' + msg);
 *         }
 *     });
 *
 *     var joe = Ext.create('Developer');
 *     joe.code('stackoverflow');
 *
 *     var rms = Ext.create('Hacker');
 *     rms.code('hack hack');
 */

/**
 * @cfg {Object} debugHooks
 * A collection of diagnostic methods to decorate the real methods of the class. These
 * methods are applied as an `override` if this class has debug enabled as defined by
 * `Ext.isDebugEnabled`.
 *
 * These will be automatically removed by the Sencha Cmd compiler for production builds.
 *
 * Example usage:
 *
 *      Ext.define('Foo.bar.Class', {
 *          foo: function (a, b, c) {
 *              ...
 *          },
 *
 *          bar: function (a, b) {
 *              ...
 *              return 42;
 *          },
 *
 *          debugHooks: {
 *              foo: function (a, b, c) {
 *                  // check arguments...
 *                  return this.callParent(arguments);
 *              }
 *          }
 *      });
 *
 * If you specify a `$enabled` property in the `debugHooks` object that will be used
 * as the default enabled state for the hooks. If the `{@link Ext#manifest}` contains
 * a `debug` object of if `{@link Ext#debugConfig}` is specified, the `$enabled` flag
 * will override its "*" value.
 */

/**
 * @cfg {Object} deprecated
 * The object given has properties that describe the versions at which the deprecations
 * apply.
 *
 * The purpose of the `deprecated` declaration is to enable development mode to give
 * suitable error messages when deprecated methods or properties are used. Methods can
 * always be injected to provide this feedback, but properties can only be handled on
 * some browsers (those that support `Object.defineProperty`).
 *
 * In some cases, deprecated methods can be restored to their previous behavior or
 * added back if they have been removed.
 *
 * The structure of a `deprecated` declaration is this:
 *
 *      Ext.define('Foo.bar.Class', {
 *          ...
 *
 *          deprecated: {
 *              // Optional package name - default is the framework (ext or touch)
 *              name: 'foobar',
 *
 *              '5.0': {
 *                  methods: {
 *                      // Throws: '"removedMethod" is deprecated.'
 *                      removedMethod: null,
 *
 *                      // Throws: '"oldMethod" is deprecated. Please use "newMethod" instead.'
 *                      oldMethod: 'newMethod',
 *
 *                      // When this block is enabled, this method is applied as an
 *                      // override. Otherwise you get same as "removeMethod".
 *                      method: function () {
 *                          // Do what v5 "method" did. If "method" exists in newer
 *                          // versions callParent can call it. If 5.1 has "method"
 *                          // then it would be next in line, otherwise 5.2 and last
 *                          // would be the current class.
 *                      },
 *
 *                      moreHelpful: {
 *                          message: 'Something helpful to do instead.',
 *                          fn: function () {
 *                              // The v5 "moreHelpful" method to use when enabled.
 *                          }
 *                      }
 *                  },
 *                  properties: {
 *                      // Throws: '"removedProp" is deprecated.'
 *                      removedProp: null,
 *
 *                      // Throws: '"oldProp" is deprecated. Please use "newProp" instead.'
 *                      oldProp: 'newProp',
 *
 *                      helpful: {
 *                          message: 'Something helpful message about what to do.'
 *                      }
 *                      ...
 *                  },
 *                  statics: {
 *                      methods: {
 *                          ...
 *                      },
 *                      properties: {
 *                          ...
 *                      },
 *                  }
 *              },
 *
 *              '5.1': {
 *                  ...
 *              },
 *
 *              '5.2': {
 *                  ...
 *              }
 *          }
 *      });
 *
 * The primary content of `deprecated` are the version number keys. These indicate
 * a version number where methods or properties were deprecated. These versions are
 * compared to the version reported by `Ext.getCompatVersion` to determine the action
 * to take for each "block".
 *
 * When the compatibility version is set to a value less than a version number key,
 * that block is said to be "enabled". For example, if a method was deprecated in
 * version 5.0 but the desired compatibility level is 4.2 then the block is used to
 * patch methods and (to some degree) restore pre-5.0 compatibility.
 *
 * When multiple active blocks have the same method name, each method is applied as
 * an override in reverse order of version. In the above example, if a method appears
 * in the "5.0", "5.1" and "5.2" blocks then the "5.2" method is applied as an override
 * first, followed by the "5.1" method and finally the "5.0" method. This means that
 * the `callParent` from the "5.0" method calls the "5.1" method which calls the
 * "5.2" method which can (if applicable) call the current version.
 */

/**
 * Instantiate a class by either full name, alias or alternate name.
 *
 * If {@link Ext.Loader} is {@link Ext.Loader#setConfig enabled} and the class has
 * not been defined yet, it will attempt to load the class via synchronous loading.
 *
 * For example, all these three lines return the same result:
 *
 *      // xtype
 *      var window = Ext.create({
 *          xtype: 'window',
 *          width: 600,
 *          height: 800,
 *          ...
 *      });
 *
 *      // alias
 *      var window = Ext.create('widget.window', {
 *          width: 600,
 *          height: 800,
 *          ...
 *      });
 *
 *      // alternate name
 *      var window = Ext.create('Ext.Window', {
 *          width: 600,
 *          height: 800,
 *          ...
 *      });
 *
 *      // full class name
 *      var window = Ext.create('Ext.window.Window', {
 *          width: 600,
 *          height: 800,
 *          ...
 *      });
 *
 *      // single object with xclass property:
 *      var window = Ext.create({
 *          xclass: 'Ext.window.Window', // any valid value for 'name' (above)
 *          width: 600,
 *          height: 800,
 *          ...
 *      });
 *
 * @param {String} [name] The class name or alias. Can be specified as `xclass`
 * property if only one object parameter is specified.
 * @param {Object...} [args] Additional arguments after the name will be passed to
 * the class' constructor.
 * @return {Object} instance
 * @member Ext
 * @method create
 */

/**
 * @method widget
 * Convenient shorthand to create a widget by its xtype or a config object.
 *
 *      var button = Ext.widget('button'); // Equivalent to Ext.create('widget.button');
 *
 *      var panel = Ext.widget('panel', { // Equivalent to Ext.create('widget.panel')
 *          title: 'Panel'
 *      });
 *
 *      var grid = Ext.widget({
 *          xtype: 'grid',
 *          ...
 *      });
 *
 * If a {@link Ext.Component component} instance is passed, it is simply returned.
 *
 * @member Ext
 * @param {String} [name] The xtype of the widget to create.
 * @param {Object} [config] The configuration object for the widget constructor.
 * @return {Object} The widget instance
 */

/**
 * @method define
 * Defines a class or override. A basic class is defined like this:
 *
 *      Ext.define('My.awesome.Class', {
 *          someProperty: 'something',
 *
 *          someMethod: function(s) {
 *              alert(s + this.someProperty);
 *          }
 *
 *          ...
 *      });
 *
 *      var obj = new My.awesome.Class();
 *
 *      obj.someMethod('Say '); // alerts 'Say something'
 *
 * To create an anonymous class, pass `null` for the `className`:
 *
 *      Ext.define(null, {
 *          constructor: function () {
 *              // ...
 *          }
 *      });
 *
 * In some cases, it is helpful to create a nested scope to contain some private
 * properties. The best way to do this is to pass a function instead of an object
 * as the second parameter. This function will be called to produce the class
 * body:
 *
 *      Ext.define('MyApp.foo.Bar', function () {
 *          var id = 0;
 *
 *          return {
 *              nextId: function () {
 *                  return ++id;
 *              }
 *          };
 *      });
 *
 * _Note_ that when using override, the above syntax will not override successfully, because
 * the passed function would need to be executed first to determine whether or not the result
 * is an override or defining a new object. As such, an alternative syntax that immediately
 * invokes the function can be used:
 *
 *      Ext.define('MyApp.override.BaseOverride', function () {
 *          var counter = 0;
 *
 *          return {
 *              override: 'Ext.Component',
 *              logId: function () {
 *                  console.log(++counter, this.id);
 *              }
 *          };
 *      }());
 *
 *
 * When using this form of `Ext.define`, the function is passed a reference to its
 * class. This can be used as an efficient way to access any static properties you
 * may have:
 *
 *      Ext.define('MyApp.foo.Bar', function (Bar) {
 *          return {
 *              statics: {
 *                  staticMethod: function () {
 *                      // ...
 *                  }
 *              },
 *
 *              method: function () {
 *                  return Bar.staticMethod();
 *              }
 *          };
 *      });
 *
 * To define an override, include the `override` property. The content of an
 * override is aggregated with the specified class in order to extend or modify
 * that class. This can be as simple as setting default property values or it can
 * extend and/or replace methods. This can also extend the statics of the class.
 *
 * One use for an override is to break a large class into manageable pieces.
 *
 *      // File: /src/app/Panel.js
 *
 *      Ext.define('My.app.Panel', {
 *          extend: 'Ext.panel.Panel',
 *          requires: [
 *              'My.app.PanelPart2',
 *              'My.app.PanelPart3'
 *          ]
 *
 *          constructor: function (config) {
 *              this.callParent(arguments); // calls Ext.panel.Panel's constructor
 *              //...
 *          },
 *
 *          statics: {
 *              method: function () {
 *                  return 'abc';
 *              }
 *          }
 *      });
 *
 *      // File: /src/app/PanelPart2.js
 *      Ext.define('My.app.PanelPart2', {
 *          override: 'My.app.Panel',
 *
 *          constructor: function (config) {
 *              this.callParent(arguments); // calls My.app.Panel's constructor
 *              //...
 *          }
 *      });
 *
 * Another use of overrides is to provide optional parts of classes that can be
 * independently required. In this case, the class may even be unaware of the
 * override altogether.
 *
 *      Ext.define('My.ux.CoolTip', {
 *          override: 'Ext.tip.ToolTip',
 *
 *          constructor: function (config) {
 *              this.callParent(arguments); // calls Ext.tip.ToolTip's constructor
 *              //...
 *          }
 *      });
 *
 * The above override can now be required as normal.
 *
 *      Ext.define('My.app.App', {
 *          requires: [
 *              'My.ux.CoolTip'
 *          ]
 *      });
 *
 * Overrides can also contain statics, inheritableStatics, or privates:
 *
 *      Ext.define('My.app.BarMod', {
 *          override: 'Ext.foo.Bar',
 *
 *          statics: {
 *              method: function (x) {
 *                  return this.callParent([x * 2]); // call Ext.foo.Bar.method
 *              }
 *          }
 *      });
 *
 * Starting in version 4.2.2, overrides can declare their `compatibility` based
 * on the framework version or on versions of other packages. For details on the
 * syntax and options for these checks, see `Ext.checkVersion`.
 *
 * The simplest use case is to test framework version for compatibility:
 *
 *      Ext.define('App.overrides.grid.Panel', {
 *          override: 'Ext.grid.Panel',
 *
 *          compatibility: '4.2.2', // only if framework version is 4.2.2
 *
 *          //...
 *      });
 *
 * An array is treated as an OR, so if any specs match, the override is
 * compatible.
 *
 *      Ext.define('App.overrides.some.Thing', {
 *          override: 'Foo.some.Thing',
 *
 *          compatibility: [
 *              '4.2.2',
 *              'foo@1.0.1-1.0.2'
 *          ],
 *
 *          //...
 *      });
 *
 * To require that all specifications match, an object can be provided:
 *
 *      Ext.define('App.overrides.some.Thing', {
 *          override: 'Foo.some.Thing',
 *
 *          compatibility: {
 *              and: [
 *                  '4.2.2',
 *                  'foo@1.0.1-1.0.2'
 *              ]
 *          },
 *
 *          //...
 *      });
 *
 * Because the object form is just a recursive check, these can be nested:
 *
 *      Ext.define('App.overrides.some.Thing', {
 *          override: 'Foo.some.Thing',
 *
 *          compatibility: {
 *              and: [
 *                  '4.2.2',  // exactly version 4.2.2 of the framework *AND*
 *                  {
 *                      // either (or both) of these package specs:
 *                      or: [
 *                          'foo@1.0.1-1.0.2',
 *                          'bar@3.0+'
 *                      ]
 *                  }
 *              ]
 *          },
 *
 *          //...
 *      });
 *
 * IMPORTANT: An override is only included in a build if the class it overrides is
 * required. Otherwise, the override, like the target class, is not included. In
 * Sencha Cmd v4, the `compatibility` declaration can likewise be used to remove
 * incompatible overrides from a build.
 *
 * @param {String} className The class name to create in string dot-namespaced format, for example:
 * 'My.very.awesome.Class', 'FeedViewer.plugin.CoolPager'
 * It is highly recommended to follow this simple convention:
 *  - The root and the class name are 'CamelCased'
 *  - Everything else is lower-cased
 * Pass `null` to create an anonymous class.
 * @param {Object} data The key - value pairs of properties to apply to this class. Property names can be of any valid
 * strings, except those in the reserved listed below:
 *
 *  - {@link Ext.Class#cfg-alias alias}
 *  - {@link Ext.Class#cfg-alternateClassName alternateClassName}
 *  - {@link Ext.Class#cfg-cachedConfig cachedConfig}
 *  - {@link Ext.Class#cfg-config config}
 *  - {@link Ext.Class#cfg-extend extend}
 *  - {@link Ext.Class#cfg-inheritableStatics inheritableStatics}
 *  - {@link Ext.Class#cfg-mixins mixins}
 *  - {@link Ext.Class#cfg-override override}
 *  - {@link Ext.Class#cfg-platformConfig platformConfig}
 *  - {@link Ext.Class#cfg-privates privates}
 *  - {@link Ext.Class#cfg-requires requires}
 *  - `self`
 *  - {@link Ext.Class#cfg-singleton singleton}
 *  - {@link Ext.Class#cfg-statics statics}
 *  - {@link Ext.Class#cfg-uses uses}
 *  - {@link Ext.Class#cfg-xtype xtype} (for {@link Ext.Component Components} only)
 *
 * @param {Function} [createdFn] Callback to execute after the class is created, the execution scope of which
 * (`this`) will be the newly created class itself.
 * @return {Ext.Base}
 * @member Ext
 */
