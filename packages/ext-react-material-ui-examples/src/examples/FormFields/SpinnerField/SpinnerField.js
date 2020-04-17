import React from 'react';
import { SpinnerField, FormPanel } from '@sencha/ext-react-modern';

export default function SpinnerFieldExample() {
    return (
        <FormPanel shadow>
            <SpinnerField
                label="Spinner"
                width="150"
                minValue={0}
                maxValue={10}
                stepValue={1}
                cycle
            />
        </FormPanel>
    )
}