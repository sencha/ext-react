import React from 'react';
import * as tests from './tests';
import { Link } from 'react-router';
import { Panel, Container } from '@sencha/ext-modern';
var REACT_VERSION = require('react').version;

export default function TestIndex() {
    return (
        <Panel margin="20" title="ExtReact Tests" shadow scrollable>
            <div>  {REACT_VERSION} </div>
            <ul> 
                { Object.keys(tests).map(name => (
                    <li key={name}><Link to={`/${name}`}>{name}</Link></li>
                ))}
            </ul>
        </Panel>        
    )
}