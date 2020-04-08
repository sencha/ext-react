import React from 'react';
import { Container, Panel, FormPanel, TextField, UrlField, EmailField, NumberField, DatePickerField } from '@sencha/ext-react-modern';

Ext.require("Ext.data.validator.*");

export default function ValidationExample() {
    return (
        <Container
            scrollable
            platformConfig={{
                desktop: {
                    layout: 'center'
                }
            }}
        >
            <Container
                padding={10}
                platformConfig={{
                    desktop: {
                        maxWidth: 400,
                    }
                }}
            >
                <FormPanel
                    padding={10}
                    shadow
                    defaults={{
                        errorTarget: 'under'
                    }}
                    margin="0 0 20 0"
                    title="Using Validators"
                >
                    <Container html="<div>Here we use validators from <code>Ext.data.validator</code> to validate user input.</div>"/>
                    <TextField
                        required
                        label="Required Field"
                        requiredMessage="This field is required."
                    />
                    <UrlField
                        label="URL"
                        validators={{
                            type: 'url',
                            message: 'Please enter a valid website url.'
                        }}
                    />
                    <EmailField
                        label="Email"
                        validators="email"
                    />
                    <TextField
                        label="Phone Number"
                        inputMask="(999) 999-9999" // field is validated by this automatically
                    />
                    <DatePickerField
                        label="Date of Birth"
                        placeholder="mm/dd/yyyy"
                        validators="date"
                    />
                    <TextField
                        label="Salary"
                        placeholder="$xx,xxx"
                        validators={{
                            type: 'currency-us',
                            message: 'Invalid salary.'
                        }}
                    />
                    <NumberField
                        label="Rating (1-5)"
                        decimals={0}
                        validators={{
                            type: 'range',
                            min: 1,
                            max: 5,
                            minOnlyMessage: 'The rating must be at least {0}',
                            maxOnlyMessage: 'The rating must be no more than than {0}',
                            bothMessage: 'Invalid rating, must be between {0} and {1}'
                        }}
                    />
                    <TextField
                        label="Last Login"
                        placeholder="YYYY/MM/DD hh:mm"
                        validators={{
                            type: 'datetime',
                            message: 'Invalid date and/or time'
                        }}
                    />
                    <TextField
                        label="Custom Format Regex: Uppercase letters only"
                        name="uppercase"
                        validators={{
                            type: 'format',
                            matcher: /^[A-Z]*$/,
                            message: 'Only uppercase letters are allowed.'
                        }}
                    />
                    {/*
                    mjg
                    <TextField
                        label="Custom Format Function: Capitalized words"
                        validators={{
                            type: 'method',
                            fn: validateCapilization
                        }}
                    /> */}
                </FormPanel>
                <FormPanel
                    padding={10}
                    shadow
                    title="Assigning Error Messages Directly"
                >
                    <Container html="<div>Here we assign error messages directly using the <code>errorMessage</code> and <code>error</code> props.</div>"/>
                    <TextField
                        label="Single Error"
                        errorMessage="The value you entered is invalid."
                        errorTarget= 'under'
                    />
                    <TextField
                        label="Multiple Errors"
                        errorTarget= 'under'
                        error={[
                            "Error 1",
                            "Error 2",
                            "Error 3"
                        ]}
                    />
                </FormPanel>
            </Container>
        </Container>
    )
}

// A method validator function returns the error message when
// invalid, true when valid.
function validateCapilization(value) {
    const words = value.split(/\s+/);

    for (let word of words) {
        if (word.length && !word.match(/^[A-Z].*$/)) {
            return 'All words must be capitalized.';
        }
    }

    return true;
}
