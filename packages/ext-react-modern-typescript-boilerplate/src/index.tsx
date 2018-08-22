//declare class ExtReact extends React.Component { }
//@extjs/ext-react/index.d.ts
// declare class ExtReact extends React.Component<ExtReactProps, any> { }
// export interface ExtReactProps {
// }

import * as React from 'react';
//import * as ReactDOM from 'react-dom';
import App from './App'; // app components
import { launch } from '@sencha/ext-react'
import { ExtReact } from '@sencha/ext-react'

launch(<ExtReact><App/></ExtReact>);
