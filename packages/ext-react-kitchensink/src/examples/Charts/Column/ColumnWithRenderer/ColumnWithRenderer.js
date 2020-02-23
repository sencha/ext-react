import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';
import createData from './createData';
import { seriesG1Renderer, seriesG2Renderer } from './renderer';

export default class ColumnWithRenderer extends Component {

    constructor() {
        super();
        this.refreshData();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name']
    })

    state = {
        numRecords: 10
    }

    refreshData = () => {
        this.store.loadData(createData(this.state.numRecords));
    }

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar onRefreshClick={this.refreshData}/>
                <Cartesian
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    insetPadding="20 20 10 10"
                    innerPadding="0 10 0 10"
                    store={this.store}
                    series={[{
                        type: 'bar',
                        xField: 'name',
                        yField: 'g1',
                        renderer: seriesG1Renderer,
                        style: {
                            lineWidth: 2,
                            maxBarWidth: 30,
                            stroke: 'dodgerblue',
                            fill: 'palegreen',
                            opacity: 0.6
                        }
                    }, {
                        type: 'bar',
                        xField: 'name',
                        yField: ['g2'],
                        renderer: seriesG2Renderer,
                        style: {
                            lineWidth: 2,
                            maxBarWidth: 12,
                            stroke: 'tomato',
                            fill: 'lightyellow',
                            radius: 20
                        }
                    }]}
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        fields: ['g1', 'g2'],
                        minimum: 0
                    }, {
                        type: 'category',
                        position: 'bottom',
                        fields: 'name'
                    }]}
                />
            </Container>
        )
    }
}