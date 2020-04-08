import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Polar } from '@sencha/ext-react-modern';
import createData from './createData';
import ChartToolbar from '../../ChartToolbar';

Ext.require([
    'Ext.chart.series.Pie'
]);

export default class BasicPieChartExample extends Component {

    constructor() {
        super();
        this.refresh();
    }

    store = Ext.create('Ext.data.Store', {
        fields: ['id', 'g1', 'g2', 'g3', 'g4', 'g5', 'g6', 'name'],
    });

    state = {
        theme: 'default'
    };

    changeTheme = theme => this.setState({ theme })

    refresh = () => {
        this.store.loadData(createData(5));
    }

    render() {
        const { theme } = this.state;

        return (
            <Container padding={!Ext.os.is.Phone && 10} layout="fit">
                <ChartToolbar
                    onThemeChange={this.changeTheme}
                    onRefreshClick={this.refresh}
                    theme={theme}
                />
                <Polar
                    downloadServerUrl='http://svg.sencha.io'
                    shadow
                    innerPadding={Ext.os.is.Desktop ? 40 : 10}
                    store={this.store}
                    theme={theme}
                    series={[{
                        type: 'pie',
                        xField: 'g1',
                        label: {
                            field: 'name'
                        }
                    }]}
                />
            </Container>
        )
    }
}