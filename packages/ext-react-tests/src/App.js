import React, { Component } from 'react';
import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import * as tests from './tests';
import Layout from './Layout';
import TestIndex from './TestIndex';

export default class App extends Component {

    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={TestIndex}/>
                    { Object.keys(tests).map(name => (
                        <Route key={name} path={name} component={tests[name]}/>
                    ))}
                </Route>
            </Router>
        )
    }

}