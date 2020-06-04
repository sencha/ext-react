import React from 'react';
import { ExtTabpanel, ExtPanel, ExtContainer } from '@sencha/ext-react-modern';

export default function IconTabsExample() {
  return (
    <ExtTabpanel
      shadow
      tabBar={{ docked: 'bottom' }}
      defaults={{
        cls: "card",
        layout: "center"
      }}
    >
      <ExtPanel iconCls="x-fa fa-info-circle" layout="center">
        <ExtContainer html='Docking tabs to the bottom will automatically change their style.'></ExtContainer>
      </ExtPanel>
      <ExtPanel iconCls="x-fa fa-download" badgeText="4" layout="center">
        <ExtContainer html='Badges <em>(like the 4, below)</em> can be added by setting the <code>badgeText</code> prop.'></ExtContainer>
      </ExtPanel>
      <ExtPanel iconCls="x-fa fa-star" badgeText="Overflow Test" layout="center">
        <ExtContainer html='Badge labels will truncate if the text is wider than the tab.'></ExtContainer>
      </ExtPanel>
      <ExtPanel iconCls="x-fa fa-bookmark" layout="center">
        <ExtContainer html='Tabbars are <code>ui:"dark"</code> by default, but also have light variants.'></ExtContainer>
      </ExtPanel>
      <ExtPanel iconCls="x-fa fa-ellipsis-h" layout="center">
        <ExtContainer className="action" html='User tapped User'></ExtContainer>
      </ExtPanel>
    </ExtTabpanel>
  )
}
