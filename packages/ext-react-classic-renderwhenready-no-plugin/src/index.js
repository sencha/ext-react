import React from 'react'
import App1 from './App1'
import App2 from './App2'
import { render } from '@sencha/ext-react'

//import { ExtReact } from '@sencha/ext-react'
import { reactify } from '@sencha/ext-react'
const ExtReact = reactify('ExtReact')

render(<ExtReact><App1/></ExtReact>, document.getElementById('div1'))
render(<App2/>, document.getElementById('div2'))
