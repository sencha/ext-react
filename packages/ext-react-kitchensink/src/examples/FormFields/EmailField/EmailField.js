import React from 'react';
import { FormPanel, EmailField } from '@sencha/ext-react-modern';

Ext.require('Ext.data.validator.Url');

export default function EmailFieldExample() {
    return (
        <FormPanel shadow>
            <EmailField
                width={250}
                placeholder="user@domain.com"
                label="Email"
                validators="email"
            />
        </FormPanel>
    )
}