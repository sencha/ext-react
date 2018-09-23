import React, { Component } from 'react';
import { Button, Container } from '@sencha/ext-modern';
import { BrowserRouter as Router } from 'react-router-dom'
import { Transition} from '@sencha/ext-react-transition';
import { Switch, Route, withRouter } from 'react-router-dom'
import Home from './Home';
import About from './About';

export default class App extends Component {

  render() {
    return (
      <Router>
          <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/about" component={About}/>
          </Switch>
     </Router>
    )
  }
}