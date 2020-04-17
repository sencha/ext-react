
import React, { Component } from 'react';
import { SliderField, Gauge, FormPanel, Container} from '@sencha/ext-react-modern';

Ext.require('Ext.ux.gauge.needle.Diamond');
Ext.require('Ext.ux.gauge.needle.Arrow');
Ext.require('Ext.ux.gauge.needle.Wedge');
Ext.require('Ext.ux.gauge.needle.Spike');

export default class NeedleGaugeExample extends Component {

    constructor() {
        super();
        this.state = {
            value: 30
        }
    }

    updateGauges(slider, value) {
        this.setState({ value })
    }

    render() {
        const { value } = this.state;

        return (
            <FormPanel shadow layout="vbox" width={850}>
                <SliderField label="Value" width={350} onChange={this.updateGauges.bind(this)} value={value}/>
                <Container
                    layout={{
                        type: 'hbox',
                        align: 'stretch'
                    }}
                    margin={'10 0 10 0'} flex={1}
                    width={'100%'}
                    minHeight={200}
                >
                    <Gauge flex={1} value={value}
                        needle={{
                            outerRadius: '100%'
                        }}
                        valueStyle={{
                            display: 'none'
                        }}
                    />
                    <Gauge flex={1} value={value} needle={'wedge'}/>
                </Container>
                <Container
                    layout={{
                        type: 'hbox',
                        align: 'stretch'
                    }}
                    margin={'10 0 10 0'} flex={1}
                    width={'100%'}
                    minHeight={200}
                >
                    <Gauge flex={1} value={value} needle={'spike'}/>
                    <Gauge flex={1} value={value}
                        needle={{
                            type: 'arrow',
                            innerRadius: 0
                        }}
                        textOffset={ {
                            dy: 45
                        }}
                    />
                </Container>
            </FormPanel>
        )
    }

}
