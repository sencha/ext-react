import React, { Component } from 'react';
import { Container, Button } from '@sencha/ext-modern';

export default class LifecycleUnmount extends Component {

    state = {
        show: true
    }

    toggleChild = () => {
        this.setState({ show: !this.state.show })
    }

    render() {
        const { show } = this.state;

        return (
            <Container>
                <Button itemId="button" text="Unmount" handler={this.toggleChild}/>
                { show && (
                    <Container>
                        <MyComponent/>
                    </Container>
                )}
                <div id="message"/>
            </Container>
        )
    }
}

class MyComponent extends Component {

    componentWillUnmount() {
        document.getElementById('message').innerHTML = 'unmounted'
    }

    render() {
        return (
            <Container>
            <div>Shown</div>
            </Container>
        )
    }

}
