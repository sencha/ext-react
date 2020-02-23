import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Polar } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';
import {innerData, outerData} from './createData';

export default class DoubleDonut extends Component {

    outerStore = Ext.create('Ext.data.Store', {
        data: outerData
    })
    innerStore = Ext.create('Ext.data.Store', {
        data: innerData
    })

    state = {
        theme: 'default'
    }

    changeTheme = theme => this.setState({ theme })

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar onThemeChange={this.changeTheme} theme={theme}/>
                <Polar
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    insetPadding={20}
                    innerPadding={20}
                    interactions={['rotate', 'itemhighlight']}
                    store={this.outerStore}
                    theme={theme}
                    series={[{
                        type: 'pie',
                        angleField: 'usage',
                        label: {
                            field: 'type',
                            display: 'inside'
                        },
                        store: this.innerStore,
                        radiusFactor: 70,
                        donut: 20,
                        tooltip: {
                            trackMouse: true,
                            renderer: (tooltip, record) => { tooltip.setHtml(Ext.String.capitalize(record.get('type')) + ' sector: ' + record.get('usage')); }
                        }
                    }, {
                        type: 'pie',
                        angleField: 'usage',
                        donut: 80,
                        highlight: true,
                        label: { field: 'provider' },
                        tooltip: {
                            trackMouse: true,
                            renderer: (tooltip, record) => { tooltip.setHtml(record.get('provider') + ': ' + record.get('usage')); }
                        }
                    }]}
                />
            </Container>
        )
    }
}