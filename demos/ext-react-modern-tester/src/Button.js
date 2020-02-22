import React, { Component } from 'react';
import { ExtButton, ExtContainer } from '@sencha/ext-react-modern';

export default class Button extends Component {

  state = { message: null }

  render() {
    return (
      <ExtContainer padding="10">
        <ExtButton
            text="Say Hello"
            onTap={this.sayHello}
            ui="action raised"
        />
        <ExtButton
            text="Say Goodbye"
            onTap={this.sayGoodbye}
        />
        <ExtContainer padding="10" html={ this.state.message }></ExtContainer>
      </ExtContainer>
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