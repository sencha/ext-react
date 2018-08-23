import React, { Component } from 'react';
//import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import * as tests from './tests';
//import Layout from './Layout';
//import TestIndex from './TestIndex';

import createHistory from 'history/createHashHistory'
const history = createHistory()

import { Panel } from '@sencha/ext-modern'
var REACT_VERSION = require('react').version

// <IndexRoute component={TestIndex}/>
// { Object.keys(tests).map(name => (
//   <Route key={name} path={name} component={tests[name]}/>
// ))}

//<Router history={history}>

// <Route path="/" component={Layout}>
// <IndexRoute component={TestIndex}/>
// </Route>
//</Router>


export default class App extends Component {

  title = "ExtReact Tests - React v" + REACT_VERSION

  render() {
    return (

        <Panel margin="20" title={this.title} shadow scrollable>
            <ul> 
                { Object.keys(tests).map(name => (
                    <li key={name}><a href={`/test/All_Tests/${name}`}>{name}</a></li>
                ))}
            </ul>
        </Panel>  

    )
  }

}