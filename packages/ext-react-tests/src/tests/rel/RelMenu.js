import React from 'react';
import { Container, Button, Menu, MenuItem } from '@sencha/ext-modern';

export default function RelMenu() {
    return (
        <Container>
            <Container>
                <div>This tests that the menu config is automatically set when a Menu appears inside a Button. The test should verify that the button has a menu.</div>
            </Container>
            <Button text="Menu" itemId="button">
                <Menu itemId="menu">
                    <MenuItem text="Option 1"/>
                    <MenuItem text="Option 2"/>
                    <MenuItem text="Option 3"/>
                </Menu>
            </Button>
        </Container>
    )
}