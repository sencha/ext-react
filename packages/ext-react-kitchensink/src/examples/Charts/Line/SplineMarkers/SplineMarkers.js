import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';
import storeData from './storeData';

export default class SplineMarkers extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['theta', 'sin', 'cos', 'tan' ],
        data: storeData
    })

    state = {
        theme: 'default'
    }

    changeTheme = theme => this.setState({ theme })

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar onThemeChange={this.changeTheme} theme={theme}/>
                <Cartesian
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    store={this.store}
                    theme={theme}
                    insetPadding="10 20 10 10"
                    legend={{
                        type: 'sprite',
                        docked: 'top',
                        marker: {
                            size: 16
                        }
                    }}
                    axes={[{
                        type: 'numeric',
                        fields: ['sin', 'cos', 'tan' ],
                        position: 'left',
                        grid: true,
                        renderer: (axis, label) => Ext.util.Format.number(label, '0.0')
                    }, {
                        type: 'category',
                        title: 'Theta',
                        fields: 'theta',
                        position: 'bottom',
                        style: {
                            textPadding: 0 // remove extra padding between labels to make sure no labels are skipped
                        },
                        grid: true,
                        label: {
                            rotate: {
                                degrees: -45
                            }
                        }
                    }]}
                    series={[{
                        type: 'line',
                        xField: 'theta',
                        yField: 'sin',
                        smooth: true,
                        style: {
                            lineWidth: 2
                        },
                        marker: {
                            radius: 4
                        },
                        highlight: {
                            fillStyle: '#000',
                            radius: 5,
                            lineWidth: 2,
                            strokeStyle: '#fff'
                        }
                    }, {
                        type: 'line',
                        xField: 'theta',
                        yField: 'cos',
                        smooth: true,
                        style: {
                            lineWidth: 2
                        },
                        marker: {
                            radius: 4
                        },
                        highlight: {
                            fillStyle: '#000',
                            radius: 5,
                            lineWidth: 2,
                            strokeStyle: '#fff'
                        }
                    }, {
                        type: 'line',
                        xField: 'theta',
                        yField: 'tan',
                        smooth: true,
                        style: {
                            lineWidth: 2
                        },
                        marker: {
                            radius: 4
                        },
                        highlight: {
                            fillStyle: '#000',
                            radius: 5,
                            lineWidth: 2,
                            strokeStyle: '#fff'
                        }
                    }]}
                />
            </Container>
        )
    }
}