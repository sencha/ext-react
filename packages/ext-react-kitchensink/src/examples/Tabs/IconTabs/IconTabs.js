import React from 'react';
import { TabPanel, Container } from '@sencha/ext-react-modern';

export default function IconTabsExample() {
    return (
        <TabPanel
            shadow
            tabBar={{ docked: 'bottom' }}
            defaults={{
                cls: "card",
                layout: "center"
            }}
        >
            <Container iconCls="x-fa fa-info-circle" layout="center">
                <Container html='Docking tabs to the bottom will automatically change their style.'></Container>
            </Container>
            <Container iconCls="x-fa fa-download" badgeText="4" layout="center">
                <Container html='Badges <em>(like the 4, below)</em> can be added by setting the <code>badgeText</code> prop.'></Container>
            </Container>
            <Container iconCls="x-fa fa-star" badgeText="Overflow Test" layout="center">
                <Container html='Badge labels will truncate if the text is wider than the tab.'></Container>
            </Container>
            <Container iconCls="x-fa fa-bookmark" layout="center">
                <Container html='Tabbars are <code>ui:"dark"</code> by default, but also have light variants.'></Container>
            </Container>
            <Container iconCls="x-fa fa-ellipsis-h" layout="center">
                <Container className="action" html='User tapped User'></Container>
            </Container>
        </TabPanel>
    )
}
