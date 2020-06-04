import React, { Component } from "react";
import {
    Container,
    Column,
    Grid
} from "@sencha/ext-react-modern";
import { Tree, Treecolumn, Numbercolumn } from "@sencha/ext-react-modern";
import root from "./data";

export default class TreeGridExample extends Component {
    store = Ext.create("Ext.data.TreeStore", {
        rootVisible: true,
        root
    });

    render() {
        return (
            <Container layout="vbox">
                <Tree title="Tree Grid" store={this.store} shadow flex={1}>
                    <Treecolumn text="Name" dataIndex="text" width="200" />
                    <Numbercolumn
                        text="# Items"
                        dataIndex="numItems"
                        width="100"
                        align="center"
                        format="0,0"
                    />
                </Tree>
            </Container>
        );
    }
}
