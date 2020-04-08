import React, { Component } from 'react';
import { Panel, Draw, Toolbar, Button, Spacer, Label, Container } from '@sencha/ext-react-modern';

export default class DrawExample extends Component {

  componentDidMount() {
  //  console.log('componentDidMount')
  //}
  //onReady={ this.extReactDidMount }
  //extReactDidMount = detail => {
  //  console.log('extReactDidMount')
    //Added cmp to access component attributes in ext-react16 [revisit]
    this.refs.draw.cmp.on({
      element: 'element',
      mousedown: this.onMouseDown,
      mousemove: this.onMouseMove,
      mouseup: this.onMouseUp,
      mouseleave: this.onMouseUp
    });
  }

  clear = () => {
    const { draw } = this.refs;
    draw.cmp.getSurface().destroy();
    draw.cmp.getSurface('overlay').destroy();
    draw.cmp.renderFrame();
  }

  onMouseDown = (e) => {
    let { draw } = this.refs,
        surface = draw.cmp.getSurface(),
        xy, x, y;

    if (!draw.cmp.sprite) {
      xy = surface.getEventXY(e);
      x = xy[0];
      y = xy[1];

      draw.cmp.list = [x, y, x, y];
      draw.cmp.lastEventX = x;
      draw.cmp.lastEventY = y;

      draw.cmp.sprite = surface.add({
        type: 'path',
        path: ['M', draw.cmp.list[0], draw.cmp.list[1], 'L', draw.cmp.list[0] + 1e-1, draw.cmp.list[1] + 1e-1],
        lineWidth: 30 * Math.random() + 10,
        lineCap: 'round',
        lineJoin: 'round',
        strokeStyle: new Ext.util.Color(Math.random() * 127 + 128, Math.random() * 127 + 128, Math.random() * 127 + 128)
      });

      surface.renderFrame();
    }
  }

  onMouseMove = (e) => {
    let { draw } = this.refs;
        let surface = draw.cmp.getSurface(),
        path, xy, x, y, dx, dy, D;

    if (draw.cmp.sprite) {
      xy = surface.getEventXY(e);
      x = xy[0];
      y = xy[1];
      dx = draw.lastEventX - x;
      dy = draw.lastEventY - y;
      D = 10;

      if (dx * dx + dy * dy < D * D) {
        draw.cmp.list.length -= 2;
        draw.cmp.list.push(x, y);
      } else {
        draw.cmp.list.length -= 2;
        draw.cmp.list.push(draw.cmp.lastEventX = x, draw.cmp.lastEventY = y);
        draw.cmp.list.push(draw.cmp.lastEventX + 1, draw.cmp.lastEventY + 1);
      }

      path = smoothList(draw.cmp.list);

      draw.cmp.sprite.setAttributes({
        path: path
      });

      if (Ext.os.is.Android) {
        Ext.draw.cmp.Animator.schedule(() => surface.renderFrame(), draw);
      } else {
        surface.renderFrame();
      }
    }
  }

  onMouseUp = (e) => {
    //Added cmp to access component attributes in ext-react16 [revisit]
    this.refs.draw.cmp.sprite = null;
  }

  onResize = () => {
    //Added cmp to access component attributes in ext-react16 [revisit]
    const { draw } = this.refs;
    const size = draw.cmp.element.getSize();
    draw.cmp.getSurface().setRect([0, 0, size.width, size.height]);
    draw.cmp.renderFrame();
  }

    render() {
        return (
            <Panel shadow layout="fit" >
                <Toolbar docked="top">
                    <Container>
                      <div style={{fontSize: Ext.os.is.Phone ? '12px' : '14px'}}>Use your {Ext.supports.Touch ? 'finger' : 'mouse'} to paint on the surface below.</div>
                    </Container>
                    <Spacer/>
                    <Button handler={this.clear} text="Clear"/>
                </Toolbar>
                <Draw ref="draw"/>
            </Panel>
        )
    }
}

function smoothList(points) {
    if (points.length < 3) {
        return ['M', points[0], points[1]];
    }

    var dx = [], dy = [], result = ['M'],
        i, ln = points.length;

    for (i = 0; i < ln; i += 2) {
        dx.push(points[i]);
        dy.push(points[i + 1]);
    }

    dx = Ext.draw.Draw.spline(dx);
    dy = Ext.draw.Draw.spline(dy);
    result.push(dx[0], dy[0], 'C');

    for (i = 1, ln = dx.length; i < ln; i++) {
        result.push(dx[i], dy[i]);
    }

    return result;
}