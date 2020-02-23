import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Polar } from '@sencha/ext-react-modern';
import data from './data';
import ChartToolbar from '../../ChartToolbar';

Ext.require([
    'Ext.chart.series.Scatter',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category'
]);

export default class BasicScatterChartExample extends Component {

    store = Ext.create('Ext.data.Store', {
        data
    });

    state = {
        theme: 'default'
    };

    changeTheme = theme => this.setState({ theme })

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    theme={theme}
                />
                <Polar
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    insetPadding={25}
                    store={this.store}
                    theme={theme}
                    interactions="rotate"
                    axes={[{
                        type: 'numeric',
                        position: 'radial',
                        fields: 'data1',
                        renderer: (axis, label, layoutContext) => layoutContext.renderer(label) + '%',
                        grid: true,
                        minimum: 0,
                        maximum: 25,
                        majorTickSteps: 4
                    }, {
                        type: 'category',
                        position: 'angular',
                        grid: true
                    }]}
                    series={[{
                        type: 'radar',
                        angleField: 'month',
                        radiusField: 'data1',
                        style: {
                            opacity: 0.80
                        },
                        highlight: {
                            fillStyle: '#000',
                            lineWidth: 2,
                            strokeStyle: '#fff'
                        }
                    }]}
                />
            </Container>
        )
    }
}