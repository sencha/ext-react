import React, { Component } from 'react';
import { TabBar, Tab, Panel, Container } from '@sencha/ext-react-modern';

export default class TabBarExample extends Component {

    state = {
        activeTab: "download"
    }

    render() {
        const { activeTab } = this.state;

        return (
            <Container layout={{ type: 'vbox', align: 'center' }} padding="10">
                <Panel ui="instructions" margin="0 0 20 0" shadow >
                    <div>To acheive the look and feel of tabs without using a <code>TabPanel</code>, you can use <code>TabBar</code> and <code>Tab</code> as standalone components.</div>
                </Panel>

                <TabBar width="400" shadow onActiveTabChange={this.onTabChange} activeTab={activeTab}>
                    <Tab key='1' itemId="info" title="Info" iconCls="x-fa fa-info-circle" onActivate={this.onActivateTab}/>
                    <Tab key='2' itemId="download" title="Download" iconCls="x-fa fa-download" badgeText="2" onActivate={this.onActivateTab}/>
                    <Tab key='3' itemId="favorites" title="Favorites" iconCls="x-fa fa-star" onActivate={this.onActivateTab}/>
                    <Tab key='4' itemId="bookmarks" title="Bookmarks" iconCls="x-fa fa-bookmark" onActivate={this.onActivateTab}/>
                </TabBar>

                <Panel ui="instructions" margin="20 0 0 0" shadow >
                    <Container html={`Active Tab: ${activeTab}`}></Container>
                </Panel>
            </Container>
        )
    }

    onTabChange = (bar, tab) => {
        this.setState({ activeTab: tab.getItemId() })
    }

}