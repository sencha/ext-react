Ext.require('Ext.plugin.Responsive');
Ext.require('Ext.grid.Grid');

import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './Layout';

// Enable responsiveConfig app-wide. You can remove this if you don't plan to build a responsive UI.

/**
 * The main application view
 */
export default function App() {
  return (
      <Router>
        <Layout/>
      </Router>
  )
}
