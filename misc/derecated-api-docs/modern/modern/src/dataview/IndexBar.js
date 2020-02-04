/**
 * @class Ext.dataview.IndexBar
 * @extend Ext.Component
 * @xtype indexbar
 *
 * IndexBar is a component used to display a list of data (primarily an alphabet) which can then be used to quickly
 * navigate through a list (see {@link Ext.List}) of data. When a user taps on an item in the {@link Ext.IndexBar},
 * it will fire the {@link #index} event.
 *
 * Here is an example of the usage in a {@link Ext.List}:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react'
 *     import { ExtReact, List } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *
 *         store = new Ext.data.Store({
 *             data: [{
 *                 firstName: 'Screech',
 *                 lastName: 'Powers'
 *             },
 *             {
 *                 firstName: 'Kelly',
 *                 lastName: 'Kapowski'
 *             },
 *             {
 *                 firstName: 'Zach',
 *                 lastName: 'Morris'
 *             },
 *             {
 *                 firstName: 'Jessie',
 *                 lastName: 'Spano'
 *             },
 *             {
 *                 firstName: 'Lisa',
 *                 lastName: 'Turtle'
 *             },
 *             {
 *                 firstName: 'A.C.',
 *                 lastName: 'Slater'
 *             },
 *             {
 *                 firstName: 'Richard',
 *                 lastName: 'Belding'
 *             }]
 *         });
 *
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <List
 *                         itemTpl="<div class='contact'>{firstName} <strong>{lastName}</strong></div>"
 *                         store={this.store}
 *                         indexBar
 *                     />
 *                 </ExtReact>
 *             )
 *         }
 *     }
 */

/**
 * @cfg {vertical/horizontal} [direction='vertical]
 * Layout direction, can be either 'vertical' or 'horizontal'
 * @accessor
 */

/**
 * @event index
 * Fires when an item in the index bar display has been tapped.
 * @param {Ext.dataview.IndexBar} this The IndexBar instance
 * @param {String} html The HTML inside the tapped node.
 * @param {Ext.dom.Element} target The node on the indexbar that has been tapped.
 */

/**
 * @cfg {Array} [letters=['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']]
 * The letters to show on the index bar.
 * @accessor
 */

/**
 * @cfg {String} [listPrefix=null]
 * The prefix string to be used at the beginning of the list.
 * E.g: useful to add a "#" prefix before numbers.
 * @accessor
 */
