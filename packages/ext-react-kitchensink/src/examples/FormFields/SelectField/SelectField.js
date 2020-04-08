import React from 'react';
import { FormPanel, SelectField } from '@sencha/ext-react-modern';

Ext.require('Ext.Toast');

export default function SelectFieldExample() {
    return (
        <FormPanel shadow>
            <SelectField
                label="Select"
                width="200"
                onChange={(field, newValue) => Ext.toast(`You selected the item with value ${newValue}`)}
                options={[
                    { text: '', value: null },
                    { text: 'Option 1', value: 1 },
                    { text: 'Option 2', value: 2 },
                    { text: 'Option 3', value: 3 }
                ]}
            />
        </FormPanel>
    )
}