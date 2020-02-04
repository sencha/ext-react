import React, { Component } from 'react';
import { Panel, Container } from '@sencha/ext-react-modern';
import './styles.css';

Ext.require(['Ext.drag.*']);

export default class Handles extends Component {

    render() {
        return (
            <Panel
                ref="mainPanel"
                padding={5}
                shadow
            >
                <Container ref="handleRepeat" className="handle-repeat handle-source">
                    <Container className="handle"><div>Foo</div></Container>
                    <Container className="handle"><div>Bar</div></Container>
                    <Container className="handle"><div>Baz</div></Container>
                </Container>
                <Container ref="drag" className="handle-handles handle-source">
                    <Container className="handle"><div>Drag</div></Container>
                </Container>
            </Panel>
        )
    }

    componentDidMount() {
        this.sources = [
            // This source uses handle to represent a repeating element,
            // so when the item is dragged, contextual information can
            // be gained from the item.
            new Ext.drag.Source({
                groups: 'repeat',
                element: this.refs.handleRepeat.cmp.el,
                handle: '.handle',
                constrain: this.refs.mainPanel.cmp.el,
                listeners: {
                    dragstart: (source, info) => {
                        source.getProxy().setHtml(info.eventTarget.innerHTML);
                    }
                },
                proxy: {
                    type: 'placeholder',
                    cls: 'handle-proxy'
                }
            }),

            // This source is only draggable by the handle
            new Ext.drag.Source({
                element: this.refs.drag.cmp.el,
                handle: '.handle',
                constrain: this.refs.mainPanel.cmp.el
            })
        ]
    }

    componentWillUnmount() {
        this.sources.forEach(Ext.destroy.bind(Ext));
    }
}