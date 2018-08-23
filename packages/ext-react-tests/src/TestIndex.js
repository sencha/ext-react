import React from 'react';
import * as tests from './tests';
import { Link } from 'react-router';
import { Panel } from '@sencha/ext-modern';
var REACT_VERSION = require('react').version;

export default function TestIndex() {

  title = "ExtReact Tests - React v" + REACT_VERSION

  return (
    <Panel margin="20" title={this.title} shadow scrollable>
      <ul> 
        { Object.keys(tests).map(name => (
          <li key={name}><Link to={`/${name}`}>{name}</Link></li>
        ))}
      </ul>
    </Panel>
  )
}