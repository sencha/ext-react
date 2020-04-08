import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';
import createData from './createData';

Ext.require([
    'Ext.chart.series.Bar',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category'
]);

export default class BasicColumnChartExample extends Component {

    constructor() {
        super();
        this.refresh();
    }

    store = Ext.create('Ext.data.Store', {
        fields: [
            'month',
            'high',
            'low',
            {
                name: 'highF',
                calculate: function (data) {
                    return data.high * 1.8 + 32;
                }
            },
            {
                name: 'lowF',
                calculate: function (data) {
                    return data.low * 1.8 + 32;
                }
            }
        ]
    });

    state = {
        theme: 'default'
    };

    refresh = () => {
        this.store.loadData(createData());
    }

    changeTheme = theme => this.setState({ theme })

    render() {
        const { theme } = this.state;

        return (
            <Container layout="fit" padding={8}>
                <ChartToolbar
                    onRefreshClick={this.refresh}
                    onThemeChange={this.changeTheme}
                    theme={theme}
                />
                <Cartesian
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    insetPadding="20 10"
                    store={this.store}
                    theme={theme}
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        minimum: 30,
                        title: 'Temperature in °F'
                    }, {
                        type: 'category',
                        position: 'bottom'
                    }]}
                    series={[{
                        type: 'bar',
                        xField: 'month',
                        yField: 'highF'
                    }]}
                />
            </Container>
        )
    }
}