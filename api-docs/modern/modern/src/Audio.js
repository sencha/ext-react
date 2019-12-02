/**
 * @class Ext.Audio
 * @extend Ext.Media
 * @xtype audio
 *
 * {@link Ext.Audio} is a simple class which provides a container for the
 * [HTML5 Audio element](http://developer.mozilla.org/en-US/docs/Using_HTML5_audio_and_video).
 *
 * ## Recommended File Types/Compression:
 *
 * * Uncompressed WAV and AIF audio
 * * MP3 audio
 * * AAC-LC
 * * HE-AAC audio
 *
 * ## Notes
 *
 * On Android devices, the audio tags controls do not show. You must use the {@link #method-play},
 * {@link #method-pause}, and {@link #toggle} methods to control the audio.
 *
 * ## Example
 *
 * This example shows the use of the {@link Ext.Audio Audio} component with a few
 * Android considerations.
 *
 *     import React, { Component } from 'react'
 *     import { Panel, Audio, Button, Container } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *         constructor() {
 *             super();
 *
 *             this.state = {
 *                 playing: false
 *             };
 *         }
 *
 *         toggleAudioAndroid() {
 *             const { audio } = this.refs;
 *             const { playing } = this.state;
 *
 *             if (playing) {
 *                 audio.pause();
 *             } else {
 *                 audio.play();
 *             }
 *
 *             this.setState({ playing: !playing });
 *         }
 *
 *         render() {
 *             const { playing } = this.state;
 *
 *             return (
 *                 <Container layout={{ type: 'vbox', align: 'stretch', pack: 'center' }}>
 *                     <Container
 *                         shadow
 *                         layout={Ext.os.is.Android ? { type: 'vbox', align: 'center', pack: 'center' } : 'fit'}
 *                     >
 *                         <Audio
 *                             ref="audio"
 *                             loop
 *                             url="resources/audio/crash.mp3"
 *                             posterUrl="resources/images/cover.jpg"
 *                             enableControls={!Ext.os.is.Android}
 *                         />
 *                         { Ext.os.is.Android && (
 *                             <Button text={playing ? 'Play Audio' : 'Pause Audio'} margin={20} handler={this.toggleAudioAndroid.bind(this)}/>
 *                         )}
 *                     </Container>
 *                 </Container>
 *             );
 *         }
 *
 *     }
 */

/**
 * @cfg cls
 * @inheritdoc
 */

/**
 * @cfg {String} url
 * The location of the audio to play.
 *
 * ### Recommended file types are:
 * * Uncompressed WAV and AIF audio
 * * MP3 audio
 * * AAC-LC
 * * HE-AAC audio
 * @accessor
 */
