/**
 * @class Ext.field.Number
 * @extend Ext.field.Text
 * @xtype numberfield
 *
 * The Number field creates an HTML5 number input and is usually created inside a form. Because it creates an HTML
 * number input field, most browsers will show a specialized virtual keyboard for entering numbers. The Number field
 * only accepts numerical input and also provides additional spinner UI that increases or decreases the current value
 * by a configured {@link #stepValue step value}. Here's how we might use one in a form:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, NumberField, FormPanel } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout="center">
 *                         <FormPanel shadow>
 *                             <NumberField
 *                                 label="Number"
 *                                 width="150"
 *                             />
 *                         </FormPanel>
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 *
 * ## minValue, maxValue and stepValue
 *
 * The {@link #minValue} and {@link #maxValue} props are self-explanatory and simply constrain the value
 * entered to the range specified by the configured min and max values. The other option exposed by this component
 * is {@link #stepValue}, which enables you to set how much the value changes every time the up and down spinners
 * are tapped on.
 *
 * Because number field inherits from {@link Ext.field.Text textfield} it gains all of the functionality that text
 * fields provide, including getting and setting the value at runtime, validations and various events that are fired as
 * the user interacts with the component. Check out the {@link Ext.field.Text} docs to see the additional functionality
 * available.
 */

/**
 * @cfg {Number} [minValue=null] The minimum value that this Number field can accept
 * (defaults to `undefined`, e.g. no minimum).
 * @accessor
 */

/**
 * @cfg {Number} [maxValue=null] The maximum value that this Number field can accept
 * (defaults to `undefined`, e.g. no maximum).
 * @accessor
 */

/**
 * @cfg {Number} [stepValue=null] The amount by which the field is incremented or
 * decremented each time the spinner is tapped.
 *
 * Defaults to `undefined`, which means that the field goes up or down by 1 each time
 * the spinner is tapped.
 * @accessor
 */

/**
 * @cfg {Number} [decimals=2]
 * The maximum precision to display after the decimal separator.
 * @locale
 * @accessor
 */
