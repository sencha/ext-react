import * as React from 'react';
import PropTypes from 'prop-types';
import { TreeList } from '@sencha/ext-react-modern';

declare var Ext:any;

Ext.require('Ext.data.TreeStore');

interface NavMenuProps {
    onItemClick: Function,
    selection: string
}

/**
 * The main navigation menu
 */
const NavMenu: React.SFC<NavMenuProps & any> = ({
    onItemClick,
    selection,
    ...props
}) => (
    <TreeList
        {...props}
        ui="nav"
        expanderFirst={false}
        onItemclick={(sender, info, eOpts) => {onItemClick(sender.info.node.getId())}}
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

export default NavMenu;