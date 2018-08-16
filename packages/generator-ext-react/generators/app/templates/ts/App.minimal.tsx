import * as React from 'react'
import { ExtReact, Container } from '@sencha/ext-modern';

declare var Ext:any;

// Enable responsiveConfig app-wide. You can remove this if you don't plan to build a responsive UI.
Ext.require('Ext.plugin.Responsive');

/**
 * The main application view
 */
export default function App() {

    return (
      <ExtReact>
        <Container fullscreen>
            <%= appName %>
        </Container>
      </ExtReact>
    )
    
}
