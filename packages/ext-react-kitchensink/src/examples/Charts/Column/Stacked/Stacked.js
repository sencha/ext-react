import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';
import createData from './createData';

export default class Stacked extends Component {

    constructor() {
        super();
        this.refreshData();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g0', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name']
    })

    state = {
        theme: 'default',
        stacked: 0,
        zoom: false,
        numRecords: 7
    }

    changeTheme = theme => this.setState({ theme })

    refreshData = () => {
        this.store.loadData(createData(this.state.numRecords));
    }

    toggleZoomOnPan = (zoomOnPan) => {
        //Added cmp to access component attributes in ext-react16 [revisit]
        this.refs.chart.cmp.getInteraction('panzoom').setZoomOnPan(zoomOnPan);
        this.setState({zoom:zoomOnPan})
    }

    onStackedToggle = button => {
        //Added cmp to access component attributes in ext-react16 [revisit]
        this.refs.chart.cmp.getSeries()[0].setStacked(button.getValue());
        this.refs.chart.cmp.redraw();
        this.setState({stacked:button.getValue()})
    }

    render() {
        const { theme, stacked } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar
                    onRefreshClick={this.refreshData}
                    onThemeChange={this.changeTheme}
                    onToggleZoomOnPan={this.toggleZoomOnPan}
                    onStackGroup={this.onStackedToggle}
                    theme={theme}
                    stacked={stacked}
                />
                <Cartesian
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    ref="chart"
                    store={this.store}
                    theme={theme}
                    insetPadding="20 20 10 10"
                    legend={{
                        type: 'sprite',
                        position: 'bottom'
                    }}
                    interactions={[{
                        type: 'panzoom',
                        axes: {
                            left: {
                                allowPan: false,
                                allowZoom: false
                            },
                            bottom: {
                                allowPan: true,
                                allowZoom: true
                            }
                        }
                    }]}
                    series={[{
                        type: 'bar',
                        xField: 'name',
                        yField: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6'],
                        title: ['Apples', 'Oranges', 'Bananas', 'Plums', 'Mangos', 'Pears'],
                        stacked: true,
                        style: {
                            minGapWidth: 15
                        }
                    }]}
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        fields: ['g1', 'g2', 'g3', 'g4', 'g5', 'g6']
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