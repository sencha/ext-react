/**
 * @class Ext.layout.HBox
 * @extend Ext.layout.Box
 * @alias layout.hbox
 *
 * The HBox (short for horizontal box) layout makes it easy to position items horizontally in a
 * {@link Ext.Container Container}. It can size items based on a fixed width or a fraction of the total width
 * available.
 *
 * For example, an email client might have a list of messages pinned to the left, taking say one third of the available
 * width, and a message viewing panel in the rest of the screen. We can achieve this with hbox layout's *flex* config:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, Panel } from '@sencha/ext-react-modern';
 *
 *     export default class myExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout="hbox">
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
 * This will give us two boxes - one that's one third of the available width, the other being two thirds of the
 * available width.
 *
 * We can also specify fixed widths for child items, or mix fixed widths and flexes. For example, here we have 3 items
 * - one on each side with flex: 1, and one in the center with a fixed width of 100px:
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, Panel } from '@sencha/ext-react-modern';
 *
 *     export default class myExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container layout="hbox">
 *                         <Panel title="Inner Panel 1" flex="1">
 *                             This is the inner panel content
 *                         </Panel>
 *                         <Panel title="Inner Panel 2" width="100">
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
