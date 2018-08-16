import React from 'react';
import { Container, Button, Menu, MenuItem } from '@sencha/ext-modern';

export default function Rel() {
    return (
        <Container>
            <Container>
                <div>This tests that we can set a config using a child component with a "rel" prop.  The test should verify that the button has a menu.</div>
            </Container>
            <Button text="Menu" itemId="button">
                <Menu rel="menu" itemId="menu">
                    <MenuItem text="Option 1"/>
                    <MenuItem text="Option 2"/>
                    <MenuItem text="Option 3"/>
                </Menu>
            </Button>
        </Container>
    )
}