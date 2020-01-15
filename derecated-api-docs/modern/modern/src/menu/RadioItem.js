/**
 * @class Ext.menu.RadioItem
 * @extend Ext.menu.CheckItem
 * @alias widget.menuradioitem
 *
 * A menu item that contains a radio button item which can participate in a group of
 * mutually exclusive radio items.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Button, Container, Menu, MenuRadioItem } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                    <Container>
 *                        <Button text="Menu">
 *                            <Menu rel="menu" >
 *                                <MenuRadioItem text="Mobile" name="ui-type" />
 *                                <MenuRadioItem text="Desktop" name="ui-type"/>
 *                            </Menu>
 *                        </Button>
 *                    </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 */

/**
 * @cfg {String} [group=null]
 * Name of a radio group that the item belongs.
 *
 * Specifying this option will turn check item into a radio item.
 *
 * Note that the group name is local to the owning Menu.
 * @accessor
 */

/**
 * @cfg {Boolean} [allowUncheck=null]
 * By default, as in native RadioGroups, a checked radio item cannot be unchecked
 * by the UI. Set this to `true` to allow unchecking of checked RadioItems.
 * @accessor
 */
