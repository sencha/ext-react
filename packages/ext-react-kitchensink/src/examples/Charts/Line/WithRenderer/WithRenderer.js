import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';
import createData from './createData';

export default class WithRenderer extends Component {

    constructor() {
        super();
        this.refreshData();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name']
    })

    state = {
        theme: 'default'
    }

    changeTheme = theme => this.setState({ theme })

    refreshData = () => {
        this.store.loadData(createData());
    }

    onSeriesRender = (sprite, config, rendererData, index) => {
        const currentRecord = this.store.getAt(index),
            previousRecord = this.store.getAt(index-1) || currentRecord,
            isUp = currentRecord.get('g1') >= previousRecord.get('g1');

        switch (config.type) {
            case 'marker':
                return {
                    strokeStyle: isUp ? 'cornflowerblue' : 'tomato',
                    fillStyle: isUp ? 'aliceblue' : 'lightpink'
                };
            case 'line':
                return {
                    strokeStyle: isUp ? 'cornflowerblue' : 'tomato',
                    fillStyle: isUp ? 'rgba(100, 149, 237, 0.4)' : 'rgba(255, 99, 71, 0.4)'
                };
        }
    }

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    onRefreshClick={this.refreshData}
                    theme={theme}
                    onlyMidnight
                />
                <Cartesian
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    store={this.store}
                    theme={theme}
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        fields: ['g1'],
                        minimum: 0
                    }, {
                        type: 'category',
                        position: 'bottom',
                        fields: 'name'
                    }]}
                    series={[{
                        type: 'line',
                        xField: 'name',
                        yField: 'g1',
                        smooth: true,
                        style: {
                            strokeStyle: 'powderblue',
                            fillStyle: 'aliceblue',
                            lineWidth: 4
                        },
                        marker: {
                            type: 'circle',
                            radius: 10,
                            lineWidth: 2
                        },
                        renderer: this.onSeriesRender
                    }]}
                />
            </Container>
        )
    }
}