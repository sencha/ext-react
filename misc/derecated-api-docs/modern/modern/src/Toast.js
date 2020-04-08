/**
 * @class Ext.Toast
 * @extend Ext.Sheet
 *
 * A 'Toast' is a simple modal message that is displayed on the screen and then automatically closed by a timeout or by a user tapping
 * outside of the toast itself. Think about it like a text only alert box that will self destruct.
 *
 * **A Toast should not be instantiated manually**, rather by calling 'Ext.toast(message, timeout)'.
 *
 * This will create one reusable toast container and content will be swapped out as
 * toast messages are queued or displayed.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, Button } from '@sencha/ext-react-modern';
 *
 *     Ext.require('Ext.Toast');
 *
 *     export default class MyExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout={{type: 'vbox', align: 'left'}}>
 *                         <Button
 *                             ui="action"
 *                             handler={() => Ext.toast('Hello World!')}
 *                             text="Show Toast"
 *                         />
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 */

/**
 * @cfg [centered=false]
 * @inheritdoc
 */

/**
 * @cfg [ui='dark']
 * @inheritdoc
 */

/**
 * @cfg showAnimation
 * @inheritdoc
 */

/**
 * @cfg hideAnimation
 * @inheritdoc
 */

/**
 * @cfg {Number} [zIndex=999]
 * Override the default `zIndex` so it is normally always above positioned components.
 */

/**
 * @cfg {String} [message='']
 * The message to be displayed in the {@link Ext.Toast}.
 * @accessor
 */

/**
 * @cfg {Number} [timeout=1000]
 * The amount of time in milliseconds to wait before destroying the toast automatically
 */

/**
 * @cfg {Boolean/Object} [messageAnimation=true]
 * The animation that should be used between toast messages when they are queued up
 */

/**
 * @cfg [hideOnMaskTap=true]
 * @inheritdoc
 */

/**
 * @cfg {Boolean} [modal=false]
 * @hide
 */

/**
 * @cfg layout
 * @inheritdoc
 */
