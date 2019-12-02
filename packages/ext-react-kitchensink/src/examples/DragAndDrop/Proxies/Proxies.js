import React, { Component } from 'react';
import { Panel, Container } from '@sencha/ext-react-modern';
import './styles.css';

Ext.require(['Ext.drag.*']);

export default class Proxies extends Component {

    state = {
        noneText: 'No Proxy'
    }

    render() {
        const {noneText} = this.state;
        return (
            <Panel
                ref="mainPanel"
                padding={5}
                shadow
            >
                <Container ref="none" className="proxy-none proxy-source" html={noneText}></Container>
                <Container ref="original" className="proxy-original proxy-source"html="Element as proxy with revert: true"></Container>
                <Container ref="placeholder" className="proxy-placeholder proxy-source" html="Placeholder"></Container>
            </Panel>
        )
    }

    componentDidMount() {
        this.sources = [
            // No proxy, just track the mouse cursor
            new Ext.drag.Source({
                element: this.refs.none.cmp.el,
                constrain: this.refs.mainPanel.cmp.el,
                proxy: 'none',
                listeners: {
                    dragmove: (source, info) => {
                        const pos = info.proxy.current,
                            noneText = Ext.String.format('X: {0}, Y: {1}', Math.round(pos.x), Math.round(pos.y));

                        this.setState({ noneText });
                    },
                    dragend: () => {
                        this.setState({ noneText: 'No Proxy' });
                    }
                }
            }),

            // Use the drag element as the proxy. Animate it back into position on drop.
            new Ext.drag.Source({
                element: this.refs.original.cmp.el,
                revert: true,
                constrain: this.refs.mainPanel.cmp.el,
                proxy: 'original'
            }),

            // Leave the drag element in place and create a custom placeholder.
            new Ext.drag.Source({
                element: this.refs.placeholder.cmp.el,
                constrain: this.refs.mainPanel.cmp.el,
                proxy: {
                    type: 'placeholder',
                    cls: 'proxy-drag-custom',
                    html: 'Custom'
                }
            })
        ];
    }

    componentWillUnmount() {
        this.sources.forEach(Ext.destroy.bind(Ext));
    }
}