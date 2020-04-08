/**
 * @class Ext.field.File
 * @extend Ext.field.Field
 * @xtype filefield
 *
 * Creates an HTML file input field on the page. This is usually used to upload files to remote server. File fields are usually
 * created inside a form like this:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, FormPanel, FileField } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout="center">
 *                         <FormPanel shadow>
 *                             <FileField
 *                                 label="Select a File"
 *                                 name="photo"
 *                                 accept="image"
 *                             />
 *                         </FormPanel>
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 */

/**
 * @cfg {Boolean} [multiple=false]
 * Allow selection of multiple files
 *
 * @accessor
 */

/**
 * @cfg {String} [accept=null]
 * File input accept attribute documented here
 * (http://www.w3schools.com/tags/att_input_accept.asp)
 * Also can be simple strings -- e.g. audio, video, image
 *
 * @accessor
 */

/**
 * @cfg {String} [capture=null]
 * File input capture attribute. Accepts values such as
 * "camera", "camcorder", "microphone"
 *
 * @accessor
 */

/**
 * @event change
 * Fires when a file has been selected
 * @param {Ext.field.File} this This field
 * @param {Mixed} newValue The new value
 * @param {Mixed} oldValue The original value
 */
