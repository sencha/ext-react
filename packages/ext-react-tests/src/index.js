import React from 'react'
import { launch } from '@sencha/ext-react'
import { ExtReact } from '@sencha/ext-react'
//import { Container } from '@sencha/ext-modern'
import App from './App'

// include all ExtReact components so we can use them directly in jest tests.
Ext.require('Ext.*')

launch(<ExtReact><App/></ExtReact>, { debug: true })
//launch(<ExtReact><Container html="hi"></Container></ExtReact>, { debug: true })
