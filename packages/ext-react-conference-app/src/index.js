import React from 'react'
import App from './App'
import * as d3 from 'd3'
window.d3 = d3

import { launch } from '@sencha/ext-react-modern'
import { ExtReact } from '@sencha/ext-react-modern'

launch(<ExtReact><App/></ExtReact>,{ debug: false })