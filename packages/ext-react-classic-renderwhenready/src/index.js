import React from 'react'
import App1 from './App1'
import App2 from './App2'
import { render } from '@sencha/ext-react-modern'
import { ExtReact } from '@sencha/ext-react-modern'

render(<ExtReact><App1/></ExtReact>, document.getElementById('div1'))
render(<App2/>, document.getElementById('div2'))
