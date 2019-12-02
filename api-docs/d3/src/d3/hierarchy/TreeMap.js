/**
 * @class Ext.d3.hierarchy.TreeMap
 * @extend Ext.d3.hierarchy.Hierarchy
 * @xtype d3-treemap
 *
 * The 'd3-treemap' component uses D3's
 * [TreeMap Layout](https://github.com/d3/d3-hierarchy/#treemap)
 * to recursively subdivide area into rectangles, where the area of any node in the tree
 * corresponds to its value.
 *
 *     @example packages=[d3,ext-react]
 *     import React, { Component } from 'react'
 *     import { ExtReact, Container }  from '@sencha/ext-react-modern';
 *     import { D3_TreeMap } from '@sencha/ext-react-d3';
 *
 *     export default class MyExample extends Component {
 *
 *         store = Ext.create('Ext.data.TreeStore', {
 *                 data: [{
 *                     text: 'Hulk',
 *                     value: 5,
 *                     children: [{
 *                         text: 'The Leader',
 *                         value: 3
 *                     },
 *                         {
 *                             text: 'Abomination',
 *                             value: 2
 *                         },
 *                         {
 *                             text: 'Sandman',
 *                             value: 1
 *                         }
 *                     ]
 *                 },
 *                     {
 *                         text: 'Vision',
 *                         value: 4,
 *                         children: [{
 *                             text: 'Kang',
 *                             value: 4
 *                         },
 *                             {
 *                                 text: 'Magneto',
 *                                 value: 3
 *                             },
 *                             {
 *                                 text: 'Norman Osborn',
 *                                 value: 2
 *                             },
 *                             {
 *                                 text: 'Anti-Vision',
 *                                 value: 1
 *                             }
 *                         ]
 *                     },
 *                     {
 *                         text: 'Ghost Rider',
 *                         value: 3,
 *                         children: [{
 *                             text: 'Mephisto',
 *                             value: 1
 *                         }]
 *                     },
 *                     {
 *                         text: 'Loki',
 *                         value: 2,
 *                         children: [{
 *                             text: 'Captain America',
 *                             value: 3
 *                         },
 *                             {
 *                                 text: 'Deadpool',
 *                                 value: 4
 *                             },
 *                             {
 *                                 text: 'Odin',
 *                                 value: 5
 *                             },
 *                             {
 *                                 text: 'Scarlet Witch',
 *                                 value: 2
 *                             },
 *                             {
 *                                 text: 'Silver Surfer',
 *                                 value: 1
 *                             }
 *                         ]
 *                     },
 *                     {
 *                         text: 'Daredevil',
 *                         value: 1,
 *                         children: [{
 *                             text: 'Purple Man',
 *                             value: 4
 *                         },
 *                             {
 *                                 text: 'Kingpin',
 *                                 value: 3
 *                             },
 *                             {
 *                                 text: 'Namor',
 *                                 value: 2
 *                             },
 *                             {
 *                                 text: 'Sabretooth',
 *                                 value: 1
 *                             }
 *                         ]
 *                     }
 *                 ]
 *             });
 *
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout="fit">
 *                         <D3_TreeMap
 *                             store={this.store}
 *                             tooltip={{
 *                                 renderer: function(component, tooltip, node) {
 *                                     tooltip.setHtml(node.data.get('text'));
 *                                 }
 *                             }}
 *                         />
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 */

/**
 * @cfg {Function} [tiling=null]
 * The [tiling method](https://github.com/d3/d3-hierarchy#treemap_tile) to use
 * with the `treemap` layout. For example:
 *
 *     tiling: 'd3.treemapBinary'
 * @accessor
 */

/**
 * @cfg {Object} parentTile
 *
 * Parent tile options.
 *
 * @cfg {Number} [parentTile.padding=4]
 * Determines the amount of extra space to reserve between
 * the parent and its children. Uniform on all sides, except the top
 * padding is calculated by the component itself depending on the height
 * of the tile's title.
 *
 * @cfg {Object} parentTile.label Parent tile label options.
 *
 * @cfg {Number} [parentTile.label.offset=[5, 2]]
 * The offset of the label from the top-left corner of the tile's rect.
 *
 * @cfg {Number[]} parentTile.label.clipSize
 * If the size of a parent node is smaller than this size, its label will be hidden.
 * @accessor
 */

/**
 * @cfg {Object} leafTile
 * Leaf tile options.
 *
 * @cfg {Number} [leafTile.padding=0]
 * The [padding](https://github.com/d3/d3-hierarchy#treemap_paddingInner)
 * used to separate a node’s adjacent children.
 *
 * @cfg {Object} leafTile.label Child tile label options.
 *
 * @cfg {Number} [leafTile.label.offset=[5, 1]]
 * The offset of the label from the top-left corner of the tile's rect.
 * @accessor
 */

/**
 * @cfg {String} [busyLayoutText='Layout in progress...']
 * The text to show when the layout is in progress.
 */

/**
 * @cfg {Boolean} scaleLabels
 * @since 6.5.0
 * If `true` the bigger tiles will have (more or less) proportionally bigger labels.
 * @accessor
 */
