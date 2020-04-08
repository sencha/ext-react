import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Polar } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';

export default class Spie extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['os', 'data1', 'data2'],
        data: [
            { os: 'Android', data1: 68.3, data2: 150 },
            { os: 'iOS', data1: 17.9, data2: 200 },
            { os: 'Windows Phone', data1: 10.2, data2: 250 },
            { os: 'BlackBerry', data1: 1.7, data2: 90 },
            { os: 'Others', data1: 1.9, data2: 190 }
        ]
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
                    store={this.store}
                    theme={theme}
                    legend={{
                        type: 'sprite',
                        docked: 'bottom',
                        marker: { size: 16 }
                    }}
                    interactions={['rotate', 'itemhighlight']}
                    series={[{
                        type: 'pie',
                        animation: {
                            easing: 'easeOut',
                            duration: 500
                        },
                        angleField: 'data1',  // bind pie slice angular span to market share
                        radiusField: 'data2', // bind pie slice radius to growth rate
                        clockwise: false,
                        highlight: {
                            margin: 20
                        },
                        label: {
                            field: 'os',      // bind label text to name
                            display: 'outside',
                            fontSize: 14
                        },
                        style: {
                            strokeStyle: 'white',
                            lineWidth: 1
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: (tooltip, record) => { tooltip.setHtml(record.get('os') + ': ' + record.get('data1') + '%') }
                        }
                    }]}
                />
            </Container>
        )
    }
}