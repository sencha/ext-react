import React, { Component } from 'react';

import {
    Fieldset,
    Formpanel,
    Urlfield,
    Textfield,
    Emailfield,
    Radiofield,
    Textareafield,
    Togglefield,
    Sliderfield,
    Datepickerfield,
    Passwordfield,
    Spinnerfield,
    Checkboxfield,
    Button,
    Selectfield,
    Container,
    Toolbar,
    Colorfield
} from '@sencha/ext-react-modern';

Ext.require([
  'Ext.field.InputMask', // need to require this specifically for inputMask props to work
  'Ext.ux.colorpick.*'
]);

export default class FormPanelExample extends Component {
    constructor() {
        super();

        const color = '#00ff00';

        this.state = {
            color,
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
                <Formpanel
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
                    <Fieldset ref="personal" title="Personal Info" defaults={{labelAlign: "placeholder"}}>
                        <Textfield label="Name" required placeholder="This field is required" disabled={disabled}/>
                        <Passwordfield label="Password" required revealable disabled={disabled}/>
                        <Emailfield label="Email" placeholder="me@sencha.com" disabled={disabled}/>
                        <Textfield label="Phone Number" inputMask="(999) 999-9999" inputType="tel" disabled={disabled}/>
                        <Urlfield label="URL" placeholder="http://sencha.com" disabled={disabled}/>
                        <Spinnerfield label="Spinner" minValue={0} maxValue={1000} stepValue={1} cycle margin="15 0 0 0" labelAlign="top" disabled={disabled}/>
                        <Datepickerfield label="Start Date" disabled={disabled}/>
                        <Selectfield label="Rank"
                            disabled={disabled}
                            options={[
                                { text: 'Master', value: 'master' },
                                { text: 'Journeyman', value: 'journeyman' },
                                { text: 'Apprentice', value: 'apprentice' }
                            ]}
                        />
                        <Textfield label="With Error" errorMessage="This field is invalid" errorTarget="under" disabled={disabled}/>
                        <Sliderfield label="Slider" disabled={disabled}/>
                        <Togglefield label="Toggle" disabled={disabled}/>
                        <Textareafield label="Bio" maxRows={5} disabled={disabled}/>
                    </Fieldset>
                    <Fieldset title="Roles" layout={{type: 'vbox', align: 'left'}} margin="15 0" defaults={{labelAlign: "placeholder"}}>
                        <Checkboxfield disabled={disabled} boxLabel="Admin"/>
                        <Checkboxfield disabled={disabled} boxLabel="Power User"/>
                    </Fieldset>
                    <Fieldset
                        title="Favorite Color"
                        layout={{ type: 'vbox', align: 'left' }}
                        defaults={{
                            labelAlign: "placeholder",
                            name: 'color',
                            labelAlign: 'right',
                            labelWidth: 'auto',
                            padding: 0
                        }}
                    >
                        <Radiofield name="color" disabled={disabled} boxLabel="Red" value="red"/>
                        <Radiofield name="color" disabled={disabled} boxLabel="Blue" value="blue"/>
                        <Radiofield name="color" disabled={disabled} boxLabel="Green" value="green"/>
                        <Radiofield name="color" disabled={disabled} boxLabel="Purple" value="purple"/>
                    </Fieldset>
                    <Fieldset
                        title="Second Favorite Color"
                        layout={{ type: 'vbox', align: 'left'}}
                        viewModel={{
                            data: {
                                color: this.state.color
                            }
                        }}
                    >
                        <Colorfield bind="{color}" xtype="colorfield" disabled={disabled} />
                    </Fieldset>
                    <Toolbar shadow={false} docked="bottom" layout={{ type: 'hbox', pack: 'right' }}>
                        <Button text={disabled ? 'Enable All' : 'Disable All'} margin="0 10 0 0" handler={this.toggleDisabled.bind(this)}/>
                        <Button text="Reset" handler={() => this.form.cmp.reset()}/>
                    </Toolbar>
                </Formpanel>
            </Container>
        );
    }
}