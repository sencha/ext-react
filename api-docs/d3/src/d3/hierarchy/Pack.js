/**
 * @class Ext.d3.hierarchy.Pack
 * @extend Ext.d3.hierarchy.Hierarchy
 * @xtype d3-pack
 *
 * The 'd3-pack' component uses D3's
 * [Pack Layout](https://github.com/d3/d3-hierarchy/#pack)
 * to visualize hierarchical data as a enclosure diagram.
 * The size of each leaf node’s circle reveals a quantitative dimension
 * of each data point. The enclosing circles show the approximate cumulative size
 * of each subtree.
 *
 * The pack additionally layout populates the `r` attribute on each node, where `r` is the
 * computed node radius.
 *
 *     @example packages=[d3,ext-react]
 *     import React, { Component } from 'react'
 *     import { ExtReact, Container }  from '@sencha/ext-react-modern';
 *     import { D3_Pack } from '@sencha/ext-react-d3';
 *
 *     export default class MyExample extends Component {
 *
 *         store = Ext.create('Ext.data.TreeStore', {
 *               data: [{
 *                   "text": "DC",
 *                   "children": [{
 *                       "text": "Flash",
 *                       "children": [{
 *                           "text": "Flashpoint"
 *                       }]
 *                   },
 *                       {
 *                           "text": "Green Lantern",
 *                           "children": [{
 *                               "text": "Rebirth"
 *                           },
 *                               {
 *                                   "text": "Sinestro Corps War"
 *                               }
 *                           ]
 *                       },
 *                       {
 *                           "text": "Batman",
 *                           "children": [{
 *                               "text": "Hush"
 *                           },
 *                               {
 *                                   "text": "The Long Halloween"
 *                               },
 *                               {
 *                                   "text": "Batman and Robin"
 *                               },
 *                               {
 *                                   "text": "The Killing Joke"
 *                               }
 *                           ]
 *                       }
 *                   ]
 *               },
 *                   {
 *                       "text": "Marvel",
 *                       "children": [{
 *                           "text": "All",
 *                           "children": [{
 *                               "text": "Infinity War"
 *                           },
 *                               {
 *                                   "text": "Infinity Gauntlet"
 *                               },
 *                               {
 *                                   "text": "Avengers Disassembled"
 *                               }
 *                           ]
 *                       },
 *                           {
 *                               "text": "Spiderman",
 *                               "children": [{
 *                                   "text": "Ultimate Spiderman"
 *                               }]
 *                           },
 *                           {
 *                               "text": "Vision",
 *                               "children": [{
 *                                   "text": "The Vision"
 *                               }]
 *                           },
 *                           {
 *                               "text": "X-Men",
 *                               "children": [{
 *                                   "text": "Gifted"
 *                               },
 *                                   {
 *                                       "text": "Dark Phoenix Saga"
 *                                   },
 *                                   {
 *                                       "text": "Unstoppable"
 *                                   }
 *                               ]
 *                           }
 *                       ]
 *                   }
 *               ]
 *           });
 *
 *       render() {
 *           return (
 *               <ExtReact>
 *                   <Container layout="fit">
 *                       <D3_Pack
 *                           store={this.store}
 *                           tooltip={{
 *                               renderer: function(component, tooltip, node) {
 *                                     var record = node.data;
 *                                     tooltip.setHtml(record.get('text'));
 *                                 }
 *                           }}
 *                       />
 *                   </Container>
 *               </ExtReact>
 *           )
 *       }
 *     }
 */

/**
 * The padding of a node's text inside its container.
 * If the length of the text is such that it can't have the specified padding
 * and still fit into a container, the text will hidden, unless the
 * {@link #clipText} config is set to `false`.
 * It's possible to use negative values for the padding to allow the text to
 * go outside its container by the specified amount.
 * @cfg {Array} [textPadding=[3,3]] Array of two values: horizontal and vertical padding.
 * @accessor
 */

/**
 * @cfg nodeValue
 * By default, the area occupied by the node depends on the number
 * of children the node has, but cannot be zero, so that leaf
 * nodes are still visible.
 * @accessor
 */

/**
 * If `false`, the text will always be visible, whether it fits inside its
 * container or not.
 * @cfg {Boolean} [clipText=true]
 * @accessor
 */
