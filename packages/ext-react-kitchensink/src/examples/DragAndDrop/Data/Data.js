import React, { Component } from 'react';
import { Panel, Container } from '@sencha/ext-react-modern';
import './styles.css';

Ext.require(['Ext.drag.*']);

export default class Data extends Component {

  render() {
    return (
      <Panel
          ref="mainPanel"
          padding={5}
          shadow
      >
        <Container ref="source" className="data-source">
          <Container html='<div data-days="2" class="handle">Overnight</div>'></Container>
          <Container data-days="7" html='<div data-days="7" class="handle">Expedited</div>'></Container>
          <Container data-days="21" html='<div data-days="21" class="handle">Standard</div>'></Container>
        </Container>
        <Container ref="target" className="data-target"><div>Drop delivery option here</div></Container>
      </Panel>
    )
  }

    componentDidMount() {
        // When the drag starts, the describe method is used to extract the
        // relevant data that the drag represents and is pushed into the info
        // object for consumption by the target.
        this.source = new Ext.drag.Source({
            element: this.refs.source.cmp.el,
            handle: '.handle',
            constrain: this.refs.mainPanel.cmp.el,
            describe: info => {
                info.setData('postage-duration', info.eventTarget.getAttribute('data-days'));
            },
            listeners: {
                dragstart: (source, info) => {
                    source.getProxy().setHtml(info.eventTarget.innerHTML);
                }
            },
            proxy: {
                type: 'placeholder',
                cls: 'data-proxy'
            }
        });

        this.target = new Ext.drag.Target({
            element: this.refs.target.cmp.el,
            validCls: 'data-target-valid',
            listeners: {
                drop: (target, info) => {
                    // Get the data from the info object and use it to display the expectation to the user.
                    info.getData('postage-duration').then(duration => {
                        const s = Ext.String.format('Your parcel will arrive within {0} days', duration);
                        Ext.Msg.alert('Delivery set', s);
                    })
                }
            }
        })
    }

    componentWillUnmount() {
        Ext.destroy(this.source, this.target);
    }
}