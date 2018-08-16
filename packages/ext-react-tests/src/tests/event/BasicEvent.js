import React, { Component } from 'react';
import { Container, Button, Panel } from '@sencha/ext-modern';

export default class BasicEvent extends Component {
    state = {
        message: 'adafag'
    }

    onButtonTap = () => {debugger; 
        this.setState({ message: 'tapped' })}
    
    render() {
        return (
            <Container>
                <Button text={this.state.message} itemId="button" onTap={this.onButtonTap}/>
                <Panel id="message">
                    {this.state.message}
                </Panel>
            </Container>
            
        )
    }
}