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
            <Container title="Tab 1" layout="center">
                <Container html='By default, tabs are aligned to the top of a view.'></Container>
            </Container>
            <Container title="Tab 2" layout="center">
                <Container html='A TabPanel can use different animations by setting <code>layout.animation.</code>'></Container>
            </Container>
            <Container title="Tab 3" layout="center">
                <Container className="action" html='User tapped Tab 3'></Container>
            </Container>
        </TabPanel>
    )
}