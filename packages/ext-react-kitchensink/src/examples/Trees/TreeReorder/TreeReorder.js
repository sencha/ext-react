import React, { Component } from 'react';
import { Tree, Container, Toolbar, Button } from '@sencha/ext-react-modern';

Ext.require([
    'Ext.data.TreeStore',
    'Ext.grid.plugin.TreeDragDrop'
]);
export default class TreeReorderExample extends Component {

    store = Ext.create('Ext.data.TreeStore', {
        type: 'tree',
        rootVisible: true,
        sorters: [{
            property: 'text',
            direction: 'ASC'
        }],
        root: {
            text: 'Products',
            expanded: true
        },
        proxy: {
            type: 'ajax',
            url: 'resources/data/tree/cars.json'
        },
    });

    state = {
        width: 350,
        height: 400,
        title: 'Files'
    };

    onExpandAllClick = () => {
        this.refs.mainTree.cmp.mask({
            xtype: 'loadmask',
            message: 'Expanding tree...'
        });

        this.refs.treeToolbar.cmp.disable();

        this.refs.mainTree.cmp.expandAll(() => {
            this.refs.mainTree.cmp.unmask();
            this.refs.treeToolbar.cmp.enable();
        });
    }

    onCollapseAllClick = () => {
        this.refs.treeToolbar.cmp.disable();

        this.refs.mainTree.cmp.collapseAll(() => {
            this.refs.treeToolbar.cmp.enable();
        });
    }

    onResetClick = () => {
        this.store.reload();
    }

    render() {
        const { title, width, height } = this.state;
        return (
            <Container padding="10" layout="center" flex="1" height="100%">
                <Tree plugins="treedragdrop" ref="mainTree" width={width} height={height} title={title} store={this.store} shadow>
                    <Toolbar docked="top" ref="treeToolbar">
                        <Button text="Expand All" handler={this.onExpandAllClick}></Button>
                        <Button text="Collapse All" handler={this.onCollapseAllClick}></Button>
                        <Button text="Reset" handler={this.onResetClick}></Button>
                    </Toolbar>
                </Tree>
            </Container>
        )
    }

}