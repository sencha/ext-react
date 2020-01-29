/**
 * @class Ext.field.TextArea
 * @extend Ext.field.Text
 * @xtype textarea
 *
 * Creates an HTML textarea field on the page. This is useful whenever you need the user
 * to enter large amounts of text (i.e. more than a few words). Typically, text entry on
 * mobile devices is not a pleasant experience for the user so it's good to limit your use
 * of text areas to only those occasions when free form text is required or alternative
 * input methods like select boxes or radio buttons are not possible. Text Areas are
 * usually created inside forms, like this:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, FormPanel, TextAreaField } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout="center">
 *                         <FormPanel shadow>
 *                             <TextAreaField
 *                                 label="Description"
 *                                 width="300"
 *                                 maxRows={10}
 *                             />
 *                         </FormPanel>
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 */

/**
 * @cfg {Boolean} [autoCapitalize=false]
 * @inheritdoc
 */

/**
 * @cfg {Number} [maxRows=null]
 * The maximum number of lines made visible by the input.
 * @accessor
 */
