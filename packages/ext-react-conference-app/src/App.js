import React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'

import { store, history } from './store';

import Layout from './Layout';
import Schedule from './schedule/Schedule';
import Speakers from './speakers/Speakers';
import Calendar from './calendar/Calendar';
import Attendees from './attendees/Attendees';
import About from './about/About';

export default function App() {
  return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Layout>
            <Switch>
              <Redirect from='/' to='/schedule' exact/>
              <Route path="/schedule/:id?" component={Schedule}/>
              <Route path="/speakers/:id?" component={Speakers}/>
              <Route path="/calendar/:id?" component={Calendar}/>
              <Route path="/attendees" component={Attendees}/>
              <Route path="/about" component={About}/>
            </Switch>
          </Layout>
        </ConnectedRouter>
      </Provider>
  )
}
