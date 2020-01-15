/**
 * @class Ext.drag.proxy.None
 * @extend Ext.Base
 * @mixins Ext.mixin.Factoryable
 * @alias drag.proxy.none
 *
 * A base class for drag proxies that are shown to represent the
 * dragged item during a drag.
 *
 * Default implementations are:
 * - {@link Ext.drag.proxy.Original}: Moves the original element.
 * - {@link Ext.drag.proxy.Placeholder}: Creates a new element each drag.
 *
 * This implementation does not provide a proxy element, so it can be used
 * for cursor tracking only.
 */
