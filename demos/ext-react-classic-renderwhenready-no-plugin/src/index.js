import React from 'react'
import App1 from './App1'
import App2 from './App2'
import { render } from '@sencha/ext-react-classic'

//import { ExtReact } from '@sencha/ext-react-modern'
//import { reactify } from '@sencha/ext-react-modern'
//const ExtReact = reactify('ExtReact')

render(<App1/>, document.getElementById('div1'))
render(<App2/>, document.getElementById('div2'))
