/**
 * @class Ext.layout.Fit
 * @extend Ext.layout.Auto
 * This is a layout for container that contain a single item that automatically expands to
 * fill the container. This class is intended to be extended or created via the layout:'fit'
 * {@link Ext.container.Container#layout} config, and should generally not need to be created
 * directly via the new keyword.
 *
 * Fit layout does not have any direct config options (other than inherited ones). To fit a
 * panel to a container using Fit layout, simply set `layout: 'fit'` on the container and
 * add a single panel to it.
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react';
 *     import { ExtReact, Container, Panel } from '@sencha/ext-react-modern';
 *
 *     export default class myExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <Container width="300" height="150" layout="fit">
 *                         <Panel title="Inner Panel" bodyPadding="20" border="false">
 *                             This is the inner panel content
 *                         </Panel>
 *                     </Container>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 */
