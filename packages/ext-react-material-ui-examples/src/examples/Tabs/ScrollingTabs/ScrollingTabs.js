import React, { Component } from 'react';
import { TabPanel, Panel, Container } from '@sencha/ext-react-modern';

Ext.require('Ext.layout.overflow.Scroller');

export default class ScrollingTabsExample extends Component {

    render() {
        return (
            <TabPanel
                shadow
                tabBar={{
                    layout: {
                        pack: 'start',
                        overflow: 'scroller'
                    }
                }}
                platformConfig={{
                    "!phone": {
                        height: 600,
                        width: 400
                    }
                }}
                defaults={{
                    layout: "center",
                    cls: 'card',
                    bodyPadding: 0,
                    tab: {
                        minWidth: 130
                    }
                }}
            >
                <Panel title="Home" layout="center" tab={{minWidth:130}}>
                    <Container width={'100%'} html="You can set <code>{`layout: { overflow: 'scroller' }`}</code> on the <code>tabBar</code> prop in combination with a <code>minWidth</code> on each tab to make the tab bar scroll when it runs out of room."></Container>
                </Panel>
                <Panel title="Politics" layout="center" tab={{minWidth:130}}><Container>Politics</Container></Panel>
                <Panel title="Entertainment" layout="center" tab={{minWidth:130}}><Container>Entertainment</Container></Panel>
                <Panel title="World" layout="center" tab={{minWidth:130}}><Container>World</Container></Panel>
                <Panel title="Markets" layout="center" tab={{minWidth:130}}><Container>Markets</Container></Panel>
                <Panel title="Sports" layout="center" tab={{minWidth:130}}><Container>Sports</Container></Panel>
            </TabPanel>
        )
    }

}