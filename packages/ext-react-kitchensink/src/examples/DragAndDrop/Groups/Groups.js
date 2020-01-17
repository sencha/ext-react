import React, { Component } from 'react';
import { Panel, Container } from '@sencha/ext-react-modern';
import './styles.css';

Ext.require(['Ext.drag.*']);

export default class Groups extends Component {

    render() {
        return (
            <Panel
                ref="mainPanel"
                padding={5}
                shadow
            >
                <Container className="group1">
                    <Container ref="src1" className="group-source-group1 group-source"><div>group1</div></Container>
                    <Container ref="src2" className="group-source-group2 group-source"><div>group2</div></Container>
                    <Container ref="srcb" className="group-source-both group-source"><div>group1, group2</div></Container>
                </Container>

                <Container className="group2">
                    <Container ref="tar1" className="group-target-group1 group-target"><div>group1</div></Container>
                    <Container ref="tar2" className="group-target-group2 group-target"><div>group2</div></Container>
                    <Container ref="tarb" className="group-target-both group-target"><div>group1, group2</div></Container>
                </Container>
            </Panel>
        )
    }

    createSource = (cfg) => new Ext.drag.Source(Object.assign(cfg, {
        constrain: this.refs.mainPanel.cmp.el,
        proxy: {
            type: 'placeholder',
            cls: 'group-proxy',
            invalidCls: 'group-proxy-invalid',
            validCls: 'group-proxy-valid',
            html: 'Drag'
        }
    }))

    componentDidMount() {
        this.sources = [
            this.createSource({
                id: 'group1-source',
                element: this.refs.src1.cmp.el,
                // This source will only interact with targets that belong to group1
                groups: 'group1'
            }),
            this.createSource({
                id: 'group2-source',
                element: this.refs.src2.cmp.el,
                // This source will only interact with targets that belong to group2
                groups: 'group2'
            }),
            this.createSource({
                id: 'both-source',
                element: this.refs.srcb.cmp.el,
                // This source will only interact with targets that belong to group1 or group2
                groups: ['group1', 'group2']
            }),

            new Ext.drag.Target({
                id: 'group1-target',
                element: this.refs.tar1.cmp.el,
                // This target will only interact with sources that belong to group1
                groups: 'group1'
            }),
            new Ext.drag.Target({
                id: 'group2-target',
                element: this.refs.tar2.cmp.el,
                // This target will only interact with sources that belong to group2
                groups: 'group2'
            }),
            new Ext.drag.Target({
                id: 'both-target',
                element: this.refs.tarb.cmp.el,
                // This target will only interact with sources that belong to group1 or group2
                groups: ['group1', 'group2']
            })
        ];
    }

    componentWillUnmount() {
        this.sources.forEach(Ext.destroy.bind(Ext));
    }
}