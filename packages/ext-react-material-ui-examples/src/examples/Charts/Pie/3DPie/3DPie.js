import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Polar } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';
import generateData from './generateData';

export default class ThreeDPie extends Component {

    constructor() {
        super();
        this.refreshData();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name']
    })

    state = {
        theme: 'default',
        numRecords: 9
    }

    refreshData = () => {
        this.store.loadData(generateData(this.state.numRecords));
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
                <Polar
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    innerPadding={60}
                    platformConfig={{
                        phone: {
                            innerPadding: 20
                        }
                    }}
                    interactions="rotatePie3d"
                    animate={{
                        duration: 500,
                        easing: 'easeIn'
                    }}
                    store={this.store}
                    theme={theme}
                    series={[{
                        type: 'pie3d',
                        angleField: 'g1',
                        donut: 30,
                        distortion: 0.6,
                        highlight: {
                            margin: 40
                        },
                        thickness: 60,
                        platformConfig: {
                            phone: {
                                thickness: 40
                            }
                        },
                        label: {
                            field: 'name',
                            calloutColor: 'rgba(0,0,0,0)',
                            calloutLine: {
                                length: 1
                            }
                        },
                        style: {
                            strokeStyle: 'none'
                        }
                    }]}
                />
            </Container>
        )
    }
}