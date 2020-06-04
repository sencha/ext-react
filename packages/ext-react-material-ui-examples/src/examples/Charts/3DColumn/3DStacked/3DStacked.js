import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';

export default class Stacked extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['country', 'agr', 'ind', 'ser'],
        data: [
            { country: 'USA',     agr: 188217, ind: 2995787, ser: 12500746},
            { country: 'China',   agr: 918138, ind: 3611671, ser: 3792665},
            { country: 'Japan',   agr: 71568,  ind: 1640091, ser: 4258274},
            { country: 'UK',      agr: 17084,  ind: 512506,  ser: 1910915},
            { country: 'Russia',  agr: 78856,  ind: 727906,  ser: 1215198}
        ]
    })

    state = {
        theme: 'default',
        stacked: 0,
    }

    changeTheme = theme => this.setState({ theme })

    onStackedToggle = segmentedButton => {
        //Added cmp to access component attributes in ext-react16 [revisit]
             this.refs.chart.cmp.getSeries()[0].setStacked(segmentedButton.getValue() === 0);
            this.refs.chart.cmp.redraw();
            this.setState({stacked:segmentedButton.getValue()})
    }

    onTooltipRender = (tooltip, record, item) => {
        const formatString = '0,000 (millions of USD)',
            fieldIndex = Ext.Array.indexOf(item.series.getYField(), item.field),
            sector = item.series.getTitle()[fieldIndex],
            value = Ext.util.Format.number(record.get(item.field), formatString);

        tooltip.setHtml(sector + ': ' + value);
    }

    render() {
        const { theme } = this.state;
        const { stacked } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    onStackGroup={this.onStackedToggle}
                    theme={theme}
                />
                <Cartesian
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    ref="chart"
                    store={this.store}
                    theme={theme}
                    interactions="itemhighlight"
                    insetPadding="40 20 10 10"
                    legend={{ type: 'sprite' }}
                    axes={[{
                        type: 'numeric3d',
                        position: 'left',
                        title: 'Billions of USD',
                        renderer: (axis, label, layoutContext) => Ext.util.Format.number(layoutContext.renderer(label) / 1000, '0,000'),
                        grid: {
                            odd: {
                                fillStyle: 'rgba(255, 255, 255, 0.06)'
                            },
                            even: {
                                fillStyle: 'rgba(0, 0, 0, 0.03)'
                            }
                        }
                    }, {
                        type: 'category3d',
                        position: 'bottom',
                        grid: true
                    }]}
                    series={[{
                        type: 'bar3d',
                        xField: 'country',
                        yField: ['agr', 'ind', 'ser'],
                        title: ['Agriculture', 'Industry', 'Services'],
                        highlight: true,
                        tooltip: {
                            trackMouse: true,
                            renderer: this.onTooltipRender
                        }
                    }]}
                    captions={{
                        title: {
                            text: '2011 Major economies by GDP sector',
                        }
                    }}
                />
            </Container>
        )
    }
}