import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Polar } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';

export default class Marked extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['month', 'data1', 'data2', 'data3', 'data4', 'other'],
        data:  [
            { month: 'Jan', data1: 20, data2: 37, data3: 35, data4: 4, other: 4 },
            { month: 'Feb', data1: 20, data2: 37, data3: 36, data4: 5, other: 2 },
            { month: 'Mar', data1: 19, data2: 36, data3: 37, data4: 4, other: 4 },
            { month: 'Apr', data1: 18, data2: 36, data3: 38, data4: 5, other: 3 },
            { month: 'May', data1: 18, data2: 35, data3: 39, data4: 4, other: 4 },
            { month: 'Jun', data1: 17, data2: 34, data3: 42, data4: 4, other: 3 },
            { month: 'Jul', data1: 16, data2: 34, data3: 43, data4: 4, other: 3 },
            { month: 'Aug', data1: 16, data2: 33, data3: 44, data4: 4, other: 3 },
            { month: 'Sep', data1: 16, data2: 32, data3: 44, data4: 4, other: 4 },
            { month: 'Oct', data1: 16, data2: 32, data3: 45, data4: 4, other: 3 },
            { month: 'Nov', data1: 15, data2: 31, data3: 46, data4: 4, other: 4 },
            { month: 'Dec', data1: 15, data2: 31, data3: 47, data4: 4, other: 3 }
        ]
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
                <Polar
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    insetPadding={25}
                    legend={{ type: 'sprite' }}
                    animation={{ duration: 200 }}
                    store={this.store}
                    interactions={['rotate']}
                    theme={theme}
                    axes={[{
                        type: 'numeric',
                        position: 'radial',
                        minimum: 0,
                        maximum: 50,
                        majorTickSteps: 9
                    }, {
                        type: 'category',
                        position: 'angular',
                        grid: true
                    }]}
                    series={[{
                        type: 'radar',
                        title: 'IE',
                        angleField: 'month',
                        radiusField: 'data1',
                        style: {
                            lineWidth: 2,
                            fillStyle: 'none'
                        },
                        marker: true,
                        highlightCfg: {
                            radius: 6,
                            fillStyle: 'yellow'
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: this.onSeriesLabelRender
                        }
                    }, {
                        type: 'radar',
                        title: 'Firefox',
                        angleField: 'month',
                        radiusField: 'data2',
                        marker: true,
                        style: {
                            lineWidth: 2,
                            fillStyle: 'none'
                        },
                        highlight: {
                            radius: 6,
                            fillStyle: 'yellow'
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: this.onSeriesLabelRender
                        }
                    }, {
                        type: 'radar',
                        title: 'Chrome',
                        angleField: 'month',
                        radiusField: 'data3',
                        marker: true,
                        style: {
                            lineWidth: 2,
                            fillStyle: 'none'
                        },
                        highlight: {
                            radius: 6,
                            fillStyle: 'yellow'
                        },
                        tooltip: {
                            trackMouse: true,
                            renderer: this.onSeriesLabelRender
                        }
                    }, {
                        type: 'radar',
                        title: 'Safari',
                        angleField: 'month',
                        radiusField: 'data4',
                        style: {
                            lineWidth: 2,
                            fillStyle: 'none'
                        }
                    }]}
                />
            </Container>
        )
    }

    onSeriesLabelRender = (tooltip, record, item) => {
        tooltip.setHtml(record.get('month') + ': ' + record.get(item.field) + '%');
    }
}