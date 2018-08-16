import React, { Component } from 'react';
import { Tree } from '@sencha/ext-modern';
import data from './data';

export default class TreeExample extends Component {

    store = Ext.create('Ext.data.TreeStore', {
        rootVisible: true,
        root: data
    })

    render() {
        return (
            <Tree store={this.store} shadow/>
        )
    }

}