/**
 * @class Ext.field.Spinner
 * @extend Ext.field.Number
 * @xtype spinnerfield
 *
 * Wraps an HTML5 number field. Example usage:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, SpinnerField, FormPanel } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout="center">
 *                         <FormPanel shadow>
 *                             <SpinnerField
 *                                 label="Spinner"
 *                                 width="150"
 *                                 minValue={0}
 *                                 maxValue={10}
 *                                 stepValue={1}
 *                             />
 *                         </FormPanel>
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 *
 */

/**
 * @event spin
 * Fires when the value is changed via either spinner buttons.
 * @param {Ext.field.Spinner} this
 * @param {Number} value
 * @param {String} direction 'up' or 'down'.
 */

/**
 * @event spindown
 * Fires when the value is changed via the spinner down button.
 * @param {Ext.field.Spinner} this
 * @param {Number} value
 */

/**
 * @event spinup
 * Fires when the value is changed via the spinner up button.
 * @param {Ext.field.Spinner} this
 * @param {Number} value
 */

/**
 * @event updatedata
 * @hide
 */

/**
 * @event action
 * @hide
 */

/**
 * @cfg {Number} [minValue=-infinity]
 * The minimum allowed value.
 * @accessor
 */

/**
 * @cfg {Number} [maxValue=infinity]
 * The maximum allowed value.
 * @accessor
 */

/**
 * @cfg {Number} [stepValue=0.1]
 * Value that is added or subtracted from the current value when a spinner is used.
 * @accessor
 */

/**
 * @cfg {Boolean} [accelerateOnTapHold=true]
 * True if autorepeating should start slowly and accelerate.
 * @accessor
 */

/**
 * @cfg {Boolean} [cycle=false]
 * When set to `true`, it will loop the values of a minimum or maximum is reached.
 * If the maximum value is reached, the value will be set to the minimum.
 * @accessor
 */

/**
 * @cfg {Boolean} [clearIcon=false]
 * @hide
 * @accessor
 */

/**
 * @cfg {Number} [defaultValue=0]
 * The default value for this field when no value has been set.
 * It is also used when the value is set to `NaN`.
 * @accessor
 */
