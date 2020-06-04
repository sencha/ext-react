import React from 'react';
import { NumberField, FormPanel } from '@sencha/ext-react-modern';

export default function SpinnerFieldExample() {
    return (
        <FormPanel shadow>
            <NumberField
                decimals={2}
                label="Number"
                width="150"
            />
        </FormPanel>
    )
}