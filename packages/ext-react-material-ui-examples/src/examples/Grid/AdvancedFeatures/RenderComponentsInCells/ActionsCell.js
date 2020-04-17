import React, { Component } from 'react';
import { Container, Button } from '@sencha/ext-react-modern';

export default class ActionsCell extends Component {

    render() {
        const { buyHandler, sellHandler, watchHandler, name } = this.props;

        return (
            <Container layout="hbox" defaults={{ ui: 'action', margin: '0 5 0 0' }}>
                <Button text="Buy" handler={buyHandler}/>
                <Button text="Sell" handler={sellHandler}/>
                <Button text="Watch" handler={watchHandler}/>
            </Container>
        )
    }

}