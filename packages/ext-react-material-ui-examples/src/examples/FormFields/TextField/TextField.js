import React from 'react';
import { FormPanel, TextField, FieldSet } from '@sencha/ext-react-modern';

export default function TextFieldExample() {
    return (
        <FormPanel shadow padding="20">
            <FieldSet title="Separate Label and Placeholder" margin="0 0 20 0">
                <TextField placeholder="Enter Name..." label="Name" required/>
            </FieldSet>
            <FieldSet title="Label as Placeholder" margin="0 0 20 0" >
                <TextField labelAlign="placeholder" label="Name" required/>
            </FieldSet>
            <FieldSet title="With Error Message">
                <TextField
                    labelAlign="placeholder"
                    label="Label"
                    errorMessage="The value you entered is invalid."
                    value="invalid value"
                    errorTarget="under"
                />
            </FieldSet>
        </FormPanel>
    )
}