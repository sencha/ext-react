import React, { Component } from 'react';
import { Panel, Button, Container, ToolTip } from '@sencha/ext-react-modern';

export default class ToolTipExample extends Component {
  render() {
      const containerDefaults = {
          margin: '0 0 50 0',
      };

      const buttonDefaults = {
          margin: '0 15 0 0'
      };

      return (
          <Panel layout="vbox" shadow bodyPadding="20" defaults={containerDefaults}>
              <Container layout={{
              type: Ext.platformTags.phone ? 'vbox' : 'hbox',
              align: 'start',
              pack: 'center'
          }} defaults={buttonDefaults}>
                  <Button text="Basic Tip" height="30" width="100">
                    <ToolTip>A simple tooltip</ToolTip>
                  </Button>
                  <Button text="autoHide: false">
                      <ToolTip showOnTap autoHide={false} title="Tip Title" closable>A simple tooltip</ToolTip>
                  </Button>
                  <Button text="Mouse Track">
                      <ToolTip showOnTap title="Mouse Track" trackMouse>This tip will follow the mouse while it is over the element</ToolTip>
                  </Button>
              </Container>
              <Container layout={{
              type: Ext.platformTags.phone ? 'vbox' : 'hbox',
              align: 'start',
              pack: 'center'
          }} defaults={buttonDefaults}>
                  <Button text="Anchor Right, Rich Content">
                      <ToolTip showOnTap align="tl-tr" anchorToTarget anchor>
                          <ul style={{marginBottom: '15px'}}>
                              <li>5 bedrooms</li>
                              <li>Close to transport</li>
                              <li>Large backyard</li>
                          </ul>
                          <img style={{width: '400px', height: '300px'}} src="resources/images/house.jpg" />
                      </ToolTip>
                  </Button>
                  <Button text="Anchor Below">
                      <ToolTip showOnTap align="tc-bc" anchor anchorToTarget>The anchor is centered</ToolTip>
                  </Button>
                  <Button text="Anchor with Tracking">
                      <ToolTip showOnTap trackMouse anchor align="l-r">Following the mouse with an anchor</ToolTip>
                  </Button>
              </Container>
              <Container layout={{
              type: Ext.platformTags.phone ? 'vbox' : 'hbox',
              align: 'start',
              pack: 'center'
          }}>
                  <div style={{...styles.qTipItem, ...styles.color1}} data-qtip="This tip is inline" data-qshowOnTap="true">Inline Tip</div>
                  <div style={{...styles.qTipItem, ...styles.color2}} data-qtip="This tip has a fixed width" data-qwidth="400" data-qshowOnTap="true">Fixed width inline tip</div>
                  <div style={{...styles.qTipItem, ...styles.color3}} data-qtip="This tip has a title" data-qtitle="The title" data-qshowOnTap="true">Inline tip with title</div>
                  <div style={{...styles.qTipItem, ...styles.color4}} data-qtip="Aligned top" data-qalign="bl-tl" data-qanchorToTarget="true" data-qshowOnTap="true">Inline tip align top</div>
              </Container>
          </Panel>
      )
  }
}

const styles = {
    qTipItem: {
        width: '150px',
        margin: '0 15px 0 0',
        color: 'white',
        padding: '5px 10px',
        textAlign: 'center',
        cursor: 'default'
    },
    color1: {
        backgroundColor: '#e91e63'
    },
    color2: {
        backgroundColor: '#2196f3'
    },
    color3: {
        backgroundColor: '#ff5722'
    },
    color4: {
        backgroundColor: '#607d8b'
    },
};
