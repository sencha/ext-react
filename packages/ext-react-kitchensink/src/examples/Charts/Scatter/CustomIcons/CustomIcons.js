import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';
import generateData from './generateData';

Ext.require('Ext.chart.interactions.ItemEdit');

export default class CustomIcons extends Component {

    constructor() {
        super();
        this.refreshData();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name']
    })

    refreshData = () => {
        this.store.loadData(generateData(this.state.numRecords));
    }

    state = {
        numRecords: 25,
        theme: 'default'
    }

    changeTheme = theme => this.setState({ theme })

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
                    insetPadding="20 20 10 10"
                    legend={{ type: 'sprite' }}
                    store={this.store}
                    theme={theme}
                    interactions={[{
                        type: 'itemedit',
                        style: { strokeStyle: 'gray' }
                    }]}
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        fields: ['g1', 'g2', 'g3', 'g4'],
                        label: {
                            rotate: {
                                degrees: -30
                            }
                        }
                    }, {
                        type: 'category',
                        position: 'bottom',
                        fields: 'id'
                    }]}
                    series={[{
                        type: 'scatter',
                        xField: 'id',
                        yField: 'g1',
                        title: 'Group 1',
                        highlight: true,
                        marker: {
                            type: 'path',
                            scale: 10,
                            lineWidth: 2,
                            path: [
                                ['M',  0,  1],
                                ['L',  1,  0],
                                ['L',  0, -1],
                                ['L', -1,  0],
                                ['Z']
                            ]
                        }
                    }, {
                        type: 'scatter',
                        xField: 'id',
                        yField: 'g2',
                        title: 'Group 2',
                        highlight: true,
                        marker: {
                            type: 'path',
                            scalingX: 0.1,
                            scalingY: -0.1,
                            path: [
                                ['M', 0,    -145],
                                ['L', 48,   -50],
                                ['L', 153,  -36],
                                ['L', 76,    39],
                                ['L', 93,    143],
                                ['L', 0,     95],
                                ['L', -93,   143],
                                ['L', -76,   39],
                                ['L', -153, -36],
                                ['L', -48,  -50],
                                ['Z']
                            ]
                        }
                    }]}
                />
            </Container>
        )
    }
}