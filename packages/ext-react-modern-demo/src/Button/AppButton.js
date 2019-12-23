import React, { Component } from 'react';
import { Button, Container } from '@sencha/ext-react-modern';

export default class AppButton extends Component {

  state = { message: null }

  render() {
    return (
      <Container padding="10">
        <Button
            text="Say Hello"
            onTap={this.sayHello}
            ui="action raised"
        />
        <Button
            text="Say Goodbye"
            onTap={this.sayGoodbye}
        />
        <Container padding="10" html={ this.state.message }></Container>
      </Container>
    )
  }

  sayHello = () => {
    //this.setState({ message: MESSAGE });
    this.setState({ message: 'Hello world!' });
  }

  sayGoodbye = () => {
    this.setState({ message: 'Goodbye cruel world.' });
  }

}