import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';

Ext.require([
    'Ext.chart.series.Bar',
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Category'
]);

export default class BasicBarChartExample extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['country', 'agr', 'ind', 'ser'],
        data: [
            { country: 'USA',     agr: 188217, ind: 2995787, ser: 12500746},
            { country: 'China',   agr: 918138, ind: 3611671, ser: 3792665},
            { country: 'Japan',   agr: 71568,  ind: 1640091, ser: 4258274},
            { country: 'UK',      agr: 17084,  ind: 512506,  ser: 1910915},
            { country: 'Russia',  agr: 78856,  ind: 727906,  ser: 1215198}
        ]
    });

    state = {
        theme: 'default'
    };

    changeTheme = theme => this.setState({ theme })

    onAxisLabelRender = (axis, label, layoutContext) => {
        return Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000');
    }

    onSeriesLabelRender = (v) => {
        return Ext.util.Format.number(v / 1000, '0,000');
    }

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    theme={theme}
                />
                <Cartesian
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    insetPadding="70 40 0"
                    platformConfig={{
                        phone: {
                            insetPadding: '50 0 0'
                        }
                    }}
                    flipXY
                    store={this.store}
                    theme={theme}
                    series={[{
                        type: 'bar',
                        xField: 'country',
                        yField: 'ind',
                        style: {
                            opacity: 0.80,
                            minGapWidth: 10
                        },
                        label: {
                            field: 'ind',
                            display: 'insideEnd',
                            renderer: this.onSeriesLabelRender
                        }
                    }]}
                    axes={[{
                        type: 'numeric',
                        position: 'bottom',
                        fields: 'ind',
                        grid: true,
                        maximum: 4000000,
                        majorTickSteps: 10,
                        title: 'Billions of USD',
                        renderer: this.onAxisLabelRender
                    }, {
                        type: 'category',
                        position: 'left',
                        fields: 'country',
                        grid: true
                    }]}
                    captions={{
                        title: {
                            text: '2011 Industry size in major economies',
                        },
                        subtitle: {
                            text: 'Source: http://en.wikipedia.org/wiki/List_of_countries_by_GDP_sector_composition',
                        }
                    }}
                />
            </Container>
        )
    }
}