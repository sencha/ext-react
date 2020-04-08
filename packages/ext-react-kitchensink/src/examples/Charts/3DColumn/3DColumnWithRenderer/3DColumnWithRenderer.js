import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';
import { storeData, colors } from './data';

export default class ThreeDColumnWithRenderer extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['month', 'data1', 'data2', 'data3', 'data4', 'other'],
        data: storeData
    })
    //<ChartToolbar downloadChartRef={this.refs.chart}/>

    render() {
        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="vbox">
                <ChartToolbar maxHeight={50} downloadChartRef={this.refs.chart}/>
                <Cartesian
                        downloadServerUrl ="http://svg.sencha.io"
                        shadow
                        flex={2}
                        ref="chart"
                        store={this.store}
                        theme="muted"
                        interactions={{
                            type: 'panzoom',
                            zoomOnPanGesture: true
                        }}
                        insetPadding="10 20 0 10"
                        innerPadding="0 4 0 3"
                        axes={[{
                            type: 'numeric3d',
                            fields: 'data3',
                            position: 'left',
                            grid: true,
                            renderer: (axis, label, layoutContext) => layoutContext.renderer(label) + '%'
                        }, {
                            type: 'category3d',
                            fields: 'month',
                            position: 'bottom',
                            grid: true,
                            label: {
                                rotate: {
                                    degrees: -60
                                }
                            }
                        }]}
                        series={[{
                            type: 'bar3d',
                            xField: 'month',
                            yField: 'data3',
                            label: {
                                field: 'data3',
                                display: 'over'
                            },
                            highlight: {
                                fillStyle: 'rgba(43, 130, 186, 1.0)',
                                strokeStyle: 'rgba(0, 0, 0, .2)',
                                showStroke: true,
                                lineWidth: 2
                            },
                            tooltip: {
                                trackMouse: true,
                                showDelay: 0,
                                dismissDelay: 0,
                                hideDelay: 0,
                                renderer: (tooltip, record, item) => { tooltip.setHtml(record.get('month') + ': ' + record.get('data3') + '%'); }
                            },
                            renderer: (sprite, config, data, index) => {
                                return {
                                    fillStyle: colors[index],
                                    strokeStyle: index % 2 ? 'none' : 'black',
                                    opacity: index % 2 ? 1 : 0.5
                                };
                            }
                        }]}
                    />
            </Container>
        )
    }
}
