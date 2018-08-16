import React, { Component } from 'react'
import { ExtReact, Panel } from '@sencha/ext-modern';

// Enable responsiveConfig app-wide. You can remove this if you don't plan to build a responsive UI.
Ext.require('Ext.plugin.Responsive');

/**
 * The main application view
 */
export default function App() {

    return (
      <ExtReact>
        <Panel title="<%= appName %>" fullscreen>
            Hello World!
        </Panel>
      </ExtReact>
    )
    
}
