/**
 * @class Ext.mixin.Dirty
 * @extend Ext.Base
 * This mixin provides a `dirty` config that tracks the modified state of an object. If
 * the class using this mixin is {@link Ext.mixin.Observable observable}, changes to the
 * `dirty` config will fire the `dirtychange` event.
 * @protected
 * @since 6.2.0
 */

/**
 * @event dirtychange
 * Fires when a change in the object's {@link #cfg-dirty} state is detected.
 *
 * **Note:** In order for this event to fire, the class that mixes in this mixin
 * must be `{@link Ext.mixin.Observable Observable}`.
 *
 * @param {Ext.Base} this
 * @param {Boolean} dirty Whether or not the object is now dirty.
 */

/**
 * @cfg {Boolean} [dirty=null]
 * This config property describes the modified state of this object. In most
 * cases this config's value is maintained by the object and should be considered
 * readonly. The class implementor should be the only one to call the setter.
 * @accessor
 */

/**
 * @cfg {Boolean} [ignoreDirty=false]
 * This config property indicates that the `dirty` state of this object should be
 * ignored. Because this capability is mixed in at a class level, this config can
 * be helpful when some instances do not participate in dirty state tracking.
 *
 * This option should be set at construction time. When set to `true`, the object
 * will always have `dirty` value of `false`.
 */

/**
 * @method isDirty
 * Returns `true` if this object is `dirty`.
 */
