import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';
import generateData from './generateData';

export default class BasicMarkers extends Component {

    constructor() {
        super();
        this.refreshData();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name']
    })

    state = {
        theme: 'default',
        numRecords: 10
    }

    changeTheme = theme => this.setState({ theme })

    refreshData = () => {
        this.store.loadData(generateData(this.state.numRecords));
    }

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    onRefreshClick={this.refreshData}
                    theme={theme}
                />
                <Cartesian
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    insetPadding="20 20 0 10"
                    theme={theme}
                    interactions={[{
                        type: 'panzoom',
                    }, 'itemhighlight']}
                    legend={{
                        type: 'sprite',
                        position: 'bottom',
                        marker: { size: 24 }
                    }}
                    store={this.store}
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        fields: ['g1', 'g2', 'g3'],
                        minimum: 0
                    }, {
                        type: 'category',
                        position: 'bottom',
                        visibleRange: [0, 0.5],
                        fields: 'name'
                    }]}
                    series={[{
                        type: 'line',
                        xField: 'name',
                        yField: 'g1',
                        fill: true,
                        title: 'Square',
                        style: {
                            smooth: true,
                            miterLimit: 3,
                            lineCap: 'miter',
                            opacity: 0.7,
                            lineWidth: 8
                        },
                        highlight: {
                            scale: 0.9
                        },
                        marker: {
                            type: 'image',
                            src: 'resources/images/square.png',
                            width: 46,
                            height: 46,
                            x: -23,
                            y: -23,
                            scale: 0.7,
                            fx: {
                                duration: 200
                            }
                        }
                    }, {
                        type: 'line',
                        xField: 'name',
                        yField: 'g2',
                        title: 'Circle',
                        style: {
                            opacity: 0.7,
                            lineWidth: 8
                        },
                        highlight: {
                            scale: 0.9
                        },
                        marker: {
                            type: 'image',
                            src: 'resources/images/circle.png',
                            width: 46,
                            height: 46,
                            x: -23,
                            y: -23,
                            scale: 0.7,
                            fx: {
                                duration: 200
                            }
                        }
                    }, {
                        type: 'line',
                        xField: 'name',
                        yField: 'g3',
                        title: 'Polygon',
                        style: {
                            opacity: 0.7,
                            lineWidth: 8
                        },
                        highlight: {
                            scale: 0.9
                        },
                        marker: {
                            type: 'image',
                            src: 'resources/images/pentagon.png',
                            width: 48,
                            height: 48,
                            x: -24,
                            y: -24,
                            scale: 0.7,
                            fx: {
                                duration: 200
                            }
                        }
                    }]}
                />
            </Container>
        )
    }
}