import React, { Component } from 'react';
import { Container, Button } from '@sencha/ext-modern';

export default class Defaults extends Component {
    render() {
        return (
            <Container defaults={{ text: 'Button' }}>
                <Button itemId="button"/>
            </Container>
        )
    }
}
