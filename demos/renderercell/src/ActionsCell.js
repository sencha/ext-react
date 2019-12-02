import React, { Component } from 'react';
import { reactify } from '@sencha/ext-react-modern';
var ExtReactRenderer = reactify('ExtReactRenderer');
var Container = reactify('Container');
var Button = reactify('Button');

export default class ActionsCell extends Component {

    render() {
        const { buyHandler, sellHandler, watchHandler, name } = this.props;

    // <Container layout="hbox" defaults={{ ui: 'action', margin: '0 5 0 0' }}>
    //     <Button text="Buy" handler={buyHandler}/>
    //     <Button text="Sell" handler={sellHandler}/>
    //     <Button text="Watch" handler={watchHandler}/>
    // </Container>

        return (
            <ExtReactRenderer>

                <Button text="Buy" handler={buyHandler}/>
                <Button text="Sell" handler={sellHandler}/>
                <Button text="Watch" handler={watchHandler}/>

            </ExtReactRenderer>
        )
    }

}