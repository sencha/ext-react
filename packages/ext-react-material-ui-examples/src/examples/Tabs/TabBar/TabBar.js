import React, { Component } from 'react';
import { ExtTabbar, ExtTab, ExtPanel, ExtContainer } from '@sencha/ext-react-modern';

export default class ExtTabbarExample extends Component {

  state = {
    activeTab: "download"
  }

  onTabChange = ({sender, value, oldValue}) => {
    this.setState({ activeTab: value.getItemId() })
  }

  render() {
    const { activeTab } = this.state;

    return (
      <ExtContainer layout={{ type: 'vbox', align: 'center' }} padding="10" width="500">
        <ExtPanel ui="instructions" margin="0 0 20 0" shadow >
          <div>To acheive the look and feel of tabs without using a <code>TabExtPanel</code>, you can use <code>ExtTabbar</code> and <code>Tab</code> as standalone components.</div>
        </ExtPanel>

        <ExtTabbar width="500" shadow onActiveTabchange={this.onTabChange} activeTab={activeTab}>
          <ExtTab key='1' itemId="info" title="Info" iconCls="x-fa fa-info-circle" onActivate={this.onActivateTab}/>
          <ExtTab key='2' itemId="download" title="Download" iconCls="x-fa fa-download" badgeText="2" onActivate={this.onActivateTab}/>
          <ExtTab key='3' itemId="favorites" title="Favorites" iconCls="x-fa fa-star" onActivate={this.onActivateTab}/>
          <ExtTab key='4' itemId="bookmarks" title="Bookmarks" iconCls="x-fa fa-bookmark" onActivate={this.onActivateTab}/>
        </ExtTabbar>

        <ExtPanel ui="instructions" margin="20 0 0 0" shadow >
          <ExtContainer html={`Active Tab: ${activeTab}`}></ExtContainer>
        </ExtPanel>
      </ExtContainer>
    )
  }
}