/**
 * @class Ext.picker.Picker
 * @extend Ext.Sheet
 * @alias widget.picker
 *
 * A general picker class. {@link Ext.picker.Slot}s are used to organize multiple scrollable slots into a single picker. {@link #slots} is
 * the only necessary prop.
 *
 * The primary {@link #slots} props are:
 *
 * - `name`: The name of the slot (will be the key when using {@link #getValues} in this {@link Ext.picker.Picker}).
 * - `title`: The title of this slot (if {@link #useTitles} is set to `true`).
 * - `data`/`store`: The data or store to use for this slot.
 *
 * ## Example
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, Picker, Button } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *         showPicker = () => this.picker.show();
 *
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container>
 *                         <Button ui="action" handler={this.showPicker} text="Show Picker"/>
 *                         <Picker
 *                             ref={picker => this.picker = picker}
 *                             slots={[
 *                                 {
 *                                     name: 'limit_speed',
 *                                     title: 'Speed',
 *                                     data: [
 *                                         {text: '50 KB/s', value: 50},
 *                                         {text: '100 KB/s', value: 100},
 *                                         {text: '200 KB/s', value: 200},
 *                                         {text: '300 KB/s', value: 300}
 *                                     ]
 *                                 }
 *                             ]}
 *                         />
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *
 *     }
 */

/**
 * @event pick
 * Fired when a slot has been picked
 * @param {Ext.Picker} this This Picker.
 * @param {Object} values The values of this picker's slots, in `{name:'value'}` format.
 * @param {Ext.picker.Slot} slot An instance of Ext.Picker.Slot that has been picked.
 */

/**
 * @event change
 * Fired when the value of this picker has changed the Done button has been pressed.
 * @param {Ext.picker.Picker} this This Picker.
 * @param {Object} values The values of this picker's slots, in `{name:'value'}` format.
 */

/**
 * @event cancel
 * Fired when the cancel button is tapped and the values are reverted back to
 * what they were.
 * @param {Ext.Picker} this This Picker.
 */

/**
 * @cfg {String/Mixed} [doneButton=true]
 * Can be either:
 *
 * - A {String} text to be used on the Done button.
 * - An {Object} as prop for {@link Ext.Button}.
 * - `false` or `null` to hide it.
 * @accessor
 */

/**
 * @cfg {String/Mixed} [cancelButton=true]
 * Can be either:
 *
 * - A {String} text to be used on the Cancel button.
 * - An {Object} as a prop for {@link Ext.Button}.
 * - `false` or `null` to hide it.
 * @accessor
 */

/**
 * @cfg {Boolean} [useTitles=false]
 * Generate a title header for each individual slot and use
 * the title prop of the slot.
 * @accessor
 */

/**
 * @cfg {Array} [slots=null]
 * An array of slot props.
 *
 * - `name` {String} - Name of the slot
 * - `data` {Array} - An array of text/value pairs in the format `{text: 'myKey', value: 'myValue'}`
 * - `title` {String} - Title of the slot. This is used in conjunction with `useTitles: true`.
 *
 * @accessor
 */

/**
 * @cfg {String/Number} [value=null]
 * The value to initialize the picker with.
 * @accessor
 */

/**
 * @cfg {Number} [height=220]
 * The height of the picker.
 * @accessor
 */

/**
 * @cfg layout
 * @inheritdoc
 * @accessor
 */

/**
 * @cfg {Boolean} [centered=false]
 * @hide
 */

/**
 * @cfg [left=0]
 * @inheritdoc
 */

/**
 * @cfg [right=0]
 * @inheritdoc
 */

/**
 * @cfg [bottom=0]
 * @inheritdoc
 */

/**
 * @cfg {Ext.TitleBar/Ext.Toolbar/Object} toolbar
 * The toolbar which contains the {@link #doneButton} and {@link #cancelButton} buttons.
 * You can override this if you wish, and add your own props. Just ensure that you take into account
 * the {@link #doneButton} and {@link #cancelButton} props.
 *
 * The default xtype is a {@link Ext.TitleBar}:
 *
 *     toolbar: {
 *         items: [
 *             {
 *                 xtype: 'button',
 *                 text: 'Left',
 *                 align: 'left'
 *             },
 *             {
 *                 xtype: 'button',
 *                 text: 'Right',
 *                 align: 'left'
 *             }
 *         ]
 *     }
 *
 * Or to use a {@link Ext.Toolbar instead}:
 *
 *     toolbar: {
 *         xtype: 'toolbar',
 *         items: [
 *             {
 *                 xtype: 'button',
 *                 text: 'Left'
 *             },
 *             {
 *                 xtype: 'button',
 *                 text: 'Left Two'
 *             }
 *         ]
 *     }
 *
 * @accessor
 */

/**
 * @method setValue
 * Sets the values of the pickers slots.
 * @param {Object} values The values in a {name:'value'} format.
 * @param {Boolean} animated `true` to animate setting the values.
 * @return {Ext.Picker} this This picker.
 */

/**
 * @method getValue
 * Returns the values of each of the pickers slots
 * @return {Object} The values of the pickers slots
 */

/**
 * @method getValues
 * Returns the values of each of the pickers slots.
 * @return {Object} The values of the pickers slots.
 */
