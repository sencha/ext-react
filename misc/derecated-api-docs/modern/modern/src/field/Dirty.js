/**
 * @class Ext.field.Dirty
 * @extend Ext.Mixin
 * 
 * A mixin that adds `dirty` config and `dirtychange` event to a component (typically a
 * `field` or `form`).
 * @private
 * @since 7.0
 */

/**
 * @event dirtychange
 * Fires when a change in the component's {@link #cfg-dirty} state is detected.
 *
 * For containers, this event will be fired on a short delay in some cases.
 *
 * @param {Ext.Component} this
 * @param {Boolean} dirty True if the component is now dirty.
 * @since 7.0
 */

/**
 * @cfg {Boolean} bubbleDirty
 * Set to `false` to disable dirty states affecting ancestor containers such as
 * `fieldpanel` or `formpanel`. The dirty state of such containers is based on the
 * presence of dirty descendants. In some cases, however, it may be desired to
 * hide the dirty state of one of these containers from its ancestor containers.
 * @since 7.0
 */

/**
 * @cfg {Boolean} dirty
 * This config property describes the modified state of this component. In most
 * cases this config's value is maintained by the component and should be considered
 * readonly. The class implementor should be the only one to call the setter.
 *
 * For containers, this config will be updated on a short delay in some cases.
 * @since 7.0
 */

/**
 * @method adjustChildDirtyCount
 * This method is called by descendants that use this mixin when their `dirty` state
 * changes.
 * @param {Boolean} dirty The dirty state of the descendant component.
 * @private
 */

/**
 * @method beginSyncChildDirty
 * This method is called when the component hierarchy has changed and the current set
 * of descendants will be reasserting their `dirty` state. This method is only called
 * on `nameHolder` containers.
 * @private
 */


/**
 * @method finishSyncChildDirty
 * This method is called when the component hierarchy has changed after the current set
 * of descendants has reasserted their `dirty` state. This method is only called on
 * `nameHolder` containers.
 * @private
 */

/**
 *  @method fireDirtyChange
 * @private
 */

/**
 * @method fixDirtyState
 * This method is called after `_fixReference()` during the reference sync sweep. We
 * need to inform our parent if we are a leaf component and if we are dirty. If we are
 * a `nameHolder` then we'll inform the parent in `finishSyncChildDirty`.
 * @private
 */