import React from 'react';
import { Container, Button } from '@sencha/ext-modern';

export default function Simple() {
    return (
        <Container>
            <div>This simply tests that we can render an Ext JS component</div>
            <Button itemId="button" text="Click Me"/>
        </Container>
    )
}