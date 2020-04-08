Ext.require('Ext.plugin.Responsive');
Ext.require('Ext.grid.Grid');

import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Layout from './Layout';

export default function App() {
  return (
      <Router>
        <Layout/>
      </Router>
  )
}
