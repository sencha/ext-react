/**
 * @class Ext.field.Url
 * @extend Ext.field.Text
 * @xtype urlfield
 *
 * The Url field creates an HTML5 url input and is usually created inside a form. Because it creates an HTML url input
 * field, most browsers will show a specialized virtual keyboard for web address input. Aside from that, the url field
 * is just a normal text field. Here's an example of how to use it in a form:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, FormPanel, URLField } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout="center">
 *                         <FormPanel shadow>
 *                             <URLField placeholder="http://www.domain.com" label="URL" width="200"/>
 *                         </FormPanel>
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 *
 * Because url field inherits from {@link Ext.field.Text textfield} it gains all of the functionality that text fields
 * provide, including getting and setting the value at runtime, validations and various events that are fired as the
 * user interacts with the component. Check out the {@link Ext.field.Text} docs to see the additional functionality
 * available.
 */

/**
 * @cfg [autoCapitalize=false]
 * @inheritdoc
 */
