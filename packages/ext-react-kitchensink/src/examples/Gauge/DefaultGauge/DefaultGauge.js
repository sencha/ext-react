
import React, { Component } from 'react';
import { SliderField, Gauge, FormPanel } from '@sencha/ext-react-modern';

export default class DefaultGaugeExample extends Component {

    constructor() {
        super();
        this.state = {
            value: 40
        }
    }

    updateGauges(slider, value) {
        this.setState({ value })
    }

    render() {
        const { value } = this.state;

        return (
            <FormPanel shadow layout="vbox" maxWidth={350}>
                <SliderField label="Value" onChange={this.updateGauges.bind(this)} value={value}/>
                <Gauge flex={1} value={value}/>
                <Gauge flex={1} value={value} ui={'green'}trackStart={180} trackLength={360}/>
            </FormPanel>
        )
    }

}
