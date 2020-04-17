import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import { Cartesian } from '@sencha/ext-react-modern';
import ChartToolbar from '../../ChartToolbar';
import createData from './createData';

Ext.require([
    'Ext.chart.axis.Numeric',
    'Ext.chart.axis.Time',
    'Ext.chart.series.CandleStick',
    'Ext.chart.interactions.Crosshair'
]);

export default class CandlestickChartExample extends Component {

  store = Ext.create('Ext.data.Store', {
    fields: ['time', 'open', 'high', 'low', 'close']
  });
  state = {theme: 'default',zoom: false};

  constructor() {
    super();
    this.refresh();
  }

  extReactDidMount = () => {
    this.chart.cmp.getInteraction('panzoom').setEnabled(false);
    this.chart.cmp.getInteraction('crosshair').setEnabled(true);

//     console.log(this.chart.cmp)
//     //this.chart = this.refs.chart.cmp;
//     this.panzoom = this.chart.cmp.getInteraction('panzoom');
//     this.crosshair = this.chart.cmp.getInteraction('crosshair');

// //    console.log(this.panzoom)
//     console.log(this.crosshair)
  }

  refresh = () => {this.store.loadData(createData(1000));}

  changeTheme = theme => this.setState({ theme })

  toggleZoomOnPan = (zoomOnPan) => {
    this.toggleCrosshair(false);
    this.panzoom.setZoomOnPan(zoomOnPan);
    this.setState({zoom:zoomOnPan});
  }

  toggleCrosshair = (crosshair) => {
    this.chart.cmp.getInteraction('panzoom').setEnabled(false);
    this.chart.cmp.getInteraction('crosshair').setEnabled(true);
    console.log(this.chart.cmp.getInteraction('panzoom').getEnabled())
    console.log(this.chart.cmp.getInteraction('crosshair').getEnabled())
    return




    console.log(this.crosshair)
    console.log(this.crosshair.getEnabled())

    this.crosshair.setEnabled(true);
    this.panzoom.setEnabled(false);
    console.log(this.crosshair.getEnabled())
    return
    console.log(!crosshair)
    this.panzoom.setEnabled(!crosshair);
    this.crosshair.setEnabled(crosshair);
    if(crosshair){
      this.setState({zoom:crosshair});
    }
  }

  render() {
    //console.log('render')
    const { theme } = this.state;
    //const { zoom } = this.state;
    //console.log(theme)
    var theme2='midnight'

    return (
      <Container onReady={ this.extReactDidMount } padding={!Ext.os.is.Phone && 10} layout="fit" ref={container => this.container = container}>

        <ChartToolbar
          onThemeChange={this.changeTheme}
          onToggleZoomOnPan={this.toggleZoomOnPan}
          onToggleCrosshair={this.toggleCrosshair}
          onRefreshClick={this.refresh}
          theme={theme2}
          onlyMidnight/>

        <Cartesian
          downloadServerUrl='http://svg.sencha.io'
          shadow
          ref={chart => this.chart = chart}
          store={this.store}
          theme={theme}
          axes={[
            {
              type: 'numeric',
              fields: ['open', 'high', 'low', 'close'],
              position: 'left',
              maximum: 1000,
              minimum: 0
            },
            {
              type: 'time',
              fields: ['time'],
              position: 'bottom',
              visibleRange: [0, 0.3],
              style: {
                axisLine: false
              }
            }
          ]}
          series={
            {
              type: 'candlestick',
              xField: 'time',
              openField: 'open',
              highField: 'high',
              lowField: 'low',
              closeField: 'close',
              style: {
                barWidth: 10,
                opacity: 0.9,
                dropStyle: {
                  fill: 'rgb(237,123,43)',
                  stroke: 'rgb(237,123,43)'
                },
                raiseStyle: {
                  fill: 'rgb(55,153,19)',
                  stroke: 'rgb(55,153,19)'
                }
              }
            }
          }
          interactions={[
            {
              type: 'panzoom',
              axes: {
                left: {
                  allowPan: false,
                  allowZoom: false
                },
                bottom: {
                  allowPan: true,
                  allowZoom: true
                }
              }
            },
            {
              type: 'crosshair',
              axes: {
                label: {
                  fillStyle: 'white'
                },
                rect: {
                  fillStyle: '#344459',
                  opacity: 0.7,
                  radius: 5
                }
              }
          }]}
        />

      </Container>
    )
  }
}