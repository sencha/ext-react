import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../ChartToolbar';
import data from './data';

Ext.require([
    'Ext.chart.CartesianChart',
    'Ext.chart.axis.Category',
    'Ext.chart.axis.Numeric',
    'Ext.chart.series.BoxPlot',
    'Ext.chart.series.Scatter'
]);

export default class BoxPlotExample extends Component {

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
                    onToggleZoomOnPan={this.toggleZoomOnPan}
                    onRefreshClick={this.refresh}
                    theme={theme}
                    onlyMidnight
                />
                <Cartesian
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    theme={theme}
                    captions={{
                        title: {
                            text: 'Age of Nobel Prize winners by field\n1901 to 2014'
                        }
                    }}
                    store={this.store}
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        minimum: 10,
                        majorTickSteps: 8,
                        grid: true,
                        limits: [{
                            value: 60,
                            line: {
                                strokeStyle: 'red',
                                lineWidth: 2,
                                lineDash: [6, 3],
                                title: {
                                    text: 'Theoretical mean: 60',
                                    fontWeight: 'bold',
                                    fillStyle: 'black',
                                    fontSize: 14
                                }
                            }
                        }]
                    }, {
                        type: 'category',
                        position: 'bottom'
                    }]}
                    series={[{
                        type: 'boxplot',
                        xField: 'field',
                        store: this.store,
                        highlight: true,
                        style: {
                            maxBoxWidth: 52,
                            lineWidth: 2
                        },
                        renderer: this.onBoxPlotRender,
                        tooltip: {
                            trackMouse: true,
                            renderer: this.onBoxPlotTooltip
                        }
                    }, {
                        type: 'scatter',
                        xField: 'field',
                        yField: 'age'
                    }]}
                />
            </Container>
        )
    }

    colors = [
        {
            fillStyle: '#96BBDC',
            strokeStyle: '#3F85C1'
        },
        {
            fillStyle: '#FAC796',
            strokeStyle: '#FDA34A'
        },
        {
            fillStyle: '#94D0AD',
            strokeStyle: '#47B371'
        },
        {
            fillStyle: '#E89BA6',
            strokeStyle: '#DE5465'
        },
        {
            fillStyle: '#BB7BBD',
            strokeStyle: '#8A168A'
        },
        {
            fillStyle: '#C6ABA5',
            strokeStyle: '#8C564B'
        }
    ]

    onBoxPlotRender = (sprite, config, data, index) => {
        return this.colors[index % this.colors.length];
    }

    onBoxPlotTooltip = (tooltip, record, item) => {
        const category = record.get('field'),
            high = record.get('high'),
            q3 = record.get('q3'),
            median = record.get('median'),
            q1 = record.get('q1'),
            low = record.get('low');

        tooltip.setTitle(category);

        tooltip.setHtml(
              'High: ' + high
            + '<br>Q3: ' + q3
            + '<br>Median: ' + median
            + '<br>Q1: ' + q1
            + '<br>Low : ' + low
        );
    }
}