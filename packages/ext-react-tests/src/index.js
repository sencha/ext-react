import React from 'react'
import { launch } from '@sencha/ext-react-modern'
import { ExtReact } from '@sencha/ext-react-modern'
import App from './App'

Ext.require('Ext.*')

launch(<ExtReact><App/></ExtReact>, { debug: false })
