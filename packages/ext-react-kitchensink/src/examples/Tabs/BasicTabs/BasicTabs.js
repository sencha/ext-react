import React from 'react';
import { ExtTabpanel, ExtContainer } from '@sencha/ext-react-modern';

export default function BasicTabsExample() {
  return (
    <ExtTabpanel
      flex={1}
      shadow
      defaults={{
        cls: "card",
        layout: "center"
      }}
    >
      <ExtContainer title="Tab 1" iconCls='home' layout="center">
        <ExtContainer iconCls='home' html='By default, tabs are aligned to the top of a view.'></ExtContainer>
      </ExtContainer>
      <ExtContainer iconCls='home' title="Tab 2" layout="center">
        <ExtContainer html='A TabPanel can use different animations by setting <code>layout.animation.</code>'></ExtContainer>
      </ExtContainer>
      <ExtContainer title="Tab 3" layout="center">
        <ExtContainer className="action" html='User tapped Tab 3'></ExtContainer>
      </ExtContainer>
    </ExtTabpanel>
  )
}