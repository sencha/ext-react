import React, { Component } from 'react';
//import { TextColumn, TreeColumn } from '@sencha/ext-react-modern';
import { Tree } from '@sencha/ext-react-modern';
import store from './Store.js';

Ext.require([
    'Ext.grid.plugin.Editable',
    'Ext.grid.plugin.CellEditing'
]);

export default class EditableTreeExample extends Component {

    render(){
        return (
            <Tree
                shadow
                store={store}
                platformConfig={{
                    title: "Editable Tree",
                    desktop: {
                        plugins: {
                            gridcellediting: true
                        }
                    },
                    '!desktop': {
                        plugins: {
                            grideditable: true
                        }
                    }
                }}
                {...columnProps}
            >
            </Tree>
        )
    }
}

const columnProps = {
    columns : [{
        xtype:'treecolumn',
        text:"Name",
        dataIndex:"text",
        flex:1,
        editable: true
    }, {
        xtype:'textcolumn',
        text:"Class Name",
        dataIndex:"className",
        flex:1,
        editable:true
    }]
}