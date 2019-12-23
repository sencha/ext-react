import React from 'react';
import PropTypes from 'prop-types';
import { TreeList } from '@sencha/ext-react-modern';

Ext.require('Ext.data.TreeStore');

/**
 * The main navigation menu
 */
export default function NavMenu({
    onItemclick,
    selection,
    ...props
}) {
    return (
        <TreeList
            {...props}
            ui="nav"
            expanderFirst={false}
            onItemclick={(sender, info, eOpts) => {onItemclick(sender.info.node.getId())}}
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