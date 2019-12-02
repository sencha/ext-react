import React, { Component } from 'react';
import { Container, FormPanel, SliderField } from '@sencha/ext-react-modern';

export default class SliderFieldExample extends Component {

    state = {
        singleValue: 20,
        liveUpdateValue: 60,
        multipleValue: [10, 70]
    };

    onSingleChange = (field, value) => {
        this.setState({ singleValue: value });
    }

    onMultipleChange = (field, value) => {
        this.setState({ multipleValue: value });
    }

    onLiveUpdateChange = (field, value) => {
        this.setState({ liveUpdateValue: value });
    }

    render() {
        const { singleValue, multipleValue, liveUpdateValue } = this.state;

        return (
            <FormPanel shadow width="300" padding="20">
                <SliderField
                    onChange={this.onSingleChange}
                    label="Single Thumb"
                    value={singleValue}
                    padding="5"
                />
                <Container style={{marginBottom: '20px'}} html={`Value: ${singleValue}`}></Container>
                <SliderField
                    onChange={this.onLiveUpdateChange}
                    label="Live Update"
                    value={liveUpdateValue}
                    liveUpdate
                    padding="5"
                />
                <Container style={{marginBottom: '20px'}} html={`Value: ${liveUpdateValue}`}></Container>
                <SliderField
                    onChange={this.onMultipleChange}
                    label="Multiple Thumbs"
                    values={multipleValue}
                    padding="5"
                />
                <Container html={`Values: ${multipleValue.join(', ')}`}></Container>
            </FormPanel>
        )
    }

}