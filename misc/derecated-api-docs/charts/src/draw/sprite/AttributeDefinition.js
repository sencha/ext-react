/**
 * @class Ext.draw.sprite.AttributeDefinition
 * @extend Ext.Base
 * @private
 *
 * Flyweight object to process the attributes of a sprite.
 * A single instance of the AttributeDefinition is created per sprite class.
 * See `onClassCreated` and `onClassExtended` callbacks
 * of the {@link Ext.draw.sprite.Sprite} for more info.
 */

/**
 * @cfg {Object} defaults
 * Defines the default values of attributes.
 * @accessor
 */

/**
 * @cfg {Object} aliases
 * Defines the alternative names for attributes.
 * @accessor
 */

/**
 * @cfg {Object} animationProcessors
 * Defines the process used to animate between attributes.
 * One doesn't have to define animation processors for sprite attributes that use
 * predefined {@link #processors} from the {@link Ext.draw.sprite.AttributeParser} singleton.
 * For such attributes matching animation processors from the {@link Ext.draw.sprite.AnimationParser}
 * singleton will be used automatically.
 * However, if you have a custom processor for an attribute that should support
 * animation, you must provide a corresponding animation processor for it here.
 * For more information on animation processors please see {@link Ext.draw.sprite.AnimationParser}
 * documentation.
 * @accessor
 */

/**
 * @cfg {Object} processors
 * Defines the preprocessing used on the attributes.
 * One can define a custom processor function here or use the name of a predefined
 * processor from the {@link Ext.draw.sprite.AttributeParser} singleton.
 * @accessor
 */

/**
 * @cfg {Object} triggers
 * Defines which updaters have to be called when an attribute is changed.
 * For example, the config below indicates that the 'size' updater
 * of a {@link Ext.draw.sprite.Square square} sprite has to be called
 * when the 'size' attribute changes.
 *
 *     triggers: {
 *         size: 'size'   // Use comma-separated values here if multiple updaters have to be called.
 *     }                  // Note that the order is _not_ guaranteed.
 *
 * If any of the updaters to be called (triggered by the {@link Ext.draw.sprite.Sprite#setAttributes call)
 * set attributes themselves and those attributes have triggers defined for them,
 * then their updaters will be called after all current updaters finish execution.
 *
 * The updater functions themselves are defined in the {@link #updaters} config,
 * aside from the 'canvas' updater, which doesn't have to be defined and acts as a flag,
 * indicating that this attribute should be applied to a Canvas context (or whatever emulates it).
 * @accessor
 * @since 5.1.0
 */

/**
 * @cfg {Object} updaters Defines the postprocessing used by the attribute.
 * Inside the updater function 'this' refers to the sprite that the attributes belong to.
 * In case of an instancing sprite 'this' will refer to the instancing template.
 * The two parameters passed to the updater function are the attributes object
 * of the sprite or instance, and the names of attributes that triggered this updater call.
 *
 * The example below shows how the 'size' updater changes other attributes
 * of a {@link Ext.draw.sprite.Square square} sprite sprite when its 'size' attribute changes.
 *
 *     updaters: {
 *         size: function (attr) {
 *             var size = attr.size;
 *             this.setAttributes({   // Changes to these attributes will trigger the 'path' updater.
 *                 x: attr.x - size,
 *                 y: attr.y - size,
 *                 height: 2 * size,
 *                 width: 2 * size
 *             });
 *         }
 *     }
 *
 * @accessor
 */
