import React, { Component } from 'react';
import { Container, Picker, Button } from '@sencha/ext-react-modern';

export default class PickerExample extends Component {

    state = { displayed: false };
    showPicker = () => this.setState({ displayed: true });
    onHidden = () => this.setState({ displayed: false });

    render() {
        const { displayed } = this.state;

        return (
            <Container>
                <Button ui="action" handler={this.showPicker} text="Show Picker"/>
                <Picker
                    displayed={displayed}
                    value={[100]}
                    onHide={this.onHidden}
                    slots={[
                        {
                            name: 'limit_speed',
                            title: 'Speed',
                            data: [
                                {text: '50 KB/s', value: 50},
                                {text: '100 KB/s', value: 100},
                                {text: '200 KB/s', value: 200},
                                {text: '300 KB/s', value: 300}
                            ]
                        }
                    ]}
                />
            </Container>
        )
    }

}