//import React from 'react';
//import { Overview } from "@sencha/ext-react-material-ui";

class Overview extends React.Component {

  constructor() {
    super()
    this.listeners = {
      scenesetup: function(component, scene) {
        var data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            colors = d3.scaleOrdinal(d3.schemeCategory20c),
            twoPi = 2 * Math.PI,
            gap = twoPi / data.length,
            r = 100;

        scene.append('g')
          .attr('transform', 'translate(150,150)')
          .selectAll('circle')
          .data(data)
          .enter()
          .append('circle')
          .attr('fill', function(d) {
            return colors(d);
          })
          .attr('stroke', 'black')
          .attr('stroke-width', 3)
          .attr('r', function(d) {
              return d * 3;
          })
          .attr('cx', function(d, i) {
            return r * Math.cos(gap * i);
          })
          .attr('cy', function(d, i) {
            return r * Math.sin(gap * i);
          });
      }
    }
  }

  render() {
    return (
      <ExtD3
        fitToParent
        listeners={this.listeners}
      ></ExtD3>
    )
  }

}
