import React, { Component } from 'react';
import { Panel, Container } from '@sencha/ext-react-modern';

Ext.require(['Ext.drag.*']);

export default class Simple extends Component {

  state = {
    dragText: 'Drag Me!'
  }

  onDragMove(source, info) {
    const pos = info.element.current,
        html = Ext.String.format('X: {0}, Y: {1}', Math.round(pos.x), Math.round(pos.y));

    this.setState({dragText: html});
  }

  onDragEnd(source) {
    this.setState({dragText: 'Drag Me!'});
  }

  render() {
    const {dragText} = this.state;
    return (
      <Panel
        padding={5}
        shadow
        ref="dragContainer"
        onReady={ this.extReactDidMount }
      >
        <Container
          ref="dragItem"
          style={{
            width: '130px',
            height: '130px',
            padding: '5px',
            textAlign: 'center',
            color: '#fff',
            backgroundColor: '#ff5722',
            borderRadius: '5px',
            userSelect: 'none',
            cursor: 'move'
          }}
          html={dragText}
        >
        </Container>
      </Panel>
    )
  }

  extReactDidMount = () => {
    this.source = new Ext.drag.Source({
      element: this.refs.dragItem.cmp.el,
      constrain: this.refs.dragContainer.cmp.el,
      listeners: {
        dragmove: this.onDragMove.bind(this),
        dragend: this.onDragEnd.bind(this)
      }
    });
  }

  // componentDidMount = () => {
  //   extReactDidMount = () => {
  //   }

  componentWillUnmount() {
    Ext.destroy(this.source);
  }
}