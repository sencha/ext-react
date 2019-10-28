import React from 'react';
import PropTypes from 'prop-types';
import ExtTreelist from "@sencha/ext-elements-all/react/ExtTreelist";
//import { TreeList } from '@sencha/ext-modern';
const Ext = window.Ext;
Ext.require('Ext.data.TreeStore');

export default function NavMenu({
    onItemClick,
    selection,
    ...props
}) {
    return (
        <ExtTreelist
            {...props}
            ui="nav"
            expanderFirst={false}
            onItemclick2={onItemClick.bind(this)}
            onItemclick={( {detail: { sender, info }} ) => onItemClick(info.node.getId())}
            onItemclick3={(tree, item) => onItemClick(item.node.getId())}
            selection={selection}
            store={{
                root: {
                    children: [
                        { id: '/', text: 'Home', iconCls: 'x-fa fa-home', leaf: true },
                        { id: '/about', text: 'About', iconCls: 'x-fa fa-info', leaf: true },
                    ]
                }
            }}
        />
    )
}

NavMenu.propTypes = {
    onSelectionChange: PropTypes.func,
    selection: PropTypes.string
};