import React from 'react';
import { FormPanel, TextAreaField } from '@sencha/ext-react-modern';

export default function TextAreaFieldExample() {
    return (
        <FormPanel shadow>
            <TextAreaField
                label="Description"
                width="300"
                maxRows={10}
            />
        </FormPanel>
    )
}