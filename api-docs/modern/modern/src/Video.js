/**
 * @class Ext.Video
 * @extend Ext.Media
 * @xtype video
 *
 * Provides a simple Container for HTML5 Video.
 *
 * ## Notes
 *
 * - There are quite a few issues with the `<video>` tag on Android devices.
 *
 * On Android 2+, the video will appear and play on first attempt, but any attempt
 * afterwards will not work.
 *
 * ## Useful Fields
 *
 * - {@link #url}
 * - {@link #autoPause}
 * - {@link #autoResume}
 *
 * ## Useful Methods
 *
 * - {@link #method-pause}
 * - {@link #method-play}
 * - {@link #toggle}
 *
 * ## Example
 *
 *     import React, { Component } from 'react'
 *     import { Panel, Video } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *         return (
 *             <Panel shadow layout="fit">
 *                 <Video
 *                     loop
 *                     url={['resources/video/BigBuck.m4v', 'resources/video/BigBuck.webm']}
 *                     posterUrl="resources/images/cover.jpg"
 *                 />
 *             </Panel>
 *         );
 *     }
 */

/**
 * @cfg {String/Array} url
 * Location of the video to play. This should be in H.264 format and in a .mov file format.
 * @accessor
 */

/**
 * @cfg {String} [posterUrl=null]
 * Location of a poster image to be shown before showing the video.
 * @accessor
 */

/**
 * @cfg {Boolean} [controls=true]
 * Determines if native controls should be shown for this video player.
 */
