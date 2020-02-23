import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';
import createData from './createData';

Ext.require([
    'Ext.chart.interactions.PanZoom',
    'Ext.chart.series.Bar',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category'
]);

export default class StackedBarChartExample extends Component {
    constructor() {
        super();
        this.refresh();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name']
    });

    state = {
        theme: 'default'
    };

    refresh = () => {
        this.store.loadData(createData(15));
    }

    changeTheme = theme => this.setState({ theme })

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    onRefreshClick={this.refresh}
                    theme={theme}
                />
                <Cartesian
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    flipXY={true}
                    store={this.store}
                    theme={theme}
                    insetPadding={'20 20 10 10'}
                    series={[{
                        type: 'bar',
                        xField: 'name',
                        yField: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6']
                    }]}
                    axes={[{
                        type: 'numeric',
                        position: 'bottom',
                        fields: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'],
                        grid: {
                            even: {
                                lineWidth: 1
                            },
                            odd: {
                                stroke: '#fff'
                            }
                        },
                        label: {
                            rotate: {
                                degrees: -90
                            }
                        },
                        maxZoom: 1
                    }, {
                        type: 'category',
                        position: 'left',
                        fields: 'name',
                        maxZoom: 4
                    }]}
                />
            </Container>
        )
    }
}