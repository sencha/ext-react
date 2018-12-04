/**
 * @class Ext.Class
 *
 * This is a low level factory that is used by {@link Ext#define Ext.define} and should not be used
 * directly in application code.
 * 
 * The configs of this class are intended to be used in `Ext.define` calls to describe the class you
 * are declaring. For example:
 * 
 *     Ext.define('App.util.Thing', {
 *         extend: 'App.util.Other',
 * 
 *         alias: 'util.thing',
 * 
 *         config: {
 *             foo: 42
 *         }
 *     });
 *
 * Ext.Class is the factory and **not** the superclass of everything. For the base class that **all**
 * classes inherit from, see {@link Ext.Base}.
 */

/**
 * @cfg {String} extend
 * The parent class that this class extends. For example:
 *
 *     Ext.define('Person', {
 *         say: function(text) { alert(text); }
 *     });
 *
 *     Ext.define('Developer', {
 *         extend: 'Person',
 *         say: function(text) { this.callParent(["print "+text]); }
 *     });
 */

/**
 * @cfg {Object} eventedConfig
 * Config options defined within `eventedConfig` will auto-generate the setter /
 * getter methods (see {@link #cfg-config config} for more information on
 * auto-generated getter / setter methods).  Additionally, when an
 * `eventedConfig` is set it will also fire a before{cfg}change and {cfg}change
 * event when the value of the eventedConfig is changed from its originally
 * defined value.
 *
 * **Note:** When creating a custom class you'll need to extend Ext.Evented
 *
 * Example custom class:
 *
 *     Ext.define('MyApp.util.Test', {
 *         extend: 'Ext.Evented',
 *
 *         eventedConfig: {
 *             foo: null
 *         }
 *     });
 *
 * In this example, the `foo` config will initially be null.  Changing it via
 * `setFoo` will fire the `beforefoochange` event.  The call to the setter can be
 * halted by returning `false` from a listener on the **before** event.
 *
 *     var test = Ext.create('MyApp.util.Test', {
 *         listeners: {
 *             beforefoochange: function (instance, newValue, oldValue) {
 *                 return newValue !== 'bar';
 *             },
 *             foochange: function (instance, newValue, oldValue) {
 *                console.log('foo changed to:', newValue);
 *             }
 *         }
 *     });
 *
 *     test.setFoo('bar');
 *
 * The `before` event handler can be used to validate changes to `foo`.
 * Returning `false` will prevent the setter from changing the value of the
 * config.  In the previous example the `beforefoochange` handler returns false
 * so `foo` will not be updated and `foochange` will not be fired.
 *
 *     test.setFoo('baz');
 *
 * Setting `foo` to 'baz' will not be prevented by the `before` handler.  Foo
 * will be set to the value: 'baz' and the `foochange` event will be fired.
 */

/**
 * @cfg {Object} privates
 * The `privates` config is a list of methods intended to be used internally by the
 * framework.  Methods are placed in a `privates` block to prevent developers from
 * accidentally overriding framework methods in custom classes.
 *
 *     Ext.define('Computer', {
 *         privates: {
 *             runFactory: function(brand) {
 *                 // internal only processing of brand passed to factory
 *                 this.factory(brand);
 *             }
 *         },
 *
 *         factory: function (brand) {}
 *     });
 *
 * In order to override a method from a `privates` block, the overridden method must
 * also be placed in a `privates` block within the override class.
 *
 *     Ext.define('Override.Computer', {
 *         override: 'Computer',
 *         privates: {
 *             runFactory: function() {
 *                 // overriding logic
 *             }
 *         }
 *     });
 */

/**
 * @cfg {Object} statics
 * List of static methods for this class. For example:
 *
 *     Ext.define('Computer', {
 *          statics: {
 *              factory: function(brand) {
 *                  // 'this' in static methods refer to the class itself
 *                  return new this(brand);
 *              }
 *          },
 *
 *          constructor: function() { ... }
 *     });
 *
 *     var dellComputer = Computer.factory('Dell');
 */

/**
 * @cfg {Object} inheritableStatics
 * List of inheritable static methods for this class.
 * Otherwise just like {@link #statics} but subclasses inherit these methods.
 */

