import 'babel-polyfill'
import React from 'react'
import App from './App' 
import * as d3 from 'd3'
window.d3 = d3

import { launch } from '@sencha/ext-react'
import {ExtReact} from '@sencha/ext-react'

launch(<ExtReact><App/></ExtReact>,{ debug: false })