/**
 * @class Ext.TitleBar
 * @extend Ext.Container
 * @xtype titlebar
 *
 * {@link Ext.TitleBar}'s are most commonly used as a docked item within an {@link Ext.Container}.
 *
 * The main difference between a {@link Ext.TitleBar} and an {@link Ext.Toolbar} is that
 * the {@link #title} prop.
 *
 * You can also give items of a {@link Ext.TitleBar} an `align` prop of `left` or `right`,
 * which will dock them to the `left` or `right` of the bar.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, TitleBar, Button } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container>
 *                         <TitleBar title="App Title" docked="top">
 *                             <Button align="left" iconCls="x-fa fa-bars"/>
 *                             <Button align="right" iconCls="x-fa fa-inbox" text="Inbox"/>
 *                             <Button align="right" iconCls="x-fa fa-user" text="Profile"/>
 *                         </TitleBar>
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 */

/**
 * @cfg cls
 * @inheritdoc
 */

/**
 * @cfg {String} [title=null]
 * The title of the toolbar.
 * @accessor
 */

/**
 * @cfg {String} [titleAlign='center']
 * The alignment for the title of the toolbar.
 * @accessor
 */

/**
 * @cfg {String} [defaultType='button']
 * The default xtype to create.
 * @accessor
 */

/**
 * @cfg {String} [defaultButtonUI=null]
 * A default {@link Ext.Component#ui ui} to use for {@link Ext.Button Button} items.
 */

/**
 * @cfg {String/Number} [minHeight=null]
 * The minimum height height of the Toolbar.
 * @accessor
 */

/**
 * @cfg layout
 * @hide
 */

/**
 * @cfg {Array/Object} [items=[]]
 * The child items to add to this TitleBar. The {@link #defaultType} of
 * a TitleBar is {@link Ext.Button}.
 *
 * You can also give items an `align` prop, which will align the item to the `left` or `right` of
 * the TitleBar.
 * @accessor
 */

/**
 * @cfg {String} [maxButtonWidth='40%']
 * The maximum width of the button by percentage
 * @accessor
 */
