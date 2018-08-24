import React from 'react'
import { launch } from '@sencha/ext-react'
import { ExtReact } from '@sencha/ext-react'
import App from './App'

Ext.require('Ext.*')

launch(<ExtReact><App/></ExtReact>, { debug: false })
