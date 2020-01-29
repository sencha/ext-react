/**
 * @class Ext.field.Toggle
 * @extend Ext.field.SingleSlider
 * @xtype togglefield
 *
 * Specialized {@link Ext.field.Slider} with a single thumb which only supports two
 * {@link #value values}.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, FormPanel, ToggleField } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout="center">
 *                         <FormPanel shadow>
 *                             <ToggleField boxLabel="On" value={true}/>
 *                             <ToggleField boxLabel="Off" value={false}/>
 *                             <ToggleField boxLabel="Disabled" disabled />
 *                             <ToggleField boxLabel="Disabled (On)" disabled value={true} />
 *                         </FormPanel>
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 */

/**
 * @cfg {String} [activeLabel=null]
 * The label to add to the toggle field when it is toggled on.
 * Only available in the Blackberry theme.
 * @accessor
 */

/**
 * @cfg {String} [inactiveLabel=null]
 * The label to add to the toggle field when it is toggled off.
 * Only available in the Blackberry theme.
 * @accessor
 */

/**
 * @cfg [value=false]
 * @inheritdoc Ext.slider.Slider#cfg-value
 * @accessor
 */

/**
 * @event change
 * Fires when an option selection has changed.
 *
 * @param {Ext.field.Toggle} this
 * @param {Number} newValue the new value of this thumb
 * @param {Number} oldValue the old value of this thumb
 */

/**
 * @method toggle
 * Toggles the value of this toggle field.
 * @return {Object} this
 */

/**
 * @method getRawValue
 * Returns the toggled state of the togglefield.
 * @return {Boolean} True if toggled on, else false
 * @since 7.0
 */
