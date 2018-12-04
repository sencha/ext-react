/**
 * @class Ext.field.trigger.Trigger
 * @extend Ext.Widget
 * @xtype trigger
 * @alias trigger.trigger
 *
 * Text Field {@link Ext.field.Text#triggers trigger} widget.
 */

/**
 * @cfg {String} [group=null]
 * The name of an optional group trigger that this trigger belongs to.  If no trigger
 * Exists by that name one will automatically be created.  A group trigger is a
 * special trigger that contains other triggers.  Those triggers' elements are
 * appended to the group trigger's element in the DOM.
 *
 * The {@link #weight} of grouped triggers is relative to other triggers in the group.
 * @accessor
 */

/**
 * @cfg {Function/String} [handler=null]
 * Function to run when trigger is clicked or tapped.
 * @controllable
 * @accessor
 */

/**
 * @cfg [iconCls=null]
 * @inheritdoc Ext.Button#cfg-iconCls
 * @accessor
 */

/**
 * @cfg {Boolean/Object} [repeat=null]
 * `true` to attach a {@link Ext.util.ClickRepeater tap repeater} to the trigger,
 * or a config object for a tap repeater.
 * @accessor
 */

/**
 * @cfg {'left'/'right'} [side=null]
 * The side of the text field's input to render the trigger on.
 * @accessor
 */

/**
 * @cfg {Object} [scope=null]
 * Execution context for the {@link #handler} function.
 * @accessor
 */
