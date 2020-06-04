import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';
import storeData from './storeData';

export default class Spline extends Component {

    store = Ext.create('Ext.data.Store', {
        fields: ['theta', 'sin', 'cos', 'tan'],
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
                    insetPadding="20 20 0 0"
                    axes={[{
                        type: 'numeric',
                        position: 'left',
                        title: 'Sin (Theta)',
                        grid: true,
                        fields: 'sin',
                        label: {
                            renderer: (axis, label) => Ext.util.Format.number(label, '0.00')
                        }
                    }, {
                        type: 'numeric',
                        position: 'bottom',
                        title: 'Theta',
                        grid: true,
                        fields: 'theta',
                        label: {
                            textPadding: 0,
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
                        highlight: true,
                        showMarkers: false
                    }]}
                />
            </Container>
        )
    }
}