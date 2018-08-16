import React, { Component } from 'react';
import { Container, Button, Menu, MenuItem } from '@sencha/ext-modern';


export default class RelUpdate extends Component  {

    state = {
        showMenu: false
    }

    toggleMenu = () => {
        this.setState({ showMenu: !this.state.showMenu })
    }

    render() {
        const { showMenu } = this.state;

        return (
            <Container id="RelUpdate">
                <Container> 
                    <div>THis tests that configs can be updated by adding and removing child components.  Clicking the toggle menu button should add then remove the menu from the "Menu" button.</div>
                </Container>
                
                <Button text="Toggle Menu" handler={this.toggleMenu}/>
                <Button text="Menu">
                    { showMenu && (
                        <Menu itemId="menu" indented={false}>
                            <MenuItem text="Option 1"/>
                            <MenuItem text="Option 2"/>
                            <MenuItem text="Option 3"/>
                        </Menu>
                    )}
                </Button>
            </Container>
        )
    }

}