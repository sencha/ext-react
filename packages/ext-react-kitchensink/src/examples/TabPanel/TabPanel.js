import React from 'react';
import { TabPanel, Component, Container } from '@sencha/ext-react-modern';

export default function TabPanelExample() {
    return (
        <Container layout={{type: 'vbox', align: 'stretch'}} padding={10}>
            <TabPanel
                flex={1}
                shadow
                plain
            >
                <Container title="Tab 1" {...tabProps}>
                    <div>By default, tabs are aligned to the top of a view.</div>
                </Container>
                <Container title="Tab 2" {...tabProps}>
                    <div>A TabPanel can use different animations by setting <code>layout.animation.</code></div>
                </Container>
                <Container title="Tab 3" {...tabProps}>
                    <span className="action">User tapped Tab 3</span>
                </Container>
            </TabPanel>

            <TabPanel
                flex={1}
                shadow
                margin="20 0 0 0"
                tabBar={{
                    docked: 'bottom'
                }}
            >
                <Container title="Info" iconCls="x-fa fa-info-circle" {...tabProps}>
                    <div>Docking tabs to the bottom will automatically change their style.</div>
                </Container>
                <Container title="Download" iconCls="x-fa fa-download" badgeText="4" {...tabProps}>
                    <div>Badges <em>(like the 4, below)</em> can be added by setting <code>badgeText</code> when creating a tab or by using <code>setBadgeText()</code> on the tab later.</div>
                </Container>
                <Container title="Favorites" iconCls="x-fa fa-star" badgeText="Overflow Test" {...tabProps}>
                    <div>Badge labels will truncate if the text is wider than the tab.</div>
                </Container>
                <Container title="Bookmarks" iconCls="x-fa fa-bookmark" {...tabProps}>
                    <div>Tabbars are <code>ui:"dark"</code> by default, but also have light variants.</div>
                </Container>
                <Container title="More" iconCls="x-fa fa-ellipsis-h" {...tabProps}>
                    <span className="action">User tapped User</span>
                </Container>
            </TabPanel>
        </Container>
    )
}

const tabProps = {
    cls: "card",
    layout: "center"
};

