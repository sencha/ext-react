import React from 'react';
import { FieldSet, TextField, FormPanel } from '@sencha/ext-react-modern';

export default function FieldSetExample() {
    return (
        <FormPanel shadow>
            <FieldSet title="About You" instructions="Tell us about yourself." width={300}>
                <TextField label="First Name" labelAlign="placeholder"/>
                <TextField label="Last Name" labelAlign="placeholder"/>
            </FieldSet>
        </FormPanel>
    )
}