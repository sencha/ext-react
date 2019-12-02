import React, { Component } from 'react';

import {
    Container,
    FieldSet,
    FormPanel,
    TimeField,
    Toolbar,
    Button
} from '@sencha/ext-react-modern';

Ext.require('Ext.field.InputMask'); // need to require this specifically for inputMask props to work

export default class TimeFieldExample extends Component {
    constructor() {
        super();

        this.state = {
            disabled: false
        };
    }

    toggleDisabled() {
        this.setState({ disabled: !this.state.disabled });
    }

    render() {
        const { disabled } = this.state;

        return (
            <Container
                platformConfig={{
                    phone: {
                        layout: 'fit'
                    },
                    "!phone": {
                        layout: 'center',
                        padding: 10
                    }
                }}
            >
                <FormPanel
                    ref={form => this.form = form}
                    shadow
                    padding="20"
                    platformConfig={{
                        "!phone": {
                            maxHeight: 500,
                            width: 350
                        }
                    }}
                >
                    <FieldSet ref="personal" title="Personal Info" defaults={{labelAlign: "placeholder"}}>
                        <TimeField required label="Time Field" value="3:42 PM" name="time" disabled={disabled}/>
                    </FieldSet>
                    <Toolbar shadow={false} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                        <Button text={disabled ? 'Enable All' : 'Disable All'} margin="0 10 0 0" handler={this.toggleDisabled.bind(this)}/>
                        <Button text="Reset" handler={() => this.form.cmp.reset()}/>
                    </Toolbar>
                </FormPanel>
            </Container>
        );
    }
}