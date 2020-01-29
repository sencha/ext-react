/**
 * @class Ext.field.trigger.Base
 * @extend Ext.Widget
 * @alias trigger.base
 * @mixin Ext.mixin.Factoryable
 * Base class for form field triggers
 * @private
 */

/**
 * @cfg {String} [group]
 * The name of an optional group trigger that this trigger belongs to.  If no trigger
 * Exists by that name one will automatically be created.  A group trigger is a
 * special trigger that contains other triggers.  Those triggers' elements are
 * appended to the group trigger's element in the DOM.
 *
 * The {@link #weight} of grouped triggers is relative to other triggers in the group.
 */

/**
 * @cfg {'left'/'right'} [side='right']
 * The side of the text field's input to render the trigger on.
 */
