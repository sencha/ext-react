import React, { Component } from 'react';
import { Container, Button } from '@sencha/ext-modern';
import {ExtReact} from '@sencha/ext-modern';

export default class ActionsCell extends Component {

  render() {
    const { buyHandler, sellHandler, watchHandler, name } = this.props;

    return (
      <ExtReact>
        <Container layout="vbox" defaults={{ ui: 'action', margin: '0 5 0 0' }}>
          <Container>one</Container>
          <Container>two</Container>
          <Container>three</Container>

            <Button text="Buy" handler={buyHandler}/>
            <Button text="Sell" handler={sellHandler}/>
            <Button text="Watch" handler={watchHandler}/>
        </Container>
      </ExtReact>
    )
  }

}