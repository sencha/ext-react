import React, { Component } from 'react'
import { Audio, Button, Container } from '@sencha/ext-react-modern';

export default class AudioExample extends Component {

    constructor() {
        super();

        this.state = {
            playing: false
        };
    }

    toggleAudioAndroid() {
        const { audio } = this.refs;
        const { playing } = this.state;

        if (playing) {
            audio.pause();
        } else {
            audio.play();
        }

        this.setState({ playing: !playing });
    }

    render() {
        const { playing } = this.state;

        return (
            <Container layout={{ type: 'vbox', align: 'stretch', pack: 'center' }} padding={10}>
                <Container
                    shadow
                    layout={Ext.os.is.Android ? { type: 'vbox', align: 'center', pack: 'center' } : 'fit'}
                >
                    <Audio
                        ref="audio"
                        loop
                        url="resources/audio/crash.mp3"
                        posterUrl="resources/images/cover.jpg"
                        enableControls={!Ext.os.is.Android}
                    />
                    { Ext.os.is.Android && (
                        <Button text={playing ? 'Play Audio' : 'Pause Audio'} margin={20} handler={this.toggleAudioAndroid.bind(this)}/>
                    )}
                </Container>
            </Container>
        );
    }

}