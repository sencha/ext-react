import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';
import createData from './createData';

export default class Plot extends Component {

    constructor() {
        super();
        this.refreshData();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['x', 'y']
    })

    state = {
        theme: 'default'
    }

    changeTheme = theme => this.setState({ theme })

    toggleZoomOnPan = (zoomOnPan) => {
         //Added cmp to access component attributes in ext-react16 [revisit]
        this.refs.chart.cmp.getInteraction('panzoom').setZoomOnPan(zoomOnPan);
    }

    refreshData = () => {
        this.store.loadData(createData());
    }

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    onRefreshClick={this.refreshData}
                    onToggleZoomOnPan={this.toggleZoomOnPan}
                    theme={theme}
                    onlyMidnight
                />
                <Cartesian
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    store={this.store}
                    theme={theme}
                    ref="chart"
                    interactions="panzoom"
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        fields: 'y',
                        grid: true,
                        minimum: -4,
                        maximum: 4,
                        title: {
                            text: 'f(x)',
                            fontSize: 16,
                            fillStyle: 'rgb(255, 0, 136)'
                        },
                        floating: {
                            value: 0,
                            alongAxis: 1
                        }
                    }, {
                        type: 'numeric',
                        position: 'bottom',
                        fields: 'x',
                        grid: true,
                        title: {
                            text: 'x',
                            fontSize: 16,
                            fillStyle: 'rgb(255, 0, 136)'
                        },
                        floating: {
                            value: 0,
                            alongAxis: 0
                        }
                    }]}
                    series={[{
                        type: 'line',
                        xField: 'x',
                        yField: 'y',
                        style: {
                            lineWidth: 2,
                            strokeStyle: 'rgb(0, 119, 204)'
                        }
                    }]}
                />
            </Container>
        )
    }
}