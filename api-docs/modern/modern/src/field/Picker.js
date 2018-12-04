/**
 * @class Ext.field.Picker
 * @extend Ext.field.Text
 * @xtype pickerfield
 *
 * An abstract class for fields that have a single trigger which opens a "picker" popup 
 * above the field. It provides a base implementation for toggling the picker's 
 * visibility when the trigger is tapped.
 *
 * You would not normally use this class directly, but instead use it as the parent 
 * class for a specific picker field implementation.
 */

/**
 * @cfg {String/Object} [picker='auto']
 *
 * A string representing the type of picker to use.  Can be one of the following values.
 *
 * - `'edge'` to use the {@link #edgePicker}, generally used on small formfactor devices.
 * - `'floated'` to use the {@link #floatedPicker}, generally used on tablets or desktops.
 * - `'auto'` to allow the framework to select the appropriate picker for the device.
 *
 * Can also be a config object for the picker.
 * @accessor
 */

/**
 * @cfg {String/Object} [floatedPicker=null]
 * A configuration object, containing an {@link cfg#xtype} property which specifies the widget to
 * create if `{@link #cfg!picker}: 'floated'` (or if it's '`auto'` and the app is *not* on a phone)
 * @since 6.5.0
 * @accessor
 */

/**
 * @cfg {String/Object} [edgePicker=null]
 * A configuration object, containing an {@link cfg#xtype} property which specifies the widget to
 * create if `{@link #cfg!picker}: 'edge'` (or if it's '`auto'` and the app is on a phone)
 * @since 6.5.0
 * @accessor
 */

/**
 * @cfg {Boolean} [clearIcon=false]
 * @hide
 * @accessor
 */

/**
 * @cfg {Boolean} [matchFieldWidth=true]
 * *Only valid when the `{@link #cfg!picker}: 'floated'` is used.
 * Whether the {@link #cfg!floatedPicker}'s width should be explicitly set to
 * match the width of the input element.
 * @accessor
 */

/**
 * @cfg {String} [floatedPickerAlign=tl-bl?]
 * *Only valud when the {@link #cfg!floatedPicker} is used.
 * The {@link Ext.Component#method!showBy} alignment string to use when showing
 * the floated picker by the input field.
 * @accessor
 */

/**
 * @cfg {Boolean} [autoComplete=false]
 * Autocomplete is disabled on Picker fields by default.
 */

/**
 * @event expand
 * Fires when the field's picker is expanded.
 * @param {Ext.form.field.Picker} field This field instance
 */

/**
 * @event collapse
 * Fires when the field's picker is collapsed.
 * @param {Ext.form.field.Picker} field This field instance
 */
