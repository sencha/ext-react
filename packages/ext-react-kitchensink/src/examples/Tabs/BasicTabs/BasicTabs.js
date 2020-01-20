import React from 'react';
import { TabPanel, Container } from '@sencha/ext-react-modern';

export default function BasicTabsExample() {
    return (
        <TabPanel
            flex={1}
            shadow
            defaults={{
                cls: "card",
                layout: "center"
            }}
        >
            <Container title="Tab 1" iconCls='home' layout="center" tab={{
              ui: 'app-code-tab',
              flex: 0,
              padding: "0 5 0 0",
              minWidth: 220,
              maxWidth: 250
            }}>
                <Container iconCls='home' html='By default, tabs are aligned to the top of a view.'></Container>
            </Container>
            <Container iconCls='home' title="Tab 2" layout="center"  tab={{
              ui: 'app-code-tab',
              flex: 0,
              padding: "0 5 0 0",
              minWidth: 220,
              maxWidth: 250
            }}>
                <Container html='A TabPanel can use different animations by setting <code>layout.animation.</code>'></Container>
            </Container>
            <Container title="Tab 3" layout="center"  tab={{
              ui: 'app-code-tab',
              flex: 0,
              padding: "0 5 0 0",
              minWidth: 220,
              maxWidth: 250
            }}>
                <Container className="action" html='User tapped Tab 3'></Container>
            </Container>
        </TabPanel>
    )
}