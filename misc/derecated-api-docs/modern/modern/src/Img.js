/**
 * @class Ext.Img
 * @extend Ext.Component
 * @xtype img
 * @xtype image
 *
 * This is a simple way to add an image of any size to your application and have it participate in the layout system
 * like any other component. This component typically takes between 1 and 3 props - a {@link #src}, and
 * optionally a {@link #height} and a {@link #width}:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react'
 *     import { ExtReact, Panel, Image } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Panel shadow layout="fit">
 *                         <Image
 *                             height="64"
 *                             width="64"
 *                             src="http://www.sencha.com/assets/images/sencha-avatar-64x64.png"
 *                         />
 *                     </Panel>
 *                 </ExtReact>
 *             );
 *         }
 *     }
 */

/**
 * @cfg {String} [src=null]
 * The source of this image. See {@link Ext#resolveResource} for
 * details on locating application resources.
 * @accessor
 */

/**
 * @cfg {String} imageCls
 * The CSS class to be used when {@link #mode} is not set to 'background'
 * @accessor
 */

/**
 * @cfg {String} backgroundCls The CSS class to be used when {@link #mode} is set to 'background'
 * @accessor
 */

/**
 * @cfg {String} [mode='background']
 * If set to 'background', uses a background-image CSS property instead of an
 * `<img>` tag to display the image.
 * @accessor
 */

/**
 * @event tap
 * Fires whenever the component is tapped
 * @param {Ext.Img} this The Image instance
 * @param {Ext.event.Event} e The event object
 */

/**
 * @event load
 * Fires when the image is loaded
 * @param {Ext.Img} this The Image instance
 * @param {Ext.event.Event} e The event object
 */

/**
 * @event error
 * Fires if an error occured when trying to load the image
 * @param {Ext.Img} this The Image instance
 * @param {Ext.event.Event} e The event object
 */
