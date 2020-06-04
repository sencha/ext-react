import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Polar } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';

export default class Donut extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['os', 'data1' ],
        data: [
            { os: 'Android', data1: 68.3 },
            { os: 'BlackBerry', data1: 1.7 },
            { os: 'iOS', data1: 17.9 },
            { os: 'Windows Phone', data1: 10.2 },
            { os: 'Others', data1: 1.9 }
        ]
    })

    state = {
        theme: 'default'
    }

    changeTheme = theme => this.setState({ theme })

    onResize = (view, width, height) => {
        const legend = this.refs.chart.getLegend();
        if(width > height) {
            legend.setDocked('right');
        } else {
            legend.setDocked('top');
        }
    }

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar onThemeChange={this.changeTheme} theme={theme}/>
                <Polar
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    ref="chart"
                    insetPadding={50}
                    store={this.store}
                    theme={theme}
                    legend={{
                        type: 'sprite',
                        marker: { size: 16 }
                    }}
                    interactions={['rotate', 'itemhighlight']}
                    series={[{
                        type: 'pie',
                        angleField: 'data1',
                        donut: 50,
                        highlight: true,
                        label: {
                            field: 'os'
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: (tooltip, record) => { tooltip.setHtml(record.get('os') + ': ' + record.get('data1') + '%'); }
                        }
                    }]}
                />
            </Container>
        )
    }
}