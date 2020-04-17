import React from 'react';
import { TabPanel, Container } from '@sencha/ext-react-modern';

export default function DesktopTabsExample() {
    return (
        <TabPanel
            flex={1}
            shadow
            defaults={{
                cls: "card",
                layout: "center",
                tab: {
                    flex: 0,
                    minWidth: 100
                }
            }}
            tabBar={{
                layout: {
                    pack: 'left'
                }
            }}
        >
            <Container title="Tab 1" layout="center" tab= {{flex: 0,minWidth: 100}}>
                <Container html="When optimizing for desktops, you may want to tabs on the left side of the tab bar.  You can do this by setting <code>pack: 'left'</code> in the tab bar's layout config."></Container>
            </Container>
            <Container title="Tab 2" layout="center" tab= {{flex: 0,minWidth: 100}}>
                <Container className="action" html='User tapped Tab 2'></Container>
            </Container>
            <Container title="Tab 3" layout="center" tab= {{flex: 0,minWidth: 100}}>
                <Container className="action" html='User tapped Tab 3'></Container>
            </Container>
        </TabPanel>
    )
}