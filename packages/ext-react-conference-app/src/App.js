import React from 'react'
//import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux'
import { Router, Route } from 'react-router-dom'

import { store, history } from './store';

import Layout from './Layout';
// import Schedule from './schedule/Schedule';
// import Speakers from './speakers/Speakers';
// import Calendar from './calendar/Calendar';
// import Attendees from './attendees/Attendees';
// import About from './about/About';
//import { ExtButton } from '@sencha/ext-react-modern';

export default function App() {
  return (
      //<ExtButton text="hi"></ExtButton>
      <Provider store={store}>
        <Router history={history}>
          <Route path="*" component={Layout} />
        </Router>
        {/* <ConnectedRouter history={history}>
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
        </ConnectedRouter> */}
      </Provider>
  )
}
