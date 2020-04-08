import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';

export default class FullStackedAreaChartExample extends Component {
    constructor(){
        super();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['month', 'data1', 'data2', 'data3', 'data4', 'other'],
        data:[
            { month: 'Jan', data1: 20, data2: 37, data3: 35, data4: 4, other: 4 },
            { month: 'Feb', data1: 20, data2: 37, data3: 36, data4: 5, other: 2 },
            { month: 'Mar', data1: 19, data2: 36, data3: 37, data4: 4, other: 4 },
            { month: 'Apr', data1: 18, data2: 36, data3: 38, data4: 5, other: 3 },
            { month: 'May', data1: 18, data2: 35, data3: 39, data4: 4, other: 4 },
            { month: 'Jun', data1: 17, data2: 34, data3: 42, data4: 4, other: 3 },
            { month: 'Jul', data1: 16, data2: 34, data3: 43, data4: 4, other: 3 },
            { month: 'Aug', data1: 16, data2: 33, data3: 44, data4: 4, other: 3 },
            { month: 'Sep', data1: 16, data2: 32, data3: 44, data4: 4, other: 4 },
            { month: 'Oct', data1: 16, data2: 32, data3: 45, data4: 4, other: 3 },
            { month: 'Nov', data1: 15, data2: 31, data3: 46, data4: 4, other: 4 },
            { month: 'Dec', data1: 15, data2: 31, data3: 47, data4: 4, other: 3 }
        ]
    })

    state = {
        theme: 'default'
    };

    onAxisLabelRender = (axis, label, layoutContext) => {
        // Custom renderer overrides the native axis label renderer.
        // Since we don't want to do anything fancy with the value
        // ourselves except appending a '%' sign, but at the same time
        // don't want to loose the formatting done by the native renderer,
        // we let the native renderer process the value first.
        return layoutContext.renderer(label) + '%';
    };

    changeTheme = theme => this.setState({ theme })

    onSeriesTooltipRender = (tooltip, record, item) => {
         var fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            browser = item.series.getTitle()[fieldIndex];
            tooltip.setHtml(`${browser} on ${record.get('month')}: ${record.get(item.field)}%`)
    }

    render(){
        const {theme}=this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    theme={theme}
                />
                <Cartesian
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    store={this.store}
                    theme={theme}
                    insetPadding={'20 20 0 0'}
                    legend={{type:'sprite'}}
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        fields: ['data1', 'data2', 'data3', 'data4', 'other' ],
                        grid: true,
                        minimum: 0,
                        maximum: 100,
                        renderer: this.onAxisLabelRender
                    }, {
                        type: 'category',
                        position: 'bottom',
                        fields: 'month',
                        grid: true,
                        label: {
                            rotate: {
                                degrees: -90
                            }
                        }
                    }]}
                    series={[{
                        type: 'area',
                        fullStack: true,
                        title: [ 'IE', 'Firefox', 'Chrome', 'Safari', 'Others' ],
                        xField: 'month',
                        yField: [ 'data1', 'data2', 'data3', 'data4', 'other' ],
                        style: {
                            opacity: 0.80
                        },
                        marker: {
                            opacity: 0,
                            scaling: 0.01,
                            animation: {
                                duration: 200,
                                easing: 'easeOut'
                            }
                        },
                        highlightCfg: {
                            opacity: 1,
                            scaling: 1.5
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: this.onSeriesTooltipRender
                        }
                    }]}
                    />
            </Container>
        )
    }
}