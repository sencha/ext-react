import React, { Component } from "react";
import { ToolBar, TextField, Button } from "@sencha/ext-react-modern";
import { Tree, TreeColumn } from "@sencha/ext-react-modern";

import "./data";

export default class HeterogeneousTreeExample extends Component {
    cityModel = Ext.define("KitchenSink.model.tree.City", {
        extend: "Ext.data.TreeModel",
        entityName: "City",
        idProperty: "name",
        glyph: "xf19c@FontAwesome",
        fields: [
            {
                name: "name",
                convert: undefined
            },
            {
                name: "iconCls",
                defaultValue: "x-fa fa-bank"
            }
        ]
    });

    countryModel = Ext.define("KitchenSink.model.tree.Country", {
        extend: "Ext.data.TreeModel",
        entityName: "Country",
        idProperty: "name",
        glyph: "xf024@FontAwesome",
        fields: [
            {
                name: "name",
                convert: undefined
            },
            {
                name: "iconCls",
                defaultValue: "x-fa fa-flag"
            }
        ]
    });

    territoryModel = Ext.define("KitchenSink.model.tree.Territory", {
        extend: "Ext.data.TreeModel",
        entityName: "Territory",
        idProperty: "name",
        glyph: "xf0ac@FontAwesome",
        fields: [
            {
                name: "name",
                convert: undefined
            },
            {
                name: "iconCls",
                defaultValue: "x-fa fa-globe"
            }
        ]
    });

    store = Ext.create("Ext.data.TreeStore", {
        proxy: {
            type: "ajax",
            reader: {
                type: "json",
                typeProperty: "mtype"
            },
            url: "/KitchenSink/GeoData"
        },
        lazyFill: false
    });

    addItem = () => {
        var inputField = this.textfield.cmp,
            tree = this.tree.cmp,
            value = inputField.getValue(),
            target = tree.getSelections()[0] || this.store.getRoot(),
            node;

console.log(value)


        if (value) {
            if (this.store.getNodeById(value)) {
                return Ext.Msg.alert(
                    "Error",
                    "A node with this name already exists."
                );
            }

            node = {
                name: value
            };

            if (target.isRoot()) {
                //Nothing selected -- adding new Territory
                node.children = [];
                node.mtype = "Territory";
            } else if (target instanceof this.territoryModel) {
                // Programatically added - must not try to load over Ajax
                node.children = [];
                node.mtype = "Country";
            } else if (target instanceof this.countryModel) {
                // Adding to the Country level - that is our leaf level
                node.leaf = true;
                node.mtype = "City";
            }

            node = target.appendChild(node);

            // User might want to see what they've just added!
            if (!target.isExpanded()) {
                target.expand(false);
            }

            tree.select(node);
            inputField.reset();
        }
    };

    onFieldAction = ({field, e}) => {
        if (e.ENTER === e.getKey()) {
            this.addItem();
        }
    };

    onSelectionChange = (selectable, selection) => {
        var button = this.button.cmp,
            selectedNode;
        if (selection.length) {
            selectedNode = selection[0];

            if (selectedNode instanceof this.territoryModel) {
                button.setText("Add Country");
                button.enable();
            } else if (selectedNode instanceof this.countryModel) {
                button.setText("Add City");
                button.enable();
            } else {
                button.disable();
            }
        } else {
            button.setText("Add Territory");
            button.enable();
        }
    };

    //shadow

    render() {
        return (
            <Tree
                ref={tree => (this.tree = tree)}
                shadow
                title="Heterogeneous Geographical Tree"
                rootVisible={false}
                store={this.store}
                onSelectionchange={this.onSelectionChange}
            >
                <TreeColumn text="Name" dataIndex="name" flex="1" />
                <ToolBar docked="bottom">
                    <TextField
                        ref={textfield => (this.textfield = textfield)}
                        onAction={this.onFieldAction}
                    />
                    <Button
                        ref={button => (this.button = button)}
                        text="Add Territory"
                        handler={this.addItem}
                    />
                </ToolBar>
            </Tree>
        );
    }
}
