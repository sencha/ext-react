import React, { Component } from 'react';
import { Button, Container, ExtReact, ExtReactRenderer } from '@sencha/ext-modern';

export default class AppComponents2 extends Component {

  render() {
    return (
        <div style={{ border: '1px solid blue'}} padding="10">
            <ExtReact>
                <Container style={{ border: '1px solid red'}} padding="10">
                    <Button text="Say Hello" ui="action raised"/>
                    <Button text="Say Goodbye"/>
                </Container>
            </ExtReact>
        </div>
    )
  }

  render2() {
    return (
        <Container style={{ border: '1px solid blue'}} padding="10">
            <Container style={{ border: '1px solid red'}} padding="10">
                <Button text="Say Hello" ui="action raised"/>
                <Button text="Say Goodbye"/>
            </Container>
        </Container>
    )
  }

}