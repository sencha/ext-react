import React, { Component } from 'react';
import { Container } from '@sencha/ext-react-modern';
import Menu from './Menu';
import AppBar from './AppBar';
import Search from './Search';
import { Switch, Route, withRouter } from 'react-router-dom'

import Schedule from './schedule/Schedule';
import Speakers from './speakers/Speakers';
import Calendar from './calendar/Calendar';
import Attendees from './attendees/Attendees';
import About from './about/About';

export default function Layout({ children }) {
    return (
        <Container layout="fit" viewport="true">
            <AppBar/>
            <Menu/>
            {/* <Search/> */}
            {/* { children } */}

            <Switch>
            <Route path="/" component={Speakers} exact/>
                  {/* <Route path="/" component={Home} exact/>
                  <Route path="/about" component={About}/> */}

                  {/* <Redirect from='/' to='/schedule' exact/> */}
              {/* <Route path="/schedule/:id?" component={Schedule}/> */}

              <Route path="/speakers/:id?" component={Speakers}/>
              {/* <Route path="/calendar/:id?" component={Calendar}/>
              <Route path="/attendees" component={Attendees}/> */}
              <Route path="/about" component={About}/>


            </Switch>


        </Container>
    )

}
