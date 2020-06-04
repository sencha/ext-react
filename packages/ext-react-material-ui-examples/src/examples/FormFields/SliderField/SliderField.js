import React, { Component } from 'react';
import { Container, Formpanel, Sliderfield } from '@sencha/ext-react-modern';

export default class SliderfieldExample extends Component {

    state = {
        singleValue: 20,
        liveUpdateValue: 60,
        multipleValue: [10, 70]
    };

    onSingleChange = ({ sender, newValue, oldValue }) => {
        this.setState({ singleValue: newValue });
    }

    onMultipleChange = ({ sender, newValue, oldValue }) => {
        this.setState({ multipleValue: newValue });
    }

    onLiveUpdateChange = ({ sender, newValue, oldValue }) => {
        this.setState({ liveUpdateValue: newValue });
    }

    render() {
        const { singleValue, multipleValue, liveUpdateValue } = this.state;

        return (
            <Formpanel shadow width="300" padding="20">
                <Sliderfield
                    onChange={this.onSingleChange}
                    label="Single Thumb"
                    value={singleValue}
                    padding="5"
                />
                <Container style={{marginBottom: '20px'}} html={`Value: ${singleValue}`}></Container>
                <Sliderfield
                    onChange={this.onLiveUpdateChange}
                    label="Live Update"
                    value={liveUpdateValue}
                    liveUpdate
                    padding="5"
                />
                <Container style={{marginBottom: '20px'}} html={`Value: ${liveUpdateValue}`}></Container>
                <Sliderfield
                    onChange={this.onMultipleChange}
                    label="Multiple Thumbs"
                    values={multipleValue}
                    padding="5"
                />
                <Container html={`Values: ${multipleValue.join(', ')}`}></Container>
            </Formpanel>
        )
    }

}