/**
 * @cfg {Object} config
 *
 * List of configuration options with their default values.
 *
 * __Note:__ You need to make sure {@link Ext.Base#initConfig} is called from your constructor if you are defining
 * your own class or singleton, unless you are extending a Component. Otherwise the generated getter and setter
 * methods will not be initialized.
 *
 * Each config item will have its own setter and getter method automatically generated inside the class prototype
 * during class creation time, if the class does not have those methods explicitly defined.
 *
 * As an example, let's convert the name property of a Person class to be a config item, then add extra age and
 * gender items.
 *
 *     Ext.define('My.sample.Person', {
 *         config: {
 *             name: 'Mr. Unknown',
 *             age: 0,
 *             gender: 'Male'
 *         },
 *
 *         constructor: function(config) {
 *             this.initConfig(config);
 *
 *             return this;
 *         }
 *
 *         // ...
 *     });
 *
 * Within the class, this.name still has the default value of "Mr. Unknown". However, it's now publicly accessible
 * without sacrificing encapsulation, via setter and getter methods.
 *
 *     var jacky = new Person({
 *         name: "Jacky",
 *         age: 35
 *     });
 *
 *     alert(jacky.getAge());      // alerts 35
 *     alert(jacky.getGender());   // alerts "Male"
 *
 *     jacky.walk(10);             // alerts "Jacky is walking 10 steps"
 *
 *     jacky.setName("Mr. Nguyen");
 *     alert(jacky.getName());     // alerts "Mr. Nguyen"
 *
 *     jacky.walk(10);             // alerts "Mr. Nguyen is walking 10 steps"
 *
 * Notice that we changed the class constructor to invoke this.initConfig() and pass in the provided config object.
 * Two key things happened:
 *
 *  - The provided config object when the class is instantiated is recursively merged with the default config object.
 *  - All corresponding setter methods are called with the merged values.
 *
 * Beside storing the given values, throughout the frameworks, setters generally have two key responsibilities:
 *
 *  - Filtering / validation / transformation of the given value before it's actually stored within the instance.
 *  - Notification (such as firing events) / post-processing after the value has been set, or changed from a
 *    previous value.
 *
 * By standardize this common pattern, the default generated setters provide two extra template methods that you
 * can put your own custom logics into, i.e: an "applyFoo" and "updateFoo" method for a "foo" config item, which are
 * executed before and after the value is actually set, respectively. Back to the example class, let's validate that
 * age must be a valid positive number, and fire an 'agechange' if the value is modified.
 *
 *     Ext.define('My.sample.Person', {
 *         config: {
 *             // ...
 *         },
 *
 *         constructor: {
 *             // ...
 *         },
 *
 *         applyAge: function(age) {
 *             if (typeof age !== 'number' || age < 0) {
 *                 console.warn("Invalid age, must be a positive number");
 *                 return;
 *             }
 *
 *             return age;
 *         },
 *
 *         updateAge: function(newAge, oldAge) {
 *             // age has changed from "oldAge" to "newAge"
 *             this.fireEvent('agechange', this, newAge, oldAge);
 *         }
 *
 *         // ...
 *     });
 *
 *     var jacky = new Person({
 *         name: "Jacky",
 *         age: 'invalid'
 *     });
 *
 *     alert(jacky.getAge());      // alerts 0
 *
 *     alert(jacky.setAge(-100));  // alerts 0
 *     alert(jacky.getAge());      // alerts 0
 *
 *     alert(jacky.setAge(35));    // alerts 0
 *     alert(jacky.getAge());      // alerts 35
 *
 * In other words, when leveraging the config feature, you mostly never need to define setter and getter methods
 * explicitly. Instead, "apply*" and "update*" methods should be implemented where necessary. Your code will be
 * consistent throughout and only contain the minimal logic that you actually care about.
 *
 * When it comes to inheritance, the default config of the parent class is automatically, recursively merged with
 * the child's default config. The same applies for mixins.
 */

/**
 * @cfg {Object} cachedConfig
 *
 * This configuration works in a very similar manner to the {@link #config} option.
 * The difference is that the configurations are only ever processed when the first instance
 * of that class is created. The processed value is then stored on the class prototype and
 * will not be processed on subsequent instances of the class. Getters/setters will be generated
 * in exactly the same way as {@link #config}.
 *
 * This option is useful for expensive objects that can be shared across class instances.
 * The class itself ensures that the creation only occurs once.
 */

/**
 * @cfg {String[]/Object} mixins
 * List of classes to mix into this class. For example:
 *
 *     Ext.define('CanSing', {
 *          sing: function() {
 *              alert("For he's a jolly good fellow...")
 *          }
 *     });
 *
 *     Ext.define('Musician', {
 *          mixins: ['CanSing']
 *     })
 *
 * In this case the Musician class will get a `sing` method from CanSing mixin.
 *
 * But what if the Musician already has a `sing` method? Or you want to mix
 * in two classes, both of which define `sing`?  In such a cases it's good
 * to define mixins as an object, where you assign a name to each mixin:
 *
 *     Ext.define('Musician', {
 *          mixins: {
 *              canSing: 'CanSing'
 *          },
 *
 *          sing: function() {
 *              // delegate singing operation to mixin
 *              this.mixins.canSing.sing.call(this);
 *          }
 *     })
 *
 * In this case the `sing` method of Musician will overwrite the
 * mixed in `sing` method. But you can access the original mixed in method
 * through special `mixins` property.
 */

/**
 * This object contains properties that describe the current device or platform. These
 * values can be used in `{@link Ext.Class#platformConfig platformConfig}` as well as
 * `{@link Ext.mixin.Responsive#responsiveConfig responsiveConfig}` statements.
 *
 * This object can be modified to include tags that are useful for the application. To
 * add custom properties, it is advisable to use a sub-object. For example:
 *
 *      Ext.platformTags.app = {
 *          mobile: true
 *      };
 *
 * @property {Object} platformTags
 * @property {Boolean} platformTags.phone
 * @property {Boolean} platformTags.tablet
 * @property {Boolean} platformTags.desktop
 * @property {Boolean} platformTags.touch Indicates touch inputs are available.
 * @property {Boolean} platformTags.safari
 * @property {Boolean} platformTags.chrome
 * @property {Boolean} platformTags.windows
 * @property {Boolean} platformTags.firefox
 * @property {Boolean} platformTags.ios True for iPad, iPhone and iPod.
 * @property {Boolean} platformTags.android
 * @property {Boolean} platformTags.blackberry
 * @property {Boolean} platformTags.tizen
 * @member Ext
 */

