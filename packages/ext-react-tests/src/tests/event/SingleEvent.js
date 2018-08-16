import React, { Component } from 'react';
import { Container, Button } from '@sencha/ext-modern';

export default class BasicEvent extends Component {
    state = {
        count: 0
    }

    onButtonTap = () => this.setState({ count: this.state.count + 1 })
    
    render() {
        return (
            <Container>
                <Button text="Button" itemId="button" onTap={{ single: true, fn: this.onButtonTap }}/>
                <div id="message">
                    {this.state.count}
                </div>
            </Container>
        )
    }
}