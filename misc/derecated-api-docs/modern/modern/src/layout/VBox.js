/**
 * @class Ext.layout.VBox
 * @extend Ext.Base
 *
 * @alias layout.vbox
 * The VBox (short for vertical box) layout makes it easy to position items vertically in a
 * {@link Ext.Container Container}. It can size items based on a fixed height or a fraction
 * of the total height available.
 *
 * For example, let's say we want a banner to take one third of the available height, and
 * an information panel in the rest of the screen. We can achieve this with vbox layout's
 * *flex* config:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, Panel } from '@sencha/ext-react-modern';
 *
 *     export default class myExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout="vbox">
 *                         <Panel title="Inner Panel 1" flex="1">
 *                             This is the inner panel content
 *                         </Panel>
 *                         <Panel title="Inner Panel 2" flex="1">
 *                             This is the inner panel content
 *                         </Panel>
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 *
 * This will give us two boxes - one that's one third of the available height, the other
 * being two thirds of the available height.
 *
 * We can also specify fixed heights for child items, or mix fixed heights and flexes. For
 * example, here we have 3 items - one at the top and bottom with flex: 1, and one in the
 * center with a fixed width of 100px:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, Panel } from '@sencha/ext-react-modern';
 *
 *     export default class myExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout="vbox">
 *                         <Panel title="Inner Panel 1" flex="1">
 *                             This is the inner panel content
 *                         </Panel>
 *                         <Panel title="Inner Panel 2" height="100">
 *                             This is the inner panel content
 *                         </Panel>
 *                         <Panel title="Inner Panel 3" flex="1">
 *                             This is the inner panel content
 *                         </Panel>
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 */
