/**
 * @class Ext.menu.Item
 * @extend Ext.Component
 * @alias widget.menuitem
 *
 * A base class for all menu items that require menu-related functionality such as click handling,
 * sub-menus, icons, etc.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Button, Container, Menu, MenuItem } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container>
 *                        <Button text="Menu">
 *                            <Menu rel="menu" >
 *                                <MenuItem text="Mobile" name="ui-type" />
 *                                <MenuItem text="Desktop" name="ui-type"/>
 *                            </Menu>
 *                        </Button>
 *                    </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 */

/**
 * @cfg {String} [href='#']
 * The href attribute to use for the underlying anchor link.
 * @accessor
 */

/**
 * @cfg {String} [target=null]
 * The target attribute to use for the underlying anchor link.
 * @accessor
 */

/**
 * @cfg {Function/String} [handler=null]
 * A function called when the menu item is clicked (can be used instead of {@link #click} event).
 * @cfg {Ext.menu.Item} handler.item The item that was clicked
 * @cfg {Ext.event.Event} handler.e The underlying {@link Ext.event.Event}.
 * @controllable
 * @accessor
 */

/**
 * @cfg {String} [text=null]
 * The text to display in the menu item.
 * @accessor
 */

/**
 * @cfg {Ext.menu.Menu/Object} [menu=null]
 * Either an instance of {@link Ext.menu.Menu} or a config object for an {@link Ext.menu.Menu}
 * which will act as a sub-menu to this item.
 * @accessor
 */

/**
 * @cfg {String} [menuAlign='tl-tr?']
 * The default {@link Ext.util.Positionable#getAlignToXY Ext.util.Positionable.getAlignToXY}
 * anchor position value for this item's sub-menu relative to this item's position.
 * @accessor
 */

/**
 * @cfg {String} [icon=null]
 * The url of an icon to display as the background image of the icon.
 * @accessor
 */

/**
 * @cfg {String} [iconCls=null]
 * The CSS class to apply to the icon.
 * @accessor
 */

/**
 * @cfg {String} [iconAlign=start]
 * The side of teh text to place the icon. Defaults to `'start'` meaning at the
 * left in LTR locales.
 * @accessor
 */

/**
 * @cfg {Boolean} [separator=null]
 * If `true`, this item places an {@link Ext.menu.Separator} above itself unless
 * it is the first visible item.
 *
 * @accessor
 */

/**
 * @property {Boolean} [isMenuItem=true]
 * `true` in this class to identify an object as an instantiated Menu Item, or subclass thereof.
 */

/**
 * @cfg {Number} [menuExpandDelay=200]
 * The delay in milliseconds before this item's sub-menu expands after this item is moused over.
 */

/**
 * @cfg {Number} [menuHideDelay=200]
 * The delay in milliseconds before this item's sub-menu hides after this item is moused out.
 */

/**
 * @cfg {Object} [scope=null]
 * The scope (`this` refeence) in which the configured {@link #handler} will be executed,
 * unless the scope is a ViewController method nmame.
 * @accessor
 */

/**
 * @cfg {Boolean} [destroyMenu=true]
 * Whether or not to destroy any associated sub-menu when this item is destroyed.
 */

/**
 * @cfg {Number} [clickHideDelay=0]
 * The delay in milliseconds to wait before hiding the menu after clicking the menu item.
 * This only has an effect when `hideOnClick: true`.
 */

/**
 * @cfg {Boolean} [hideOnClick=true]
 * Whether to not to hide the owning menu when this item is clicked.
 */
