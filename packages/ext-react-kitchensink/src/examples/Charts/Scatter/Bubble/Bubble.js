import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';
import generateData from './generateData';

export default class Bubble extends Component {

    constructor() {
        super();
        this.refreshData();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g1', 'g2', 'g3', 'g4', 'g5']
    })

    state = {
        numRecords: 50,
        theme: 'default'
    }

    refreshData = () => {
        this.store.loadData(generateData(this.state.numRecords));
    }

    changeTheme = theme => this.setState({ theme })

    interpolate = (lambda, minSrc, maxSrc, minDst, maxDst) => minDst + (maxDst - minDst) * Math.max(0, Math.min(1, (lambda - minSrc) / (maxSrc - minSrc)))

    interpolateColor = (lambda, minSrc, maxSrc) => {
        let fromHSL = Ext.util.Color.fly('blue').getHSL(),
            toHSL = Ext.util.Color.fly('red').getHSL();

        fromHSL[2] = 0.5;

        return Ext.util.Color.fly(0, 0, 0, 0).setHSL(
            this.interpolate(lambda, minSrc, maxSrc, fromHSL[0], toHSL[0]),
            this.interpolate(lambda, minSrc, maxSrc, fromHSL[1], toHSL[1]),
            this.interpolate(lambda, minSrc, maxSrc, fromHSL[2], toHSL[2])
        ).toString();
    }

    styleRenderer = (sprite, config, rendererData, index) => {
        const store = rendererData.store,
            storeItem = store.getData().items[index];

        config.radius = this.interpolate(storeItem.data.g3, 0, 1000, 5, 30);
        config.fillOpacity = this.interpolate(storeItem.data.g3, 0, 1000, 1, 0.7);
        config.fill = this.interpolateColor(storeItem.data.g3, 0, 1000);
        config.stroke = Ext.util.Color.fromString(config.fill).createDarker(0.15).toString();
    }

    render() {
        const{ theme } = this.state;

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
                    interactions={['itemhighlight']}
                    series={[{
                        type: 'scatter',
                        xField: 'id',
                        yField: 'g2',
                        highlight: {
                            scale: 1.5,
                            lineWidth: 4,
                            fill: 'gold',
                            fillOpacity: 1
                        },
                        marker: {
                            type: 'circle',
                            radius: 5,
                            stroke: 'gray',
                            lineWidth: 2,
                            fx: {
                                duration: 200
                            }
                        },
                        style: {
                            renderer: this.styleRenderer
                        }
                    }]}
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        minimum: 0,
                        style: {
                            estStepSize: 20
                        },
                        label: {
                            rotate: {
                                degrees: -30
                            }
                        }
                    }, {
                        type: 'numeric',
                        position: 'bottom'
                    }]}
                />
            </Container>
        )
    }
}