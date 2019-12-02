/**
 * @class Ext.field.Email
 * @extend Ext.field.Text
 * @xtype emailfield
 *
 * The Email field creates an HTML5 email input and is usually created inside a form.
 * Because it creates an HTML email input field, most browsers will show a specialized
 * virtual keyboard for email address input. Aside from that, the email field is just a
 * normal text field. Here's an example of how to use it in a form:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, FormPanel, EmailField } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout="center">
 *                         <FormPanel shadow>
 *                             <EmailField
 *                                 width={250}
 *                                 placeholder="user@domain.com"
 *                                 label="Email"
 *                             />
 *                         </FormPanel>
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 *
 * Because email field inherits from {@link Ext.field.Text textfield} it gains all of the
 * functionality that text fields provide, including getting and setting the value at
 * runtime, validations and various events that are fired as the user interacts with
 * the component. Check out the {@link Ext.field.Text} docs to see the additional
 * functionality available.
 */

/**
 * @cfg [autoCapitalize=false]
 * @inheritdoc
 */
