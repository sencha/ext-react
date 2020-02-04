import React, { Component } from "react";
import { Tree, TreeColumn } from "@sencha/ext-react-modern";
import store from "./Store";

export default class CellEditingTreeExample extends Component {
    render() {
        return (
            <Tree
                title="Cell Editing Tree"
                store={store}
                plugins={[{ type: "gridcellediting" }]}
            >
                <TreeColumn text="Name" dataIndex="text" flex="1" editable />
            </Tree>
        );
    }
}
