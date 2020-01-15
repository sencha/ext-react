/**
 * @class Ext.tab.Panel
 * @extend Ext.Container
 * @xtype tabpanel
 *
 * Tab Panels are a great way to allow the user to switch between several pages that are all full screen. Each
 * Component in the Tab Panel gets its own Tab, which shows the Component when tapped on. Tabs can be positioned at
 * the top or the bottom of the Tab Panel, and can optionally accept title and icon
 * configurations (see {@link Ext.Button#iconCls iconCls} for additional information).
 *
 *     @example packages=[ext-react]
 *     import React, { Component } from 'react'
 *     import { ExtReact, Container, TabPanel } from '@sencha/ext-react-modern';
 *
 *     export default class MyExample extends Component {
 *         render() {
 *             return (
 *                 <ExtReact>
 *                     <TabPanel>
 *                         <Container title="Tab 1">
 *                             This is content for Tab 1!
 *                         </Container>
 *                         <Container title="Tab 2">
 *                             This is content for Tab 2!
 *                         </Container>
 *                         <Container title="Tab 3">
 *                             This is content for Tab 3!
 *                         </Container>
 *                     </TabPanel>
 *                 </ExtReact>
 *             )
 *         }
 *     }
 *
 * One tab was created for each of the {@link Ext.Container containers} defined in the within the tabpanel.
 * Each tab automatically uses the title and icon defined on the item configuration, and
 * switches to that item when tapped.
 */
