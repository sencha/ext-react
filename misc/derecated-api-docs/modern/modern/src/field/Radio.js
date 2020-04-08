/**
 * @class Ext.field.Radio
 * @extend Ext.field.Checkbox
 * @xtype radiofield
 * @xtype radio
 *
 * The radio field is an enhanced version of the native browser radio controls and is a
 * good way of allowing your user to choose one option out of a selection of several
 * (for example, choosing a favorite color):
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, FormPanel, RadioField, FieldSet } from '@sencha/ext-react-modern';
 *
 *     const radioProps = {
 *         name: 'radios'
 *     };
 *
 *     export default class MyExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout="center">
 *                         <FormPanel shadow layout={{type: 'vbox', align: 'left'}}>
 *                             <RadioField {...radioProps} boxLabel="Checked" value="checked" checked/>
 *                             <RadioField {...radioProps} boxLabel="Unchecked" value="unchecked"/>
 *                             <RadioField {...radioProps} boxLabel="Disabled" value="disabled" disabled/>
 *                         </FormPanel>
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 */

/**
 * @method getGroupValue
 * Returns the selected value if this radio is part of a group (other radio fields with
 * the same name, in the same FormPanel),
 * @return {String}
 */

/**
 * @method setGroupValue
 * Set the matched radio field's status (that has the same value as the given string)
 * to checked.
 * @param {String} value The value of the radio field to check.
 * @return {Ext.field.Radio} The field that is checked.
 */
