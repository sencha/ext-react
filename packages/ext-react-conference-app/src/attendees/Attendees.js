import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../actions';
import WorldMap from './WorldMap';

class Attendees extends Component {

  store = Ext.create('Ext.data.Store', {
      autoLoad: true,
      fields: [{ name: 'cnt', type: 'number'}, 'Work_Country'],
      proxy: {
          type: 'ajax',
          url: 'resources/countries.json',
          reader: {
              type: 'json',
              rootProperty: 'data'
          }
      },
      listeners: {
          load: () => this.setState({ loaded: true })
      }
  })

  componentDidMount() {
      this.props.dispatch(setTitle('Attendees'));
  }

  onSceneSetup = (svg, scene) => {
      if(svg.panZoom) {
          svg.panZoom.scale(0.6, 0.8);
      }
  }

  render() {
    return (
      <WorldMap
        store={this.store}
        colorAxis={{
          scale: {
            type: 'log',
            range: ['#99ccff', '#0050a1']
          },
          field: 'cnt'
        }}
        mapAxis={{
          field: 'Work_Country',
          hidden: !Ext.platformTags.phone
        }}
        interactions={Ext.platformTags.phone ? {
          type: 'panzoom',
          zoom: {
            extent: [0.3, 3],
            doubleTap: false
          },
          pan: {
            constrain: false
          }
        } : null}
        legend={{
          docked: 'right',
          items: {
            count: 5,
            slice: [1],
            reverse: true,
            size: {
                x: 40,
                y: 20
            }
          }
        }}
        onScenesetup={this.onSceneSetup}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return { };
}

export default connect(mapStateToProps)(Attendees);